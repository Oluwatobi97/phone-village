# AI Task Queue

Statuses: READY, IN_PROGRESS, BLOCKED, REVIEW, DONE, DEFERRED.

| ID        | Priority | Task                                                      | Owner           | Status      | Dependencies                                   |
| --------- | -------- | --------------------------------------------------------- | --------------- | ----------- | ---------------------------------------------- |
| PV-AI-001 | P0       | Integrate AI operating system and project governance docs | AI-ORCH + owner | IN_PROGRESS | Repo inspection complete                       |
| PV-AI-002 | P0       | Confirm actual frontend/backend stack and package manager | AI-ORCH         | IN_PROGRESS | Frontend stack selected; confirm backend stack |
| PV-AI-003 | P0       | Approve DB, auth, and image storage approach              | Owner + AI-DATA | BLOCKED     | Owner decision                                 |
| PV-AI-004 | P1       | Finalise MVP journeys and acceptance criteria             | AI-PROD         | READY       | Owner review                                   |
| PV-AI-005 | P1       | Agree shared types and API contracts                      | AI-FE + AI-BE   | BLOCKED     | PV-AI-002/003                                  |
| PV-AI-006 | P1       | Build browse-listings vertical slice                      | AI-FE + AI-BE   | BLOCKED     | PV-AI-005                                      |

## Task template

ID/title; priority/status; primary owner/reviewer; goal; scope in/out; dependencies; allowed files; acceptance criteria; security/privacy impact; checks; handoff.

Do not start blocked tasks. One primary owner per task. Mark DONE only after acceptance criteria and checks are verified.

PV-AI-002 remains in progress: the frontend stack is recorded in DEC-003 and verified from the local frontend manifest; backend framework selection is still pending.
