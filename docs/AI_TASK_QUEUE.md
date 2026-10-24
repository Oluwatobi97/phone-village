# AI Task Queue

Statuses: READY, IN_PROGRESS, BLOCKED, REVIEW, DONE, DEFERRED.

| ID        | Priority | Task                                                      | Owner           | Status      | Dependencies                                   |
| --------- | -------- | --------------------------------------------------------- | --------------- | ----------- | ---------------------------------------------- |
| PV-AI-001 | P0       | Integrate AI operating system and project governance docs | AI-ORCH + owner | DONE        | Repo inspection complete                       |
| PV-AI-002 | P0       | Confirm actual frontend/backend stack and package manager | AI-ORCH         | DONE        | Next.js App Router (FE & BE API Routes)        |
| PV-AI-003 | P0       | Approve DB, auth, and seller onboarding strategy          | Owner + AI-DATA | DONE        | Shared Account Model & DEC-004                 |
| PV-AI-004 | P1       | Finalise MVP journeys and acceptance criteria             | AI-PROD         | DONE        | Owner review                                   |
| PV-AI-005 | P1       | Agree shared types and API contracts                      | AI-FE + AI-BE   | DONE        | PV-AI-002/003                                  |
| PV-AI-006 | P1       | Build browse-listings vertical slice                      | AI-FE + AI-BE   | IN_PROGRESS | PV-AI-005                                      |

## Active Progress Note
PV-AI-002, PV-AI-003, and PV-AI-005 completed with Next.js App Router REST API handlers (`/api/auth/*`, `/api/sellers/*`), shared TypeScript contracts (`/shared/types/*`), single-use SHA-256 tokens, and automated test suite.
