# Architecture Documentation

This document is the operating guide for the AI Architect. It defines the architectural artifacts needed before
implementation, when to create them, and how to keep decisions aligned with Polite's current codebase.

## Current Architecture Baseline

Current Polite baseline:

- Monorepo with npm workspaces and Turbo.
- Web app under `apps/web`.
- Shared domain types and browser helpers under `packages/shared`.
- Static phrase pack data under `packages/data`.
- Next.js app route for `/`.
- FSD-style web layers: app, widgets, entities, shared.
- Public API barrels and aliases are required for cross-layer imports.

The project map in `.ai/project-map` is the first source for navigation.

## Architecture Artifacts

Use these artifacts by change type:

| Change type                                                 | Required artifact                        |
| ----------------------------------------------------------- | ---------------------------------------- |
| New service, package, major module, backend, or integration | System architecture overview and ADR     |
| New user flow spanning modules                              | Component or flow diagram                |
| Data shape, persistence, or backend contract                | Data model and integration contract      |
| Public API change                                           | API specification and compatibility note |
| Performance, availability, security, or scalability concern | Non-functional requirements              |
| Multiple viable technical options                           | RFC or ADR                               |

## System Architecture Overview

Maintain a system overview when adding platform capabilities.

Minimum sections:

- Context.
- Containers or apps.
- Core modules.
- Data sources.
- External APIs.
- Deployment boundary.
- Security boundary.
- Observability boundary.
- Known risks and constraints.

Use `templates/architecture-overview.md`.

## C4 Diagrams

Use C4 diagrams for complex architecture:

- Context: who uses the system and what external systems exist.
- Container: apps, packages, services, databases, queues, storage.
- Component: important modules inside a container.
- Code: use sparingly only when lower-level structure matters.

Use `templates/c4-diagram.md`.

## ADR Policy

Create an ADR for decisions that are expensive to reverse.

ADR triggers:

- New framework, runtime, database, package manager, or deployment platform.
- New backend service, API integration, RAG pipeline, AI provider, or storage model.
- Change to FSD boundaries, package ownership, or public API conventions.
- Security, privacy, compliance, or production reliability trade-off.
- Decision that affects more than one team role or release.

ADR status values:

- Proposed.
- Accepted.
- Superseded.
- Rejected.

Use `templates/adr.md`.

## Technical Constraints

Current constraints:

- Respect `AGENTS.md`.
- Follow FSD layer boundaries.
- Use path aliases for cross-layer imports.
- Import from public APIs.
- Keep UI copy in i18n.
- Keep static phrase content in data packages.
- Do not add dependencies without a dependency review.
- Keep large backend identifiers as strings if backend APIs are added.
- Do not create git worktrees unless requested.
- Use `polite/` branch prefix for project work.

Use `templates/dependency-review.md` when adding a package.

## Integration Contracts

Any future API, webhook, background job, analytics event, AI provider call, or external service needs a contract.

Minimum contract fields:

- Owner.
- Direction: inbound or outbound.
- Authentication.
- Request schema.
- Response schema.
- Error schema.
- Timeout and retry rules.
- Idempotency rules.
- Rate limits.
- Logging and privacy rules.
- Versioning.
- Test strategy.

Use `templates/integration-contract.md` and `templates/api-specification.md`.

## Data Model

Create a data model before adding persistence, backend DTOs, or content schemas.

Minimum fields:

- Entity name.
- Ownership.
- Fields and types.
- Required vs optional fields.
- Identifier strategy.
- Relationships.
- Indexes or lookup requirements.
- Validation rules.
- Migration and rollback notes.
- Privacy classification.

Use `templates/data-model.md`.

## Non-Functional Requirements

NFRs are required for high-impact changes.

Categories:

- Performance and latency.
- Availability.
- Scalability.
- Security.
- Privacy.
- Accessibility.
- Maintainability.
- Observability.
- Cost.
- Data retention.
- Browser support.

Use `templates/non-functional-requirements.md`.

## Architecture Review Questions

Before implementation, AI Architect asks:

- What modules are affected according to the project map?
- Is this a local change or cross-boundary change?
- Does the design preserve public API rules?
- Are there simpler alternatives?
- What behavior must remain stable?
- What data ownership changes?
- What failure modes need fallback?
- What needs an ADR, RFC, or human approval?

## Architecture Done Criteria

Architecture is ready when:

- Affected modules and boundaries are clear.
- Trade-offs are documented.
- Required contracts, data models, and NFRs are drafted.
- ADR or RFC exists when triggered.
- Security and QA can review the design.
