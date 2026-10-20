# Database Specification
Candidate logical entities only; not an approved physical schema. Confirm database engine and migration tooling before any migration.

Candidate entities:
- User/account status
- SellerProfile / optional DealerProfile
- PhoneListing
- ListingImage
- Favourite
- Enquiry / Conversation / Message, if approved
- Offer, if approved
- Report / ModerationAction
- Minimal redacted AuditEvent

Use stable keys, foreign keys, constraints, and query-aligned indexes. Represent money exactly (never floating point). Enforce ownership in backend services. Define status transitions and retention/deletion rules. Never store plaintext passwords, tokens, payment credentials, or secrets. Do not log message bodies or unnecessary personal data.

Before migration, confirm engine/tooling, nullability, constraints, retention, indexes, migration and rollback. Destructive or production migrations require explicit owner approval.
