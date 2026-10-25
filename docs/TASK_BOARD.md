# Phone Village — Task Board & Engineering Roadmap

*Last Updated: 2026-10-25 (Phase 1: Technical Audit and Feature Freeze)*

---

## Phase 1 Technical Audit Findings & Backlog

### 1. Critical Defects (P0)

- **[DEF-001] Production Build Failure on `/_not-found` Prerender**
  - **Priority**: Critical (P0)
  - **Affected Route/Component**: `frontend/src/app/layout.tsx`, `frontend/src/context/ThemeContext.tsx`, `frontend/src/context/AuthContext.tsx`
  - **Evidence**: Running `npm run build` exits with code 1: `TypeError: Cannot read properties of null (reading 'useState')` during prerendering of `/_not-found`. Client context providers in root layout lack a dedicated `not-found.tsx` or safe boundaries for static prerender.
  - **Dependency**: None
  - **Completion Criterion**: `npm run build` completes with exit code 0 without prerendering errors.
  - **Status**: Identified (Open)

- **[DEF-002] Client-Side Fake Authentication & Plaintext Session Storage**
  - **Priority**: Critical (P0)
  - **Affected Route/Component**: `frontend/src/context/AuthContext.tsx`, `frontend/src/app/login/page.tsx`, `frontend/src/app/register/page.tsx`
  - **Evidence**: Login and register execute mock timeouts and serialize unsalted user credentials/demo state directly to unencrypted browser `localStorage` (`pv_user`). Any arbitrary password logs in. No token, session cookie, or server authentication exists.
  - **Dependency**: Backend Auth API (JWT / Session)
  - **Completion Criterion**: Auth flows issue secure HTTP-only cookies/JWTs validated by server middleware.
  - **Status**: Identified (Open)

- **[DEF-003] Absence of Route Protection & Server-Side Authorization**
  - **Priority**: Critical (P0)
  - **Affected Route/Component**: `frontend/src/app/seller/*`, `frontend/src/app/sell/*`, `frontend/src/app/account/*`
  - **Evidence**: All seller, onboarding, listing creation, and account routes are fully accessible to unauthenticated visitors and arbitrary roles without Next.js middleware or server-side checks.
  - **Dependency**: DEF-002, Next.js Middleware
  - **Completion Criterion**: Unauthenticated requests to protected paths are redirected to `/login` with return URL parameters.
  - **Status**: Identified (Open)

---

### 2. High-Priority Defects (P1)

- **[DEF-004] Data Isolation: Created Listings Never Reach Marketplace**
  - **Priority**: High (P1)
  - **Affected Route/Component**: `frontend/src/app/sell/phones/new/page.tsx`, `frontend/src/app/phones/page.tsx`, `frontend/src/app/page.tsx`
  - **Evidence**: Newly posted ads in `/sell/phones/new` are saved only into the local browser's `pv_user_listings` `localStorage`. The public marketplace (`/phones`) and home (`/`) read exclusively from immutable `data/mockData.ts`. Other users cannot see or purchase newly listed items.
  - **Dependency**: Backend Listings API & Database
  - **Completion Criterion**: Submitted listings persist to a centralized database and immediately appear in public marketplace search results.
  - **Status**: Identified (Open)

- **[DEF-005] Self-Granted Dealer Verification Without Admin Approval**
  - **Priority**: High (P1)
  - **Affected Route/Component**: `frontend/src/app/seller/onboarding/page.tsx`
  - **Evidence**: Completing the onboarding form immediately updates the client profile with `isVerified: true` and grants verified badges without business vetting, document verification, or administrative review.
  - **Dependency**: Admin Review Flow & Verification API
  - **Completion Criterion**: Onboarding submissions enter a `PENDING_REVIEW` state requiring administrative verification before badge issuance.
  - **Status**: Identified (Open)

- **[DEF-006] Silent Fallback Masking Invalid Phone IDs**
  - **Priority**: High (P1)
  - **Affected Route/Component**: `frontend/src/app/phones/[id]/page.tsx`
  - **Evidence**: When navigating to a non-existent ID (e.g. `/phones/invalid-id`), the component executes `MOCK_LISTINGS.find(...) || MOCK_LISTINGS[0]`, rendering the iPhone 15 Pro Max instead of an HTTP 404 or missing item UI.
  - **Dependency**: None
  - **Completion Criterion**: Invalid listing IDs invoke `notFound()` from `next/navigation` to render a proper 404 page.
  - **Status**: Identified (Open)

- **[DEF-007] Non-Functional ESLint Rules Engine**
  - **Priority**: High (P1)
  - **Affected Route/Component**: `frontend/eslint.config.mjs`
  - **Evidence**: `npm run lint` warns that Next.js plugin is not detected and passes with 0 errors because the configuration only declares file ignores without any linting rules or recommended Next.js configs.
  - **Dependency**: None
  - **Completion Criterion**: ESLint config incorporates `eslint-config-next` and active TypeScript rules.
  - **Status**: Identified (Open)

---

### 3. Medium-Priority Defects (P2)

- **[DEF-008] Ephemeral In-Memory Chat & Enquiries**
  - **Priority**: Medium (P2)
  - **Affected Route/Component**: `frontend/src/app/account/messages/page.tsx`
  - **Evidence**: Messages sent in the enquiry thread update local React `useState` only. All conversations reset to static mock data upon page reload.
  - **Dependency**: Messaging API / WebSocket Service
  - **Completion Criterion**: Conversations and message histories persist across page reloads and user sessions.
  - **Status**: Identified (Open)

- **[DEF-009] Disconnected Wishlist State Across Marketplace & Account**
  - **Priority**: Medium (P2)
  - **Affected Route/Component**: `frontend/src/app/account/favourites/page.tsx`, `frontend/src/app/phones/[id]/page.tsx`
  - **Evidence**: `/account/favourites` displays a hardcoded slice of mock listings. The heart toggle in `/phones/[id]` updates only local component state and does not sync with the user's account wishlist.
  - **Dependency**: Wishlist API / Persistent Context
  - **Completion Criterion**: Toggling favourites on any phone reflects dynamically in `/account/favourites` across sessions.
  - **Status**: Identified (Open)

- **[DEF-010] Permissive TypeScript Configuration (`strict: false`)**
  - **Priority**: Medium (P2)
  - **Affected Route/Component**: `frontend/tsconfig.json`
  - **Evidence**: `tsconfig.json` has `"strict": false` and `"strictNullChecks"` disabled, masking potential runtime null pointer exceptions.
  - **Dependency**: None
  - **Completion Criterion**: TypeScript strict mode enabled with zero compilation errors.
  - **Status**: Identified (Open)

- **[DEF-011] Missing Image Upload Pipeline & Unsafe Direct Image URLs**
  - **Priority**: Medium (P2)
  - **Affected Route/Component**: `frontend/src/app/sell/phones/new/page.tsx`
  - **Evidence**: Phone posting relies on a plain text input for image URLs (defaulting to Unsplash) with no file picker, size check, format validation, or object storage integration.
  - **Dependency**: Cloud Media Upload API (S3/Cloudinary/GCS)
  - **Completion Criterion**: Sellers can upload phone photos via drag-and-drop with client/server MIME and dimension checks.
  - **Status**: Identified (Open)

---

### 4. Low-Priority Improvements (P3)

- **[DEF-012] Modal Accessibility & Focus Management**
  - **Priority**: Low (P3)
  - **Affected Route/Component**: `frontend/src/components/ListingDetailModal.tsx`
  - **Evidence**: Quick specs modal lacks ARIA dialog attributes (`role="dialog"`, `aria-modal="true"`), focus trap, and keyboard Escape key listeners.
  - **Dependency**: None
  - **Completion Criterion**: Modal traps keyboard focus, closes on Escape, and announces properly to screen readers.
  - **Status**: Identified (Open)

- **[DEF-013] Horizontal Table Scrolling on Small Mobile Screens**
  - **Priority**: Low (P3)
  - **Affected Route/Component**: `frontend/src/components/DealComparer.tsx`
  - **Evidence**: Table width requires horizontal scrolling on devices <640px. While an indicator text exists, stacked card layout would improve ergonomics.
  - **Dependency**: None
  - **Completion Criterion**: Responsive card-based comparative layout rendered for viewport widths <640px.
  - **Status**: Identified (Open)

---

### 5. Missing Backend Dependencies

- **[BE-001] Authentication & Session Management Service**
  - Scope: User signup, login, refresh tokens, password reset tokens, logout, role claims.
  - Required Contracts: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`.

- **[BE-002] Verified Seller Onboarding & CAC Audit Service**
  - Scope: Business registration data submission, document storage, review pipeline, store badge issuance.
  - Required Contracts: `POST /api/seller/onboard`, `GET /api/seller/profile`, `PUT /api/seller/profile`, `GET /api/admin/verifications`.

- **[BE-003] Smartphone Listings CRUD & Search API**
  - Scope: Listing creation, status transitions (`ACTIVE`, `INACTIVE`, `SOLD`), multi-facet filtering (brand, condition, battery health, hub, max price), text search.
  - Required Contracts: `GET /api/listings`, `GET /api/listings/:id`, `POST /api/listings`, `PUT /api/listings/:id`, `DELETE /api/listings/:id`.

- **[BE-004] Secure Media Upload & Processing Pipeline**
  - Scope: Multipart image uploads, compression, watermark/hardware inspection tagging, secure CDN URLs.
  - Required Contracts: `POST /api/media/upload`.

- **[BE-005] User Favourites & Wishlist API**
  - Scope: Saving, removing, and querying user wishlist items.
  - Required Contracts: `GET /api/account/favourites`, `POST /api/account/favourites/:id`, `DELETE /api/account/favourites/:id`.

- **[BE-006] Real-Time Buyer-Seller Enquiry Messaging**
  - Scope: Conversation threads, direct in-store visit booking, chat history, unread counts.
  - Required Contracts: `GET /api/messages/threads`, `GET /api/messages/:threadId`, `POST /api/messages/:threadId`.

---

### 6. Follow-up Engineering Tasks (Next Sequence)

1. **TASK-1**: Implement custom `frontend/src/app/not-found.tsx` to fix `npm run build` static prerendering failure (DEF-001).
2. **TASK-2**: Update `frontend/eslint.config.mjs` with active Next.js and TypeScript linting rules (DEF-007).
3. **TASK-3**: Introduce Next.js Route Handlers (`/api/*`) and PostgreSQL schema definitions via ORM (Prisma/Drizzle) for listings and authentication (BE-001, BE-003).
4. **TASK-4**: Connect Marketplace (`/phones`) and Listing Creation (`/sell/phones/new`) to database API to resolve data isolation (DEF-004).
5. **TASK-5**: Implement server-authoritative authentication and route-guard middleware (DEF-002, DEF-003).
