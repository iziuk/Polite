# AI SDLC Operating System

This directory defines how Polite uses AI as a managed fullstack product team rather than as a single code generator.
It gives AI a controlled process, role model, artifact library, quality gates, QA strategy, security review, DevOps
discipline, and human approval rules.

## Goal

AI should not jump from request to code for meaningful work. It should move through the same reasoning stages a good
fullstack team would use:

```text
understand requirement
-> validate product value
-> analyze business rules
-> design architecture
-> review risk and security
-> plan implementation
-> implement
-> verify automatically
-> verify manually
-> update docs
-> prepare release or rollback
```

Small low-risk work can collapse these steps into a short checklist. High-risk work must keep the relevant stages
explicit.

## Source Of Truth

| Area                             | File                       |
| -------------------------------- | -------------------------- |
| Coverage map                     | `coverage-matrix.md`       |
| End-to-end workflow              | `workflow.md`              |
| Product and business             | `product-business.md`      |
| Business analysis                | `business-analysis.md`     |
| Architecture                     | `architecture.md`          |
| Architecture decision records    | `adr.md`, `adr/`           |
| Engineering                      | `engineering.md`           |
| AI development policy            | `ai-development-policy.md` |
| RAG and project knowledge        | `rag-strategy.md`          |
| Roles                            | `roles.md`                 |
| RACI / responsibility matrix     | `responsibility-matrix.md` |
| Quality gates                    | `quality-gates.md`         |
| Manual QA                        | `qa-manual.md`             |
| Automation QA                    | `qa-automation.md`         |
| DevOps and release               | `devops-release.md`        |
| Security, privacy, and AI risk   | `security-risk.md`         |
| Governance and change management | `governance.md`            |
| Reusable templates               | `templates/`               |

## When To Use The Full AI SDLC

Use the full process for:

- New features or user flows.
- Architecture changes.
- New integrations, APIs, databases, persistence, backend services, or AI features.
- Auth, authorization, payments, privacy, secrets, security, compliance, or production release work.
- Cross-module refactors.
- Test strategy, release readiness, incident response, or DevOps work.
- Any change where the wrong decision would be expensive to reverse.

## Lightweight Path

For small low-risk work:

1. Read `AGENTS.md`.
2. Read `.ai/project-map/INDEX.md` and `.ai/project-map/modules.yaml`.
3. Identify the affected module.
4. State the intended behavior.
5. Implement the smallest cohesive change.
6. Verify with the narrowest useful check.
7. Update the project map if files changed.
8. Report verification and residual risk.

Examples:

- Documentation typo.
- Local UI copy adjustment.
- Small style or layout correction.
- Low-risk helper refactor with no public contract change.

## Full Path

For non-trivial work:

1. Intake and classify work.
2. Product validation.
3. Business analysis.
4. Architecture review.
5. Security, privacy, and AI risk review.
6. Implementation plan.
7. Development.
8. Automated verification.
9. Manual QA.
10. Documentation and project-map update.
11. Release readiness and rollback planning.

Use `workflow.md` for stage details.

## Human Approval Gates

A human must approve before:

- Changing product strategy, scope, pricing, legal terms, or business-critical user journeys.
- Adding, storing, exposing, or transmitting sensitive personal data.
- Modifying auth, authorization, secrets, payments, deployment, or production infrastructure.
- Accepting a major architecture decision or reversing an existing ADR.
- Implementing or changing an automated RAG pipeline, embedding store, AI provider, or retrieval strategy that affects
  sensitive data, user-facing output, production workflows, or architecture.
- Adding AI-generated content to production user-facing flows.
- Deploying to production.
- Bypassing checks.
- Accepting a high security, privacy, compliance, or operational risk.

## AI Autonomy Rule

AI must identify its autonomy level for non-trivial work:

- Level 0: analysis only, human approval required before implementation.
- Level 1: implementation after human-approved direction.
- Level 2: supervised autonomy within clear scope.
- Level 3: routine autonomy for low-risk work.

See `ai-development-policy.md`.

## Required Handoff Format

For meaningful work, final handoff should include:

- Branch.
- Scope completed.
- Changed files.
- Verification commands and results.
- Manual QA performed or skipped.
- Human approvals required or received.
- ADR/RAG strategy impact when relevant.
- Project-map updates.
- Residual risks and follow-ups.

## Project-Specific Baseline

Current baseline verification:

```bash
npm run lint
npm run build
```

Current branch convention:

- Create normal work branches from `main` with the `polite/` prefix.
- Do not create git worktrees unless explicitly requested.

Current product baseline:

- Polite is a web/PWA phrase browser MVP.
- Static phrase packs live in `packages/data`.
- Shared browser helpers and domain types live in `packages/shared`.
- Web UI uses FSD modules under `apps/web/src`.

Current knowledge baseline:

- Accepted architecture decisions live in `.ai/ai-sdlc/adr/`.
- ADR policy lives in `.ai/ai-sdlc/adr.md`.
- AI context retrieval and future RAG rules live in `.ai/ai-sdlc/rag-strategy.md`.
- The project map remains the required first navigation source before implementation.

## Operating Principle

AI is allowed to move fast only when the risk is low and the behavior is clear. When risk increases, AI must slow down,
produce artifacts, pass gates, and ask for human approval where this operating system requires it.
