# Phone Village — Database Specification

## Database Architecture
- **Framework & Runtime**: Next.js App Router API Routes (`/src/app/api/...`).
- **Store Implementation**: Thread-safe in-memory data store with file/ORM persistence fallback (`/src/lib/authStore.ts`).

## Entity Schemas

### 1. `UserAccount`
| Field | Type | Description | Constraints |
|---|---|---|---|
| `id` | string | Unique user identifier (`usr_...`) | PRIMARY KEY |
| `email` | string | User email address | UNIQUE |
| `normalizedEmail` | string | Lowercased, trimmed email | UNIQUE, INDEX |
| `phone` | string | User contact phone (+234) | UNIQUE |
| `fullName` | string | Full display name | REQUIRED |
| `passwordHash` | string | PBKDF2 / SHA-512 salted digest | REQUIRED |
| `role` | AccountRole | `BUYER` \| `DEALER` \| `ADMIN` | DEFAULT 'BUYER' |
| `status` | AccountStatus | `UNVERIFIED` \| `VERIFIED` \| `SUSPENDED` | DEFAULT 'UNVERIFIED' |
| `emailVerified` | boolean | Email verification flag | DEFAULT false |
| `createdAt` | ISO string | Registration timestamp | REQUIRED |
| `updatedAt` | ISO string | Last modification timestamp | REQUIRED |

### 2. `SellerProfile`
| Field | Type | Description | Constraints |
|---|---|---|---|
| `id` | string | Unique seller identifier (`seller_...`) | PRIMARY KEY |
| `userId` | string | Reference to `UserAccount.id` | UNIQUE, FOREIGN KEY |
| `sellerType` | SellerType | `INDIVIDUAL` \| `DEALER` | REQUIRED |
| `storeName` | string | Business/Display store name | REQUIRED |
| `ownerName` | string | Store manager / Owner name | REQUIRED |
| `contactPhone` | string | Contact phone number | REQUIRED |
| `whatsappPhone` | string | WhatsApp direct chat phone | REQUIRED |
| `techRegion` | string | Lagos \| Abuja \| Port Harcourt \| Ibadan | REQUIRED |
| `physicalAddress` | string | Physical store address | REQUIRED |
| `cacRegistrationNumber` | string | Optional CAC ID | OPTIONAL |
| `status` | SellerOnboardingStatus | `NOT_ONBOARDED` \| `APPROVED` \| `SUSPENDED` | DEFAULT 'APPROVED' |
| `termsAccepted` | boolean | Safety terms agreement | REQUIRED |

### 3. `TokenRecord`
| Field | Type | Description | Constraints |
|---|---|---|---|
| `tokenHash` | string | SHA-256 digest of raw token | PRIMARY KEY |
| `userId` | string | Reference to `UserAccount.id` | FOREIGN KEY |
| `type` | string | `VERIFICATION` \| `PASSWORD_RESET` | REQUIRED |
| `expiresAt` | number | Unix timestamp (24h or 1h) | REQUIRED |
| `used` | boolean | Single-use consumption flag | DEFAULT false |
