CREATE TYPE "public"."hub_region" AS ENUM('LAGOS_COMPUTER_VILLAGE', 'LAGOS_VICTORIA_ISLAND', 'ABUJA_BANEX', 'PH_GARRISON', 'IBADAN_IWO_ROAD');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('ACTIVE', 'INACTIVE', 'SOLD', 'REMOVED_BY_ADMIN');--> statement-breakpoint
CREATE TYPE "public"."phone_brand" AS ENUM('APPLE', 'SAMSUNG', 'GOOGLE', 'TECNO', 'INFINIX', 'XIAOMI', 'ONEPLUS', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."phone_condition" AS ENUM('BRAND_NEW', 'UK_USED', 'LOCALLY_USED');--> statement-breakpoint
CREATE TYPE "public"."report_reason" AS ENUM('COUNTERFEIT_OR_FAKE', 'STOLEN_DEVICE', 'BLACKLISTED_IMEI', 'MISLEADING_CONDITION', 'SCAM_OR_PREPAYMENT_DEMAND', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('BUYER', 'DEALER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('UNVERIFIED', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "enquiry_threads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"buyer_id" uuid NOT NULL,
	"seller_id" uuid NOT NULL,
	"is_closed" boolean DEFAULT false NOT NULL,
	"last_message_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favourites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listing_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"url" text NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listing_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"reporter_id" uuid,
	"reason" "report_reason" NOT NULL,
	"details" text NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"resolution_notes" text,
	"resolved_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "phone_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"brand" "phone_brand" NOT NULL,
	"model" varchar(128) NOT NULL,
	"price_ngn" bigint NOT NULL,
	"condition" "phone_condition" NOT NULL,
	"storage" varchar(32) NOT NULL,
	"ram" varchar(32),
	"battery_health" integer,
	"color" varchar(64) NOT NULL,
	"hub_region" "hub_region" NOT NULL,
	"location_name" varchar(128) NOT NULL,
	"physical_test_address" text NOT NULL,
	"description" text NOT NULL,
	"status" "listing_status" DEFAULT 'ACTIVE' NOT NULL,
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"specs" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seller_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"store_name" varchar(128) NOT NULL,
	"owner_name" varchar(128) NOT NULL,
	"cac_number" varchar(64),
	"hub_region" "hub_region" NOT NULL,
	"physical_address" text NOT NULL,
	"store_phone" varchar(32) NOT NULL,
	"store_whatsapp" varchar(32) NOT NULL,
	"verification_status" "verification_status" DEFAULT 'PENDING_REVIEW' NOT NULL,
	"verification_notes" text,
	"verified_at" timestamp with time zone,
	"verified_by" uuid,
	"store_photo_url" text,
	"rating" numeric(3, 2) DEFAULT '5.00' NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "seller_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"full_name" varchar(128) NOT NULL,
	"role" "user_role" DEFAULT 'BUYER' NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"is_phone_verified" boolean DEFAULT false NOT NULL,
	"token_version" integer DEFAULT 1 NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "enquiry_threads" ADD CONSTRAINT "enquiry_threads_listing_id_phone_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."phone_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiry_threads" ADD CONSTRAINT "enquiry_threads_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiry_threads" ADD CONSTRAINT "enquiry_threads_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_listing_id_phone_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."phone_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listing_id_phone_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."phone_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_reports" ADD CONSTRAINT "listing_reports_listing_id_phone_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."phone_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_reports" ADD CONSTRAINT "listing_reports_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_reports" ADD CONSTRAINT "listing_reports_resolved_by_users_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_thread_id_enquiry_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."enquiry_threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phone_listings" ADD CONSTRAINT "phone_listings_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_buyer_listing_thread" ON "enquiry_threads" USING btree ("buyer_id","listing_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_user_favourite" ON "favourites" USING btree ("user_id","listing_id");--> statement-breakpoint
CREATE INDEX "idx_images_listing" ON "listing_images" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "idx_messages_thread" ON "messages" USING btree ("thread_id");--> statement-breakpoint
CREATE INDEX "idx_listings_brand" ON "phone_listings" USING btree ("brand");--> statement-breakpoint
CREATE INDEX "idx_listings_condition" ON "phone_listings" USING btree ("condition");--> statement-breakpoint
CREATE INDEX "idx_listings_price" ON "phone_listings" USING btree ("price_ngn");--> statement-breakpoint
CREATE INDEX "idx_listings_status" ON "phone_listings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_listings_hub" ON "phone_listings" USING btree ("hub_region");--> statement-breakpoint
CREATE INDEX "idx_listings_seller" ON "phone_listings" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "idx_seller_hub" ON "seller_profiles" USING btree ("hub_region");--> statement-breakpoint
CREATE INDEX "idx_seller_status" ON "seller_profiles" USING btree ("verification_status");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_phone" ON "users" USING btree ("phone");