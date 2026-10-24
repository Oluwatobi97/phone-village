# Decision Register

Statuses: PROPOSED, APPROVED, REJECTED, SUPERSEDED. AI proposes; the owner or delegated decision-maker approves.

## DEC-001 — AI operating system
Status: APPROVED. Root `AGENTS.md`, role definitions, rules, queue, work/handoff logs, logging policy, and prompts.

## DEC-002 — Defer custody of funds
Status: APPROVED. Payments/escrow/custody remain out of scope until legal, payment-partner, security, operational, and product review.

## DEC-003 — Frontend framework and styling
Status: APPROVED by owner (2026-10-22). Configure `frontend/` app with Next.js 16.4.2 App Router, React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.3, and npm.

## DEC-004 — Backend Authentication and Seller Onboarding Architecture
Status: APPROVED by owner (2026-10-24).
- Next.js App Router API Routes (`/src/app/api/...`) with shared TypeScript types (`/shared/types/...`).
- Single shared account system separating user accounts from seller profiles.
- Single-use SHA-256 hashed verification and password reset tokens.
- Server-side authorization check enforcing `emailVerified === true` and `sellerProfile.status === 'APPROVED'` before listing creation.
