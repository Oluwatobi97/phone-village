# Phone Village — API Specification

## Active & Implemented Endpoints

### 1. Authentication Endpoints

#### `POST /api/auth/register`
- **Description**: Registers a new user account and re-issues a single-use SHA-256 email verification token.
- **Request Body**:
  ```json
  {
    "email": "user@example.ng",
    "phone": "+2348031234567",
    "fullName": "Emeka Nnamdi",
    "password": "Password123!",
    "role": "BUYER"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Account registered successfully. Please verify your email.",
    "data": {
      "user": { "id": "usr_123", "email": "user@example.ng", "phone": "+2348031234567", "fullName": "Emeka Nnamdi", "role": "BUYER", "status": "UNVERIFIED", "emailVerified": false },
      "verificationToken": "raw_hex_token"
    }
  }
  ```

#### `POST /api/auth/verify-email`
- **Description**: Validates a single-use verification token and marks the account as email-verified.
- **Request Body**: `{ "token": "raw_hex_token" }`
- **Response (200 OK)**: `{ "success": true, "message": "Email address verified successfully." }`

#### `POST /api/auth/resend-verification`
- **Description**: Re-issues a new verification token for unverified accounts. Rate-limited to 3 requests per 15 minutes.
- **Request Body**: `{ "email": "user@example.ng" }`
- **Response (200 OK)**: Generic success message to prevent user enumeration.

#### `POST /api/auth/login`
- **Description**: Validates credentials and sets an HTTP-Only session cookie (`pv_session`).
- **Request Body**: `{ "identifier": "user@example.ng", "password": "Password123!" }`
- **Response (200 OK)**: Returns sanitized user profile and sets HTTP-Only `pv_session` cookie.

#### `POST /api/auth/logout`
- **Description**: Invalidates current session and clears the session cookie.
- **Response (200 OK)**: `{ "success": true, "message": "Logged out successfully." }`

#### `GET /api/auth/me`
- **Description**: Returns current authenticated user profile, seller profile, and listing creation eligibility.
- **Response (200 OK)**: Includes `user`, `sellerProfile`, and `listingEligibility`.

#### `POST /api/auth/forgot-password`
- **Description**: Generates single-use password reset token with 1-hour expiry. Rate-limited.
- **Request Body**: `{ "email": "user@example.ng" }`

#### `POST /api/auth/reset-password`
- **Description**: Validates single-use reset token, updates password hash, and invalidates existing sessions.
- **Request Body**: `{ "token": "raw_hex_token", "newPassword": "NewPassword123!" }`

---

### 2. Seller Onboarding Endpoints

#### `GET /api/sellers/status`
- **Description**: Returns current user's seller profile onboarding status (`NOT_ONBOARDED` | `APPROVED` | `SUSPENDED`).

#### `POST /api/sellers/onboard`
- **Description**: Submits store profile details (Store Name, Physical Address, Contact Phone, Tech Region, CAC ID) and creates/updates seller profile.
- **Request Body**:
  ```json
  {
    "sellerType": "DEALER",
    "storeName": "Apex iStore Ikeja",
    "ownerName": "Emeka Nnamdi",
    "contactPhone": "+2348031234567",
    "whatsappPhone": "+2348031234567",
    "techRegion": "Lagos",
    "physicalAddress": "Shop 14, Otigba Street, Computer Village, Ikeja, Lagos",
    "termsAccepted": true
  }
  ```

#### `GET /api/sellers/eligibility`
- **Description**: Checks whether the authenticated user satisfies all listing creation rules (`canCreateListing: boolean`, `emailVerified: boolean`, `hasSellerProfile: boolean`, `sellerStatus: string`).
