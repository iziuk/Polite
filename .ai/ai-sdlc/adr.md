# Architecture Decision Records

This document defines how Polite creates, approves, stores, uses, and revises Architecture Decision Records. ADRs are
mandatory for decisions that shape architecture, platform direction, AI capability, security posture, production
operations, or long-term team conventions.

## Purpose

An ADR records a decision that should not be rediscovered every time a human or AI agent touches the project.

ADRs preserve:

- Why a decision was needed.
- What option was selected.
- Which alternatives were rejected.
- Which trade-offs were accepted.
- Which risks or follow-ups remain.
- What would need to change if the decision is revisited.

ADRs are decision memory. They are not implementation tickets, meeting notes, or broad design essays.

## Source Of Truth

| Item                         | Location                       |
| ---------------------------- | ------------------------------ |
| ADR operating policy         | `.ai/ai-sdlc/adr.md`           |
| ADR records                  | `.ai/ai-sdlc/adr/`             |
| ADR template                 | `.ai/ai-sdlc/templates/adr.md` |
| Architecture guide           | `.ai/ai-sdlc/architecture.md`  |
| Project-map decision summary | `.ai/project-map/decisions.md` |

The ADR folder is the authoritative decision log. The project map may summarize active decisions for navigation, but it
must not replace the full ADR record.

## When ADRs Are Required

Create or update an ADR for decisions that are expensive to reverse or likely to affect future work.

Required triggers:

- New framework, runtime, package manager, workspace model, or major dependency.
- New backend service, database, persistence model, API platform, or integration.
- New deployment platform, CI/CD strategy, environment model, observability model, or rollback strategy.
- New AI provider, model integration, prompt architecture, RAG pipeline, embedding store, evaluation strategy, or
  AI-generated user-facing capability.
- Changes to FSD layer boundaries, package ownership, public API conventions, or import rules.
- Security, privacy, compliance, auth, authorization, secrets, or production reliability trade-offs.
- Human approval policy, release gate, or governance decision that constrains future delivery.
- A decision that affects multiple roles: Product, BA, Architecture, Engineering, QA, DevOps, Security, or Human
  Approver.

## When ADRs Are Recommended

An ADR is recommended when:

- There are multiple reasonable options and the rejected alternatives matter.
- The team has debated the same topic more than once.
- The implementation is simple, but the decision logic is not obvious.
- A future maintainer would ask "why is it like this?".
- A project-map decision summary would otherwise become too vague.

## When ADRs Are Not Needed

Do not create an ADR for:

- Routine bug fixes.
- Small localized UI changes.
- Copy changes.
- Mechanical refactors that preserve public behavior.
- Implementation details already covered by an accepted ADR and local code conventions.
- Temporary experiments that do not become project direction.

For low-risk work, a short final handoff and project-map update can be enough.

## Status Values

Use one of these statuses:

- Proposed: drafted but not accepted as team direction.
- Accepted: approved and active.
- Rejected: considered and intentionally not adopted.
- Superseded: replaced by a newer ADR.
- Deprecated: still historically true, but no longer recommended for new work.

Only Accepted ADRs govern implementation. Proposed ADRs guide discussion but require human approval before major
architecture, security, privacy, AI, infrastructure, or production consequences are implemented.

## Naming And Numbering

ADR files live in `.ai/ai-sdlc/adr/`.

File naming:

```text
adr-001-short-kebab-title.md
adr-002-short-kebab-title.md
```

Rules:

- Use the next available number.
- Never renumber existing ADRs.
- Keep titles stable after acceptance unless the decision is clarified.
- Use lowercase kebab-case file names.
- Reference superseding ADRs instead of deleting old records.

## Required ADR Sections

Use `.ai/ai-sdlc/templates/adr.md`.

Each ADR must include:

- Status.
- Date.
- Owner.
- Related work.
- Context.
- Decision drivers.
- Decision.
- Alternatives considered.
- Consequences.
- Security and privacy impact.
- Operational impact.
- Rollback or reversal path.
- Follow-ups.

## ADR Quality Bar

An ADR is ready for acceptance when:

- The decision statement is specific enough to implement.
- At least one rejected alternative is documented.
- Trade-offs are honest and concrete.
- Security, privacy, and operational impacts are addressed.
- The reversal path is clear, or the decision is explicitly marked hard to reverse.
- The human approval requirement is clear.
- Related templates, specs, or implementation files are linked when available.

## Role Responsibilities

| Role                           | Responsibility                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| AI Architect                   | Drafts ADRs, evaluates alternatives, owns architectural consistency.                     |
| AI Product Owner               | Confirms product impact and user/business trade-offs.                                    |
| AI Business Analyst            | Confirms requirements, business rules, and acceptance criteria affected by the decision. |
| AI Developer                   | Confirms implementation feasibility and package/module impact.                           |
| AI QA Manual                   | Confirms manual verification implications.                                               |
| AI QA Automation               | Confirms test automation and regression implications.                                    |
| AI DevOps / SRE                | Reviews deployment, environment, monitoring, rollback, and reliability impact.           |
| AI Security / Privacy Reviewer | Reviews security, privacy, prompt/retrieval, data handling, and compliance impact.       |
| Human Approver                 | Accepts major ADRs, reversals, high-risk trade-offs, and production-impacting decisions. |

## Human Approval Rules

Human approval is required before accepting or reversing ADRs that involve:

- Major architecture direction.
- Backend, database, infrastructure, deployment, CI/CD, or production operations.
- Auth, authorization, secrets, sensitive data, privacy, payments, legal, or compliance concerns.
- AI provider, model, RAG, embeddings, prompt architecture, AI-generated user-facing content, or evaluation policy.
- High security, privacy, operational, or product risk.

Low-risk ADRs can be drafted by AI and left Proposed until the user explicitly accepts them.

## How AI Uses ADRs

Before non-trivial implementation, AI must:

1. Read `AGENTS.md`.
2. Read `.ai/project-map/INDEX.md` and `.ai/project-map/modules.yaml`.
3. Read `.ai/ai-sdlc/adr.md`.
4. Check `.ai/ai-sdlc/adr/README.md` for relevant accepted ADRs.
5. Read the relevant ADR records.
6. Treat Accepted ADRs as constraints.
7. Treat Proposed ADRs as context, not authority.
8. Report conflicts between the request, code, project map, and ADRs instead of silently choosing one.

## Conflict Resolution

When sources conflict:

- Code and configuration show current behavior.
- Accepted ADRs explain intended architectural direction.
- `AGENTS.md` and `.ai/ai-sdlc` define delivery rules.
- User instructions define the current task scope.
- Project-map files are navigation aids and summaries, not substitutes for source files.

If implementation has drifted from an accepted ADR, record the drift and ask for human approval before making a major
correction outside the requested scope.

## Revision Process

Do not edit accepted ADRs to hide history.

Allowed edits to accepted ADRs:

- Fix typos.
- Add links to related implementation or follow-up documents.
- Clarify wording without changing the decision.

For decision changes:

1. Create a new ADR.
2. Set the new ADR to Proposed.
3. Explain why the old decision is being replaced.
4. Get required human approval.
5. Mark the old ADR as Superseded and link to the new one.
6. Update `.ai/ai-sdlc/adr/README.md`.
7. Update `.ai/project-map/decisions.md` when the decision affects project-map conventions.

## Review Cadence

Review ADRs:

- During architecture work.
- Before new AI, backend, infrastructure, security, or production work.
- When repeated discussions suggest a decision is unclear.
- During major release readiness checks.
- After incidents or postmortems that reveal a wrong or incomplete decision.

## Baseline ADR Set

The initial Polite ADR set records current project-level decisions:

- ADR-001: Use npm workspace monorepo with Next.js web app.
- ADR-002: Use Feature-Sliced Design boundaries for the web app.
- ADR-003: Use static phrase packs as the MVP data source.
- ADR-004: Use Project Cartographer as required navigation memory.
- ADR-005: Use AI SDLC managed fullstack team operating model.
- ADR-006: Require human approval gates for high-risk work.
- ADR-007: Adopt a RAG-ready knowledge retrieval policy.

Future examples that would require ADRs:

- Use PostgreSQL as primary database.
- Use TanStack Query for backend server state after APIs exist.
- Use Playwright for E2E tests.
- Use GitHub Actions for CI/CD.
- Use a specific AI model/provider.
- Use a vector database or embedding provider for automated RAG.

## ADR Done Criteria

ADR governance is satisfied when:

- The ADR exists or the task explains why no ADR is needed.
- Status is accurate.
- Alternatives and consequences are documented.
- Human approval gates are respected.
- Related AI SDLC docs and project-map summaries are updated.
- The final handoff mentions ADR impact.
