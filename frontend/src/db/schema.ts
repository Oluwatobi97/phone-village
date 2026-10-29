import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  bigint,
  numeric,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

// Enums
export const userRoleEnum = pgEnum('user_role', ['BUYER', 'DEALER', 'ADMIN']);
export const hubRegionEnum = pgEnum('hub_region', [
  'LAGOS_COMPUTER_VILLAGE',
  'LAGOS_VICTORIA_ISLAND',
  'ABUJA_BANEX',
  'PH_GARRISON',
  'IBADAN_IWO_ROAD',
]);
export const verificationStatusEnum = pgEnum('verification_status', [
  'UNVERIFIED',
  'PENDING_REVIEW',
  'VERIFIED',
  'REJECTED',
]);
export const phoneConditionEnum = pgEnum('phone_condition', [
  'BRAND_NEW',
  'UK_USED',
  'LOCALLY_USED',
]);
export const listingStatusEnum = pgEnum('listing_status', [
  'ACTIVE',
  'INACTIVE',
  'SOLD',
  'REMOVED_BY_ADMIN',
]);
export const phoneBrandEnum = pgEnum('phone_brand', [
  'APPLE',
  'SAMSUNG',
  'GOOGLE',
  'TECNO',
  'INFINIX',
  'XIAOMI',
  'ONEPLUS',
  'OTHER',
]);
export const reportReasonEnum = pgEnum('report_reason', [
  'COUNTERFEIT_OR_FAKE',
  'STOLEN_DEVICE',
  'BLACKLISTED_IMEI',
  'MISLEADING_CONDITION',
  'SCAM_OR_PREPAYMENT_DEMAND',
  'OTHER',
]);

// 1. Users Table
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 32 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    fullName: varchar('full_name', { length: 128 }).notNull(),
    role: userRoleEnum('role').notNull().default('BUYER'),
    isEmailVerified: boolean('is_email_verified').notNull().default(false),
    isPhoneVerified: boolean('is_phone_verified').notNull().default(false),
    tokenVersion: integer('token_version').notNull().default(1),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index('idx_users_email').on(table.email),
    phoneIdx: index('idx_users_phone').on(table.phone),
  })
);

// 2. Seller Profiles Table
export const sellerProfiles = pgTable(
  'seller_profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' })
      .unique(),
    storeName: varchar('store_name', { length: 128 }).notNull(),
    ownerName: varchar('owner_name', { length: 128 }).notNull(),
    cacNumber: varchar('cac_number', { length: 64 }),
    hubRegion: hubRegionEnum('hub_region').notNull(),
    physicalAddress: text('physical_address').notNull(),
    storePhone: varchar('store_phone', { length: 32 }).notNull(),
    storeWhatsapp: varchar('store_whatsapp', { length: 32 }).notNull(),
    verificationStatus: verificationStatusEnum('verification_status')
      .notNull()
      .default('PENDING_REVIEW'),
    verificationNotes: text('verification_notes'),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    verifiedBy: uuid('verified_by').references(() => users.id),
    storePhotoUrl: text('store_photo_url'),
    rating: numeric('rating', { precision: 3, scale: 2 }).notNull().default('5.00'),
    reviewCount: integer('review_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    hubIdx: index('idx_seller_hub').on(table.hubRegion),
    statusIdx: index('idx_seller_status').on(table.verificationStatus),
  })
);

// 3. Phone Listings Table
export const phoneListings = pgTable(
  'phone_listings',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sellerId: uuid('seller_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    brand: phoneBrandEnum('brand').notNull(),
    model: varchar('model', { length: 128 }).notNull(),
    priceNgn: bigint('price_ngn', { mode: 'number' }).notNull(),
    condition: phoneConditionEnum('condition').notNull(),
    storage: varchar('storage', { length: 32 }).notNull(),
    ram: varchar('ram', { length: 32 }),
    batteryHealth: integer('battery_health'),
    color: varchar('color', { length: 64 }).notNull(),
    hubRegion: hubRegionEnum('hub_region').notNull(),
    locationName: varchar('location_name', { length: 128 }).notNull(),
    physicalTestAddress: text('physical_test_address').notNull(),
    description: text('description').notNull(),
    status: listingStatusEnum('status').notNull().default('ACTIVE'),
    features: jsonb('features').notNull().default([]),
    specs: jsonb('specs').notNull().default({}),
    viewCount: integer('view_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    brandIdx: index('idx_listings_brand').on(table.brand),
    conditionIdx: index('idx_listings_condition').on(table.condition),
    priceIdx: index('idx_listings_price').on(table.priceNgn),
    statusIdx: index('idx_listings_status').on(table.status),
    hubIdx: index('idx_listings_hub').on(table.hubRegion),
    sellerIdx: index('idx_listings_seller').on(table.sellerId),
  })
);

// 4. Listing Images Table
export const listingImages = pgTable(
  'listing_images',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    listingId: uuid('listing_id')
      .notNull()
      .references(() => phoneListings.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    isCover: boolean('is_cover').notNull().default(false),
    displayOrder: integer('display_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    listingIdx: index('idx_images_listing').on(table.listingId),
  })
);

// 5. Favourites Table
export const favourites = pgTable(
  'favourites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    listingId: uuid('listing_id')
      .notNull()
      .references(() => phoneListings.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    uqUserFavourite: uniqueIndex('uq_user_favourite').on(table.userId, table.listingId),
  })
);

// 6. Enquiry Threads & Messages
export const enquiryThreads = pgTable(
  'enquiry_threads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    listingId: uuid('listing_id')
      .notNull()
      .references(() => phoneListings.id, { onDelete: 'cascade' }),
    buyerId: uuid('buyer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    sellerId: uuid('seller_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    isClosed: boolean('is_closed').notNull().default(false),
    lastMessageAt: timestamp('last_message_at', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    uqThread: uniqueIndex('uq_buyer_listing_thread').on(table.buyerId, table.listingId),
  })
);

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    threadId: uuid('thread_id')
      .notNull()
      .references(() => enquiryThreads.id, { onDelete: 'cascade' }),
    senderId: uuid('sender_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    isRead: boolean('is_read').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    threadIdx: index('idx_messages_thread').on(table.threadId),
  })
);

// 7. Listing Reports Table
export const listingReports = pgTable(
  'listing_reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    listingId: uuid('listing_id')
      .notNull()
      .references(() => phoneListings.id, { onDelete: 'cascade' }),
    reporterId: uuid('reporter_id').references(() => users.id, { onDelete: 'set null' }),
    reason: reportReasonEnum('reason').notNull(),
    details: text('details').notNull(),
    isResolved: boolean('is_resolved').notNull().default(false),
    resolutionNotes: text('resolution_notes'),
    resolvedBy: uuid('resolved_by').references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  }
);
