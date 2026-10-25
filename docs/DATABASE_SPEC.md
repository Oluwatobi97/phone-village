# Phone Village — Database Schema Specification (Phase 2 Proposal)

*Database Engine: PostgreSQL 15+*  
*ORM / Query Layer: Drizzle ORM*

---

## 1. Relational Entity Relationship Diagram (ERD)

```
[ users ] (1) ──── (0..1) [ seller_profiles ] (1) ──── (0..*) [ seller_documents ]
    │                            │
    │ (1..*)                     │ (1..*)
    ▼                            ▼
[ favourites ]              [ phone_listings ] (1) ──── (1..*) [ listing_images ]
    │                            ▲        │
    │ (ref)                      │ (ref)  │ (1..*)
    └────────────────────────────┘        ▼
                                   [ listing_reports ]
[ users (buyer) ] (1) ──┐
                         ├── (0..*) [ enquiry_threads ] (1) ──── (1..*) [ messages ]
[ users (seller) ] (1) ─┘
```

---

## 2. Table Definitions & Constraints

### 2.1. `users`
Represents every registered account in the system (buyers, merchants, and staff).

```sql
CREATE TYPE user_role AS ENUM ('BUYER', 'DEALER', 'ADMIN');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(32) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(128) NOT NULL,
  role user_role NOT NULL DEFAULT 'BUYER',
  is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
  token_version INTEGER NOT NULL DEFAULT 1,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
```

### 2.2. `seller_profiles`
Maintains verified tech hub store information linked 1-to-1 with a user.

```sql
CREATE TYPE hub_region AS ENUM (
  'LAGOS_COMPUTER_VILLAGE',
  'LAGOS_VICTORIA_ISLAND',
  'ABUJA_BANEX',
  'PH_GARRISON',
  'IBADAN_IWO_ROAD'
);

CREATE TYPE verification_status AS ENUM (
  'UNVERIFIED',
  'PENDING_REVIEW',
  'VERIFIED',
  'REJECTED'
);

CREATE TABLE seller_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_name VARCHAR(128) NOT NULL,
  owner_name VARCHAR(128) NOT NULL,
  cac_number VARCHAR(64),
  hub_region hub_region NOT NULL,
  physical_address TEXT NOT NULL,
  store_phone VARCHAR(32) NOT NULL,
  store_whatsapp VARCHAR(32) NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'PENDING_REVIEW',
  verification_notes TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  store_photo_url TEXT,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_seller_hub ON seller_profiles(hub_region);
CREATE INDEX idx_seller_status ON seller_profiles(verification_status);
```

### 2.3. `phone_listings`
Smartphone advertisements with hardware specifications and condition classifications.

```sql
CREATE TYPE phone_condition AS ENUM (
  'BRAND_NEW',
  'UK_USED',
  'LOCALLY_USED'
);

CREATE TYPE listing_status AS ENUM (
  'ACTIVE',
  'INACTIVE',
  'SOLD',
  'REMOVED_BY_ADMIN'
);

CREATE TYPE phone_brand AS ENUM (
  'APPLE',
  'SAMSUNG',
  'GOOGLE',
  'TECNO',
  'INFINIX',
  'XIAOMI',
  'ONEPLUS',
  'OTHER'
);

CREATE TABLE phone_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  brand phone_brand NOT NULL,
  model VARCHAR(128) NOT NULL,
  price_ngn BIGINT NOT NULL CHECK (price_ngn > 0),
  condition phone_condition NOT NULL,
  storage VARCHAR(32) NOT NULL,
  ram VARCHAR(32),
  battery_health INTEGER CHECK (battery_health BETWEEN 50 AND 100),
  color VARCHAR(64) NOT NULL,
  hub_region hub_region NOT NULL,
  location_name VARCHAR(128) NOT NULL,
  physical_test_address TEXT NOT NULL,
  description TEXT NOT NULL,
  status listing_status NOT NULL DEFAULT 'ACTIVE',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_listings_brand ON phone_listings(brand);
CREATE INDEX idx_listings_condition ON phone_listings(condition);
CREATE INDEX idx_listings_price ON phone_listings(price_ngn);
CREATE INDEX idx_listings_status ON phone_listings(status);
CREATE INDEX idx_listings_hub ON phone_listings(hub_region);
CREATE INDEX idx_listings_seller ON phone_listings(seller_id);
```

### 2.4. `listing_images`
Multiple high-resolution photos per smartphone listing.

```sql
CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES phone_listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_cover BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_images_listing ON listing_images(listing_id);
```

### 2.5. `favourites`
User wishlists for price tracking and store inspection planning.

```sql
CREATE TABLE favourites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES phone_listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_favourite UNIQUE (user_id, listing_id)
);
```

### 2.6. `enquiry_threads` & `messages`
Direct in-store buyer-to-dealer messaging system.

```sql
CREATE TABLE enquiry_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES phone_listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_buyer_listing_thread UNIQUE (buyer_id, listing_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES enquiry_threads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(trim(content)) > 0),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_thread ON messages(thread_id);
```

### 2.7. `listing_reports`
Buyer safety shield reporting suspicious IMEIs, fake sellers, or stolen devices.

```sql
CREATE TYPE report_reason AS ENUM (
  'COUNTERFEIT_OR_FAKE',
  'STOLEN_DEVICE',
  'BLACKLISTED_IMEI',
  'MISLEADING_CONDITION',
  'SCAM_OR_PREPAYMENT_DEMAND',
  'OTHER'
);

CREATE TABLE listing_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES phone_listings(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reason report_reason NOT NULL,
  details TEXT NOT NULL,
  is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolution_notes TEXT,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
```
