# Phone Village — Backend Architecture Proposal (Phase 2)

*Status: Proposed for Review and Approval*  
*Target Stack: Next.js 15 App Router, TypeScript, PostgreSQL (Drizzle ORM), Cloud Storage, JWT Session Cookies*

---

## 1. Executive Architecture Recommendation

### Evaluated Approaches

| Architecture Option | Operational Complexity | Maintenance Burden | Cost / Month | Scalability & Latency | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option A: Next.js 15 Integrated Monolith (App Router Route Handlers + Drizzle ORM + PostgreSQL)** | **Low**: Single codebase, unified TypeScript types, zero CORS configuration, single deployment target. | **Low**: Shared models between frontend and backend. | **Lowest**: Runs within existing Cloud Run container; managed PostgreSQL (~$0-15/mo). | **Excellent**: Sub-10ms intra-process latency, edge/node runtime options. | **RECOMMENDED** |
| **Option B: Decoupled Node.js / Express / NestJS Backend (`/backend` service)** | **High**: Dual port management (3000 & 3001), separate deployments, CORS configurations, dual CI/CD pipelines. | **High**: Duplicate DTOs/types across workspaces. | **Medium**: Requires running two independent container instances. | **Good**: Microservice boundary, but adds network hop and complexity. | Not Recommended |
| **Option C: Backend-as-a-Service (Firebase / Supabase BaaS)** | **Medium**: Relies on third-party consoles and external security rules. | **Medium**: Split business logic between client SDK and security rules. | **Variable**: Scales based on read/write pricing tiers. | **Good**: Fast setup, but creates vendor lock-in for custom Nigerian fraud-prevention workflows. | Alternative |

### The Recommended Architecture: Integrated Next.js 15 Monolith (Option A)

We recommend consolidating the backend within the existing Next.js 15 application using **Route Handlers (`/frontend/src/app/api/*`)** powered by **Drizzle ORM** communicating with a relational **PostgreSQL** database.

**Core Rationale:**
1. **Unified Type Safety**: Database schemas defined in Drizzle generate TypeScript types consumed directly by frontend components, eliminating drift between API responses and UI models.
2. **Operational Simplicity**: Eliminates the broken dual-service dependency on `localhost:3001`, resolving CORS issues and container port coordination on Google Cloud Run.
3. **Server-Side Security**: Route Handlers and Next.js `middleware.ts` run strictly on the Node.js server runtime, keeping database credentials, JWT secrets, and hashing keys completely hidden from client bundles.
4. **Cloud Migration Path**: The Next.js monolith deploys cleanly to Google Cloud Run, with PostgreSQL provisioned on Cloud SQL or Neon/Supabase.

---

## 2. Authentication, Authorization & Session Architecture

### Session Management
- **Token Mechanism**: Cryptographically signed JWTs containing `sub` (User ID), `role` (`BUYER` | `DEALER` | `ADMIN`), `storeId` (optional), and `jti` (unique token ID).
- **Transport**: Stored in an `httpOnly`, `secure`, `sameSite=lax` cookie named `__Host-pv_session`.
- **Token Expiry**: 7-day rolling session for standard logins; 30-day session if "Remember Me" is selected.
- **Revocation**: A `token_version` integer on the `User` table is checked during middleware validation. Incrementing `token_version` immediately revokes all active sessions for that account.

### Role Hierarchy & Unified Account Model
Every user begins with a base `BUYER` role under a single unified account. A buyer transitions into an active merchant by completing seller onboarding, creating a linked `SellerProfile`.

```
                  ┌───────────────────────────────┐
                  │          User Account         │
                  │  (Email, Phone, Hash, Role)   │
                  └───────────────┬───────────────┘
                                  │
          ┌───────────────────────┴───────────────────────┐
          │                                               │
          ▼                                               ▼
┌──────────────────┐                            ┌──────────────────┐
│   Buyer Context  │                            │  Merchant Context │
│  (Wishlist,      │                            │  (Linked 1:1     │
│   Inquiries)     │                            │   SellerProfile) │
└──────────────────┘                            └─────────┬────────┘
                                                          │
                                                ┌─────────▼────────┐
                                                │  Verified Status │
                                                │ (PENDING, VERIF) │
                                                └──────────────────┘
```

- **BUYER**: Can browse, compare, save wishlist items, initiate WhatsApp/direct enquiries, and post individual classified listings.
- **DEALER**: Has an associated `SellerProfile`. Once approved by an administrator, the dealer receives verified hub badges and priority listing placement.
- **ADMIN**: Super-user assigned only via secure backend seed/CLI; possesses authority to audit CAC certificates, grant verification badges, inspect IMEIs, and resolve dispute reports. Registration endpoints explicitly reject requests containing admin privilege flags.

---

## 3. Storage & Media Upload Architecture

Smartphone listings in Nigerian tech hubs require authentic device photography (displaying battery health settings, cosmetic chassis grading, and physical shop receipt slips).

1. **Upload Pipeline**:
   - Client requests a signed upload URL via `POST /api/media/upload/presign`.
   - Backend validates user authentication and enforces maximum upload quotas (max 6 images per listing, max 5MB per image).
   - Server returns a temporary pre-signed PUT URL targeting Cloudflare R2 / AWS S3 / Google Cloud Storage.
   - Client uploads raw binary directly to object storage.
   - Client submits the resulting image URL during listing creation.
2. **Validation Safeguards**:
   - Content-Type restricted to `image/jpeg`, `image/png`, and `image/webp`.
   - Magic-number header inspection on server if streamed through proxy.
   - URL domains restricted to the authorized storage CDN origin.

---

## 4. Scalability, Rate Limiting & Safety Shield

To protect against marketplace abuse, scrape-bots, and spam:
- **Authentication Endpoints (`/api/auth/*`)**: Rate-limited to 5 requests per 15 minutes per IP using an in-memory/Redis sliding window.
- **Ad Publication (`POST /api/listings`)**: Rate-limited to 20 listings per day for unverified accounts; 100 listings per day for verified physical stores.
- **Enquiry Dispatch (`POST /api/enquiries/*`)**: Rate-limited to 30 outbound messages per hour per user to curb unsolicited spam.
- **Input Sanitization**: All incoming text sanitized using Zod schemas with strict length limits, striping script tags and preventing XSS.
