# Phone Village — Mandatory AI Instructions
Applies to ChatGPT, Codex, Claude, Hermes, IDE agents, and future AI tools. Read this first, then relevant files in `docs/`.

## Mission and authority
Build a trustworthy, mobile-first Nigerian phone marketplace. AI agents contribute; the human owner makes final product, architecture, security, and release decisions.

## Required startup
1. Read this file, `docs/PROJECT_CONSTITUTION.md`, `docs/AI_AGENT_RULES.md`, and `docs/TEAM_ROLES.md`.
2. Read relevant specs and the latest task queue, work log, handoff log, and decision register.
3. Inspect the current branch, git status, actual files, manifests, and scripts before editing.
4. Confirm the task ID, owner, acceptance criteria, dependencies, and scope. Surface ambiguity instead of guessing.
5. Review any relevant docs in `docs/` and verify whether the repo already implements a feature before assuming it exists.

## Safe execution
- Work only on the assigned task and approved branch. Never force-push, rewrite shared history, or push directly to `main`.
- Read files before editing and preserve any existing work.
- Do not invent frameworks, commands, routes, database schema, dependencies, credentials, tests, or working features.
- Do not install dependencies or alter root configuration without inspecting manifests and documenting why.
- Coordinate edits to shared files, manifests, API contracts, database schemas, auth, and design tokens.
- Stop for destructive changes, production data, secrets, payments/escrow, identity verification, or unclear security impact.
- Never log secrets or unnecessary personal data. Never claim tests or deployment without evidence.

## AI role expectations
The repository uses the following roles:
- `AI-ORCH`: coordinates work, dependencies, approvals, and task tracking.
- `AI-PROD`: owns product scope, journeys, and acceptance criteria.
- `AI-FE`: implements frontend changes and UI states.
- `AI-BE`: implements API and backend logic with validation and auth checks.
- `AI-DATA`: proposes schema and database integrity rules.
- `AI-QA`: plans and runs tests/regression checks.
- `AI-SEC`: reviews security, privacy, and abuse risks.
- `AI-DOC`: maintains docs, logs, changelog, and release readiness notes.
- `AI-REVIEW`: reviews changes for correctness, maintainability, and regressions.

AI tools may perform a compatible role, but they must not approve or validate their own high-risk work without human review.

## Workflow and validation
- Inspect the current codebase before proposing or implementing changes.
- Define scope, dependencies, and acceptance criteria before making edits.
- Make the smallest correct change; avoid unrelated refactors.
- Follow the verified project stack and existing conventions.
- Run only existing checks that are relevant and safe to execute.
- Update the appropriate task queue, work logs, handoff notes, and docs when work changes.
- Report actual validation results, blocked checks, and next actions.

## Completion report
State the task ID, outcome, files changed, decisions made, validation performed, known limitations, and next action. Do not mark work complete while acceptance criteria remain unmet. If specs conflict, stop and report the conflict.
