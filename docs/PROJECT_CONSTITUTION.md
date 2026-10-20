# Project Constitution
## Mission
Build Phone Village, a trustworthy, mobile-first marketplace for buying and selling phones in Nigeria.

## Invariants
1. Truth over appearance; planned features are not live features.
2. Validate inputs and enforce permissions server-side.
3. Prefer small, reviewable changes over unrelated refactors.
4. Keep specs and code aligned; record material decisions.
5. Support mobile, accessibility, and common screen sizes.
6. Minimise personal data and redact logs.
7. Avoid silent scope expansion and unnecessary dependencies.
8. Never commit secrets or real customer data.
9. Never fabricate verification, inspection, reviews, fraud scores, or buyer protection.
10. Report work and checks honestly.

## Boundaries
MVP candidates: public listings, search/filter, listing details, seller profiles and listing management, favourites, enquiries/offers if approved, dealer storefronts if prioritised, and reporting/moderation. The human owner controls final scope.

Payments, escrow/custody, physical inspection operations, AI fraud scoring, and automated phone recognition are deferred until separately approved. Real-money custody requires legal/compliance, payment-partner, security, and operational review.

## Change control and done
AI proposes; the owner approves product, architecture, database, security, and release decisions. If specs conflict, stop. Done means acceptance criteria met, checks run or explicitly not run, diff reviewed, docs/logs updated, and required human review obtained.
