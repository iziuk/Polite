# ADR-001: Use Npm Workspace Monorepo With Next.js Web App

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `package.json`, `apps/web/package.json`, `.ai/project-map/INDEX.md`

## Context

Polite currently ships as a monorepo with workspace packages for the web app, mobile placeholder, shared helpers, and
static phrase data. The active user-facing app is the Next.js web/PWA phrase browser under `apps/web`.

The team needs a baseline decision that future AI and human contributors can use when deciding where app, package, and
shared code belongs.

## Decision Drivers

- Keep the MVP simple and deployable as a web/PWA.
- Preserve room for shared package reuse.
- Keep phrase data and shared helpers outside app-specific UI code.
- Allow future mobile work without rewriting domain types and helpers.
- Use the current repository structure instead of inventing a parallel architecture.

## Decision

Polite uses an npm workspace monorepo with the active Next.js web app in `apps/web` and reusable packages under
`packages/`.

Current framework and package versions are recorded in package manifests. Future version upgrades do not require a new
ADR unless they change architecture, runtime assumptions, or compatibility constraints.

## Alternatives Considered

### Single App Repository

Pros:

- Less workspace overhead.
- Slightly simpler for a web-only prototype.

Cons:

- Harder to share helpers and domain types with mobile or backend packages.
- Encourages app-specific ownership for reusable code.
- Less compatible with the current repository shape.

### Separate Repositories

Pros:

- Clear isolation between products or platforms.
- Independent release pipelines.

Cons:

- Too heavy for the MVP.
- More coordination overhead.
- Shared phrase/domain code would need package publishing or duplication.

## Consequences

Positive:

- Shared packages can support web and future mobile code.
- Static data can remain app-independent.
- AI can use the project map to locate apps and packages quickly.

Negative or trade-offs:

- Workspace tooling and package boundaries must be maintained.
- Cross-package imports need clear public APIs.
- Build and lint commands may span multiple workspaces.

## Security And Privacy Impact

No direct sensitive data impact. Future shared packages that handle sensitive data must define privacy and security
contracts before implementation.

## Operational Impact

Build, lint, and future CI should operate from the monorepo root. Deployment can still target the web app.

## Rollback Or Reversal

Reversing this decision would require splitting packages or flattening the repository. That should require a new ADR and
release impact review.

## Follow-Ups

- Keep package ownership reflected in `.ai/project-map/modules.yaml`.
- Add ADRs before introducing backend, database, CI/CD, or production infrastructure decisions.
