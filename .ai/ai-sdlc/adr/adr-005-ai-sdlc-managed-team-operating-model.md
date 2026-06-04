# ADR-005: Use AI SDLC Managed Fullstack Team Operating Model

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `.ai/ai-sdlc`, `AGENTS.md`

## Context

Polite uses AI for product, engineering, QA, DevOps, security, release, and documentation work. A single "write code"
mode is not sufficient for non-trivial changes, especially when architecture, sensitive data, production, or AI features
are involved.

## Decision Drivers

- Make AI-assisted work auditable.
- Right-size process by risk.
- Simulate the roles a real fullstack team would cover.
- Preserve quality gates and human approval points.
- Keep reusable artifacts and templates in the repository.

## Decision

Polite uses `.ai/ai-sdlc` as the managed AI fullstack team operating model.

For low-risk work, agents may use the lightweight path. For non-trivial work, agents must use the coverage matrix,
workflow, role playbooks, quality gates, templates, and approval rules.

## Alternatives Considered

### Ad Hoc AI Assistance

Pros:

- Fast for small tasks.
- Minimal process overhead.

Cons:

- Inconsistent quality.
- Missing security, QA, release, and documentation checks.
- Hard to audit decisions and risks.

### Full SDLC For Every Task

Pros:

- Maximum consistency.
- Strong audit trail.

Cons:

- Too heavy for small fixes.
- Slows down low-risk work unnecessarily.

## Consequences

Positive:

- Workflows scale with risk.
- Role responsibilities are explicit.
- Required artifacts are easier to discover.
- Human approval gates are documented.

Negative or trade-offs:

- More documentation to maintain.
- Agents must classify work before implementation.
- Some tasks need more upfront analysis.

## Security And Privacy Impact

Positive impact: sensitive work has explicit security/privacy gates and human approval requirements.

## Operational Impact

Release, QA, DevOps, and incident-response workflows can be standardized before production complexity increases.

## Rollback Or Reversal

Replacing the operating model requires a new governance ADR and updated project instructions.

## Follow-Ups

- Keep coverage matrix aligned with new documentation areas.
- Add templates when new recurring artifact types appear.
