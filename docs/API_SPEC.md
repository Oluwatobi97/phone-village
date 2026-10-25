# Phone Village — REST API Specification (Phase 2 Proposal)

*Base URL: `/api/v1`*  
*Content-Type: `application/json`*

---

## 1. Authentication & Session Endpoints

### 1.1. `POST /api/v1/auth/register`
Creates a new account (`BUYER` by default).

* **Authentication**: None.
* **Rate Limit**: 5 requests per 15 minutes per IP.
* **Request Body**:
  ```json
  {
    "fullName": "Victor Tobi",
    "email": "victor.tobi@example.ng",
    "phone": "+2348039871234",
    "password": "SecurePassword123!"
  }
  ```
* **Validation**:
  - `email`: Valid format, unique in database.
  - `phone`: Valid Nigerian format (`+234` or `080/081/090/070`), unique.
  - `password`: Minimum 8 characters, at least 1 number and 1 special character.
* **Success Response (`201 Created`)**:
  ```json
  {
    "user": {
      "id": "c1f7b9e0-82a1-4389-a352-789a9bc12345",
      "fullName": "Victor Tobi",
      "email": "victor.tobi@example.ng",
      "phone": "+2348039871234",
      "role": "BUYER",
      "isEmailVerified": false
    }
  }
  ```
  *Sets HTTP-only cookie: `__Host-pv_session`.*
* **Errors**: `400 Bad Request` (Validation error), `409 Conflict` (Email or phone already registered).

---

### 1.2. `POST /api/v1/auth/login`
Authenticates user with email or phone and password.

* **Authentication**: None.
* **Rate Limit**: 5 attempts per 15 minutes per IP.
* **Request Body**:
  ```json
  {
    "identifier": "victor.tobi@example.ng",
    "password": "SecurePassword123!",
    "rememberMe": true
  }
  ```
* **Success Response (`200 OK`)**:
  ```json
  {
    "user": {
      "id": "c1f7b9e0-82a1-4389-a352-789a9bc12345",
      "fullName": "Victor Tobi",
      "email": "victor.tobi@example.ng",
      "phone": "+2348039871234",
      "role": "BUYER",
      "sellerProfile": null
    }
  }
  ```
* **Errors**: `400 Bad Request`, `401 Unauthorized` ("Invalid phone/email or password"), `429 Too Many Requests`.

---

### 1.3. `GET /api/v1/auth/me`
Retrieves current authenticated session.

* **Authentication**: Required (`__Host-pv_session` cookie).
* **Success Response (`200 OK`)**:
  ```json
  {
    "user": {
      "id": "c1f7b9e0-82a1-4389-a352-789a9bc12345",
      "fullName": "Victor Tobi",
      "email": "victor.tobi@example.ng",
      "phone": "+2348039871234",
      "role": "DEALER",
      "sellerProfile": {
        "id": "s8e910fa-1234-5678-abcd-ef0123456789",
        "storeName": "Apex Gadgets Hub Ltd",
        "hubRegion": "LAGOS_COMPUTER_VILLAGE",
        "verificationStatus": "VERIFIED"
      }
    }
  }
  ```
* **Errors**: `401 Unauthorized` (Session expired or invalid).

---

### 1.4. `POST /api/v1/auth/logout`
Terminates user session.

* **Authentication**: Required.
* **Success Response (`200 OK`)**:
  ```json
  { "success": true, "message": "Logged out successfully" }
  ```
  *Clears `__Host-pv_session` cookie.*

---

## 2. Seller Onboarding & Verification Endpoints

### 2.1. `POST /api/v1/seller/onboard`
Transitions a user into a dealer and registers their physical store profile.

* **Authentication**: Required (`BUYER` or `DEALER`).
* **Request Body**:
  ```json
  {
    "storeName": "Apex Gadgets Hub Ltd",
    "ownerName": "Emeka Okafor",
    "cacNumber": "RC 1492084",
    "hubRegion": "LAGOS_COMPUTER_VILLAGE",
    "physicalAddress": "Shop B12, Medical Road, Computer Village, Ikeja, Lagos",
    "storePhone": "+2348031234567",
    "storeWhatsapp": "2348031234567",
    "storePhotoUrl": "https://storage.phonevillage.ng/stores/apex.jpg"
  }
  ```
* **Validation**:
  - `physicalAddress`: Minimum 10 characters detailing exact plaza/shop number.
  - `storeWhatsapp`: Valid numeric WhatsApp format without leading `+`.
* **Success Response (`201 Created`)**:
  ```json
  {
    "sellerProfile": {
      "id": "s8e910fa-1234-5678-abcd-ef0123456789",
      "storeName": "Apex Gadgets Hub Ltd",
      "verificationStatus": "PENDING_REVIEW",
      "createdAt": "2026-10-25T12:00:00Z"
    }
  }
  ```
* **Errors**: `400 Bad Request`, `401 Unauthorized`, `409 Conflict` (Seller profile already exists).

---

### 2.2. `PATCH /api/v1/admin/sellers/:id/verify`
Administrative endpoint to verify or reject store profile.

* **Authentication**: Required (`role: ADMIN`).
* **Request Body**:
  ```json
  {
    "status": "VERIFIED",
    "verificationNotes": "Physical shop location and CAC documents confirmed by Ikeja field agent."
  }
  ```
* **Success Response (`200 OK`)**:
  ```json
  {
    "id": "s8e910fa-1234-5678-abcd-ef0123456789",
    "verificationStatus": "VERIFIED",
    "verifiedAt": "2026-10-25T12:30:00Z"
  }
  ```
* **Errors**: `401 Unauthorized`, `403 Forbidden` (User is not Admin), `404 Not Found`.

---

## 3. Smartphone Listings Endpoints

### 3.1. `GET /api/v1/listings`
Public searchable, filterable catalog.

* **Authentication**: Optional.
* **Query Parameters**:
  - `query` (string): Text match on title, model, store.
  - `brand` (enum): `APPLE`, `SAMSUNG`, `GOOGLE`, `TECNO`, `INFINIX`, `XIAOMI`, `ONEPLUS`.
  - `condition` (enum): `BRAND_NEW`, `UK_USED`, `LOCALLY_USED`.
  - `hubRegion` (enum): `LAGOS_COMPUTER_VILLAGE`, `ABUJA_BANEX`, etc.
  - `minPrice`, `maxPrice` (integer).
  - `minBatteryHealth` (integer 50-100).
  - `verifiedOnly` (boolean).
  - `sortBy` (enum): `featured`, `price_asc`, `price_desc`, `battery_desc`, `newest`.
  - `page` (int, default 1), `limit` (int, default 20, max 50).
* **Success Response (`200 OK`)**:
  ```json
  {
    "data": [
      {
        "id": "p3a4b5c6-7890-4123-abcd-ef0123456789",
        "title": "iPhone 15 Pro Max 256GB Natural Titanium",
        "brand": "APPLE",
        "model": "iPhone 15 Pro Max",
        "priceNgn": 1480000,
        "condition": "UK_USED",
        "batteryHealth": 98,
        "storage": "256GB",
        "color": "Natural Titanium",
        "hubRegion": "LAGOS_COMPUTER_VILLAGE",
        "locationName": "Computer Village, Ikeja",
        "coverImage": "https://storage.phonevillage.ng/phones/15promax.jpg",
        "seller": {
          "id": "u1",
          "storeName": "Apex Gadgets Hub Ltd",
          "isVerified": true,
          "rating": 4.9,
          "whatsapp": "2348031234567"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 148,
      "totalPages": 8
    }
  }
  ```

---

### 3.2. `GET /api/v1/listings/:id`
Full device details and hardware specifications.

* **Authentication**: Optional.
* **Success Response (`200 OK`)**:
  ```json
  {
    "id": "p3a4b5c6-7890-4123-abcd-ef0123456789",
    "title": "iPhone 15 Pro Max 256GB Natural Titanium",
    "brand": "APPLE",
    "priceNgn": 1480000,
    "condition": "UK_USED",
    "batteryHealth": 98,
    "storage": "256GB",
    "color": "Natural Titanium",
    "status": "ACTIVE",
    "description": "Clean UK Used. True tone active, Face ID intact...",
    "features": ["Face ID", "True Tone", "Type-C Port"],
    "specs": {
      "display": "6.7\" Super Retina XDR OLED 120Hz",
      "camera": "48MP Triple Camera 5x Telephoto",
      "battery": "4422 mAh",
      "processor": "Apple A17 Pro"
    },
    "images": [
      { "id": "img-1", "url": "https://...", "isCover": true }
    ],
    "seller": {
      "storeName": "Apex Gadgets Hub Ltd",
      "ownerName": "Emeka Okafor",
      "physicalAddress": "Shop B12, Medical Road, Ikeja",
      "phone": "+2348031234567",
      "whatsapp": "2348031234567",
      "isVerified": true,
      "rating": 4.9
    }
  }
  ```
* **Errors**: `404 Not Found` (Proper 404 response when listing does not exist).

---

### 3.3. `POST /api/v1/listings`
Publishes a new smartphone listing.

* **Authentication**: Required (`BUYER` or `DEALER`).
* **Rate Limit**: 20 listings/day (standard), 100 listings/day (verified dealer).
* **Request Body**:
  ```json
  {
    "title": "iPhone 15 Pro Max 256GB Natural Titanium",
    "brand": "APPLE",
    "model": "iPhone 15 Pro Max",
    "priceNgn": 1480000,
    "condition": "UK_USED",
    "storage": "256GB",
    "ram": "8GB",
    "batteryHealth": 98,
    "color": "Natural Titanium",
    "hubRegion": "LAGOS_COMPUTER_VILLAGE",
    "locationName": "Computer Village, Ikeja",
    "physicalTestAddress": "Shop B12, Medical Road, Ikeja",
    "description": "Spotless condition...",
    "features": ["Face ID Active", "5G"],
    "specs": {
      "display": "6.7\" OLED 120Hz",
      "camera": "48MP",
      "battery": "4422 mAh",
      "processor": "A17 Pro"
    },
    "images": [
      { "url": "https://storage.phonevillage.ng/phones/p1.jpg", "isCover": true, "displayOrder": 0 }
    ]
  }
  ```
* **Success Response (`201 Created`)**: Returns created `PhoneListing` object.
* **Errors**: `400 Bad Request`, `401 Unauthorized`.

---

### 3.4. `PATCH /api/v1/listings/:id/status`
Updates listing status (`ACTIVE`, `INACTIVE`, `SOLD`).

* **Authentication**: Required.
* **Authorization**: Must be listing owner or `ADMIN`.
* **Request Body**:
  ```json
  {
    "status": "SOLD"
  }
  ```
* **Success Response (`200 OK`)**:
  ```json
  { "id": "p3a4b5c6-...", "status": "SOLD", "updatedAt": "2026-10-25T13:00:00Z" }
  ```
* **Errors**: `401 Unauthorized`, `403 Forbidden` (User does not own listing), `404 Not Found`.

---

## 4. Media Storage Endpoint

### 4.1. `POST /api/v1/media/upload/presign`
Requests secure presigned PUT URL for smartphone photo uploads.

* **Authentication**: Required.
* **Rate Limit**: 30 presign requests per 10 minutes.
* **Request Body**:
  ```json
  {
    "filename": "iphone-front.jpg",
    "mimeType": "image/jpeg",
    "fileSizeBytes": 2450000
  }
  ```
* **Validation**:
  - `mimeType`: Only `image/jpeg`, `image/png`, `image/webp`.
  - `fileSizeBytes`: Max 5,242,880 bytes (5MB).
* **Success Response (`200 OK`)**:
  ```json
  {
    "uploadUrl": "https://storage.phonevillage.ng/uploads/uuid-key.jpg?signature=...",
    "publicUrl": "https://cdn.phonevillage.ng/uploads/uuid-key.jpg",
    "expiresInSeconds": 300
  }
  ```
* **Errors**: `400 Bad Request`, `401 Unauthorized`, `413 Payload Too Large`.

---

## 5. Favourites & In-Store Enquiries

### 5.1. `POST /api/v1/account/favourites/:listingId` & `DELETE`
* **Authentication**: Required.
* **Behavior**: Idempotent insert/delete into `favourites` table.

### 5.2. `POST /api/v1/enquiries` & `GET /api/v1/enquiries/threads`
* **Authentication**: Required.
* **Behavior**: Initiates or appends message to an active store inquiry thread with unread notifications.
