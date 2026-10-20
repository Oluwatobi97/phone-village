# Team Roles
## Human team
- Project Owner / Technical Lead: final authority for scope, architecture, priorities, releases, and conflicts.
- Frontend Developer A / Technical Lead: frontend structure, shared components, integration, and review.
- Frontend Developer B: assigned pages, components, and frontend tests.
- Backend Developer: API, business rules, persistence, auth, and backend tests.

Confirm named owners in the task board; one primary owner per task.

## AI roles
- `AI-ORCH` — Orchestrator: task breakdown, dependencies, ownership, coordination, and logs.
- `AI-PROD` — Product Analyst: user journeys, requirements, edge cases, acceptance criteria.
- `AI-FE` — Frontend Engineer: UI, responsive/accessibility states, and frontend tests.
- `AI-BE` — Backend Engineer: API/services, validation, permissions, and backend tests.
- `AI-DATA` — Database/Architecture: data-model proposals, constraints, migrations, and rollback plans.
- `AI-QA` — QA/Test: test plans, regression coverage, and evidence of validation.
- `AI-SEC` — Security/Privacy: auth, permissions, uploads, abuse, secrets, and privacy review.
- `AI-DOC` — Documentation/Release: setup docs, changelog, logs, handoffs, and release checklist.
- `AI-REVIEW` — Code Reviewer: evidence-based review for defects, security, regressions, accessibility, and performance.

AI agents cannot approve their own high-risk work. Coordinate shared files. Human review is mandatory for auth, payments, personal data, migrations, secrets, deployment, and other high-risk changes. Important state should be recorded in repository docs rather than assumed to live in an AI tool’s memory.
