# ADR-004: Use Project Cartographer As Required Navigation Memory

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `.ai/project-map`, `AGENTS.md`

## Context

AI agents need to navigate the repository efficiently without repeatedly scanning the whole codebase. The project has a
structured map under `.ai/project-map` that identifies modules, key files, routes, data flows, and decisions.

## Decision Drivers

- Reduce broad, noisy repository searches.
- Help AI locate affected modules quickly.
- Keep implementation scoped to the right ownership boundaries.
- Preserve lightweight architectural memory between tasks.
- Make documentation updates incremental.

## Decision

Before implementation, AI agents must use the global Project Cartographer workflow and read:

- `.ai/project-map/INDEX.md`.
- `.ai/project-map/modules.yaml`.

After implementation, AI agents must update affected project-map files and append `.ai/project-map/update-log.md`.

## Alternatives Considered

### Search Repository From Scratch Each Task

Pros:

- No map maintenance.
- Can discover unexpected references.

Cons:

- Slower and noisier.
- More likely to miss architectural intent.
- Encourages broad scans even when the affected area is known.

### Static Architecture README Only

Pros:

- Simple to maintain.
- Easy for humans to read.

Cons:

- Not granular enough for module navigation.
- Does not track routes, flows, decisions, and changed areas as explicitly.

## Consequences

Positive:

- Faster task orientation.
- Better scoped changes.
- Clearer final handoffs.

Negative or trade-offs:

- The map must be maintained after changes.
- Stale map entries can mislead agents if not verified.

## Security And Privacy Impact

No direct sensitive data impact. Project-map files must not include secrets or sensitive personal data.

## Operational Impact

Project-map updates are part of the documentation gate for implementation work.

## Rollback Or Reversal

Removing this workflow would require a replacement navigation and documentation strategy, documented in a new ADR.

## Follow-Ups

- Keep `last_verified` values current for changed modules.
- Mark uncertain entries with `needs_review: true`.
