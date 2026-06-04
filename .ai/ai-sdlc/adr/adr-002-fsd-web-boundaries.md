# ADR-002: Use Feature-Sliced Design Boundaries For The Web App

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `AGENTS.md`, `apps/web/src`, `.ai/project-map/modules.yaml`

## Context

The web app is organized under FSD-style layers: app, widgets, entities, and shared. Cross-layer imports need predictable
rules so AI agents and humans do not create tangled dependencies while adding features.

## Decision Drivers

- Preserve clear ownership between routes, composed UI, domain data, and reusable primitives.
- Make module navigation predictable.
- Prevent same-layer cross-slice coupling.
- Keep public APIs stable and discoverable.
- Align implementation with project agent instructions.

## Decision

Polite web code uses Feature-Sliced Design boundaries under `apps/web/src`.

Rules:

- `app` can import from widgets, features, entities, and shared.
- `widgets` can import from features, entities, and shared.
- `features` can import from entities and shared.
- `entities` can import from shared.
- `shared` imports only from shared or external packages.
- Cross-layer imports use path aliases and public APIs.
- Within a slice, local segment imports use relative paths.

## Alternatives Considered

### Flat Component Structure

Pros:

- Simple for very small apps.
- Fewer directories.

Cons:

- Ownership becomes unclear as features grow.
- AI is more likely to import from internals.
- Reuse and refactoring become harder.

### Domain-Only Package Structure

Pros:

- Strong domain modularity.
- Useful for complex backend-heavy systems.

Cons:

- Too heavy for the current web/PWA MVP.
- Does not map as directly to Next.js route and widget ownership.

## Consequences

Positive:

- Clear boundaries for future work.
- Easier project-map maintenance.
- Less accidental coupling.

Negative or trade-offs:

- Small changes require discipline around public APIs.
- Some local imports are longer or need barrel files.
- Agents must read the project map and existing slices before implementation.

## Security And Privacy Impact

No direct sensitive data impact. Clear boundaries reduce risk of leaking private logic into UI layers when backend or
auth work is introduced.

## Operational Impact

Lint and review should enforce boundaries where tooling supports it. Project-map entries should track modules by FSD
layer.

## Rollback Or Reversal

Changing away from FSD would be a broad architecture change requiring a new ADR, import migration plan, and project-map
update.

## Follow-Ups

- Keep public API barrels current.
- Update `.ai/project-map/modules.yaml` when slices or layers are added.
