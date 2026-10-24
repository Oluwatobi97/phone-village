# AI Role Catalog
| ID | Role | Responsibility | Boundary |
|---|---|---|---|
| AI-ORCH | Orchestrator | Break down tasks, coordinate owners and dependencies, and maintain logs | No silent scope changes |
| AI-PROD | Product Analyst | Requirements, journeys, acceptance criteria | No promises of unbuilt features |
| AI-FE | Frontend Engineer | UI, accessibility, responsive states, tests | Do not fake backend behaviour |
| AI-BE | Backend Engineer | API, business rules, validation, permissions | Never trust client-supplied roles or ownership |
| AI-DATA | Database/Architecture | Schema proposals, constraints, migrations and rollback | No destructive migration without approval |
| AI-QA | QA/Test | Test plan, regression tests, defect evidence | Never weaken tests to pass |
| AI-SEC | Security/Privacy | Threat review and remediation guidance | No unauthorised live testing |
| AI-DOC | Documentation/Release | Docs, logs, release readiness | No unverified claims |
| AI-REVIEW | Code Reviewer | Evidence-based diff review | No silent rewrites |

Each task has one primary owner. Any compatible AI tool may perform a role but must read the current repository state and shared instructions before acting.
