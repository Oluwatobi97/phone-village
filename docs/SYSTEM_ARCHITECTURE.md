# System Architecture
## Observed starting point
The repository contains `frontend`, `backend`, `shared`, `docs`, and `.github` directories. The root package manifest is minimal; `backend/src/app.ts` is a placeholder and there is no evidence yet of a final application framework or runtime. The project is therefore in a scaffolded, planning-heavy state rather than a validated architecture.

## Principles
- Frontend uses a typed API/service layer.
- Backend owns business rules, validation, authorisation, and persistence.
- Shared types stay framework-agnostic.
- Prefer a modular monolith for MVP unless evidence supports separation.
- Centralise configuration and safe error handling; redact logs.

Candidate modules: auth, users, listings, sellers/dealers, favourites, enquiries/messages, offers, moderation.

## Decisions to confirm
- Frontend/backend frameworks and versions
- Database engine and migrations
- Auth/session strategy
- Image storage and moderation
- Hosting and CI checks

Do not install or assume a stack before inspecting the actual repo and recording the owner-approved decision.
