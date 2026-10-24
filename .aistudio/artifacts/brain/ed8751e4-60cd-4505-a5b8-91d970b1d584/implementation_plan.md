# Phone Village — Backend Authentication & Seller Onboarding Plan

Technical design and backend API contract implementation for **Phone Village** authentication, email verification, password recovery, and seller onboarding.

---

## User Review & Critical Decisions

> [!IMPORTANT] Confirmed by the owner in Phase 1:
- **Backend Architecture**: Next.js App Router API Routes (`/src/app/api/...`) with shared TypeScript validation types (`/shared/types/...`) and thread-safe in-memory database store with persistence fallback.
- **Verification & Token Security**: Single-use SHA-256 hashed tokens stored on the server with rate-limited resend and reset endpoints. Plaintext tokens are sent only to recipient handlers.
- **Seller Onboarding Rules**: Single shared account model. Email verification enables buyer operations; completing a verified store profile (shop name, address, contact phone) grants seller listing creation privileges.

---

## 1. Overview & Core Architecture

- **What It Does**: Provides a secure REST API backend for account registration, email verification, password recovery, session handling, seller profile onboarding, and listing creation eligibility checks.
- **Target Integrator**: Frontend developers & client applications integrating with Phone Village.
- **Key Value**: Decouples user identity from seller store profiles, preventing account duplication while enforcing strict server-side authorization.

---

## 2. Shared Account & Seller Onboarding Workflow

### Account & Seller State Lifecycle
1. **Registration**: User registers via `/api/auth/register` $\rightarrow$ Account created in `UNVERIFIED` state $\rightarrow$ Single-use SHA-256 email verification token generated.
2. **Email Verification**: User calls `/api/auth/verify-email` with token $\rightarrow$ Account state updated to `VERIFIED` $\rightarrow$ Buyer features unlocked.
3. **Seller Onboarding**: Authenticated user submits store details via `/api/sellers/onboard` $\rightarrow$ Server validates required seller fields (Store Name, Physical Address, Contact Phone, Tech Region) $\rightarrow$ Seller profile created with status `APPROVED` $\rightarrow$ User gains listing creation permission.

---

## 3. Technical Architecture & Component Mapping

### Backend System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Next.js API Route Handlers                         │
│   /api/auth/* (register, login, verify, reset) | /api/sellers/* (onboard)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    Server-Side Security & Auth Middleware                    │
│   - Session Token Verification (HTTP-Only Cookie / Bearer Token)             │
│   - SHA-256 Token Hashing & Single-Use Enforcement                          │
│   - Rate Limiter (IP & Account Identifier Bucket)                           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                       Shared Business Logic & Stores                         │
│   - UserStore (User Accounts, Email Normalization, Hashed Passwords)         │
│   - SellerStore (Store Profiles, Physical Addresses, Status Rules)          │
│   - TokenStore (Verification & Reset Tokens with Expiry)                     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                         Shared TypeScript Contracts                         │
│   /shared/types/auth.ts  ·  /shared/types/seller.ts  ·  /shared/types/api.ts  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. API Route Contracts

### Authentication Endpoints
- **`POST /api/auth/register`**: Validates email/phone, normalizes email, hashes password, generates verification token.
- **`POST /api/auth/verify-email`**: Validates single-use SHA-256 token, marks email verified.
- **`POST /api/auth/resend-verification`**: Rate-limited token re-issuance.
- **`POST /api/auth/login`**: Verifies password hash, issues secure session cookie/token.
- **`POST /api/auth/logout`**: Invalidates active session.
- **`GET /api/auth/me`**: Returns current authenticated user and seller eligibility status.
- **`POST /api/auth/forgot-password`**: Generates single-use password reset token (generic response).
- **`POST /api/auth/reset-password`**: Validates reset token and updates password hash.

### Seller Onboarding Endpoints
- **`GET /api/sellers/status`**: Returns current seller onboarding status and listing creation eligibility.
- **`POST /api/sellers/onboard`**: Validates store name, physical address, and contact details; creates/updates seller profile.
- **`GET /api/sellers/eligibility`**: Server-side permission check for listing creation.

---

## 5. Security & Verification Requirements

1. **Password Hashing**: Passwords stored as salted SHA-256 / PBKDF2 digests (never plaintext).
2. **Token Security**: Tokens stored as SHA-256 hashes with 24-hour expiry (verification) or 1-hour expiry (password reset).
3. **User Enumeration Prevention**: Forgot-password & registration endpoints return generic non-revealing messages.
4. **Server-Side Permission Enforcement**: Listing creation checks `user.emailVerified === true` AND `sellerProfile.status === 'APPROVED'`.
