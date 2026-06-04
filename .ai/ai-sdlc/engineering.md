# Engineering Documentation

This document is the operating guide for AI Frontend, Backend, and Fullstack Developer roles. It complements `AGENTS.md`
with delivery-specific engineering expectations.

## Engineering Principles

Default engineering priorities:

1. Correct behavior.
2. Clear ownership boundaries.
3. Small cohesive changes.
4. Maintainability.
5. Testability.
6. Performance when it matters.
7. Reuse only when it removes real duplication.

Trade-off rules:

- MVP work may prefer speed, but not at the cost of broken core flows.
- Production work must prefer reliability and observability.
- Security-sensitive work must prefer explicit checks and review over convenience.
- Shared abstractions must be justified by repeated use or boundary ownership.

## Coding Standards

Follow `AGENTS.md` for:

- TypeScript strict mode.
- FSD import boundaries.
- Naming.
- React component style.
- i18n.
- Mock data policy.
- MUI and styling rules if MUI is used.
- Formatting and import rules.

Additional AI engineering rules:

- Do not invent requirements to make implementation easier.
- Do not silently broaden scope.
- Do not hide verification gaps.
- Prefer the existing package and app structure.
- Preserve current public contracts unless the task asks for a behavior change.
- Keep generated docs and templates plain, searchable, and actionable.

## Frontend Guidelines

Before frontend work:

- Identify route, widget, feature, entity, and shared modules from the project map.
- Identify user-facing copy and add i18n keys when required.
- Identify responsive states.
- Identify empty, loading, disabled, and error states.
- Identify keyboard and screen-reader requirements.

Implementation guidance:

- Keep route files thin.
- Keep widgets responsible for composed workflows.
- Keep entities responsible for domain data and types.
- Keep shared UI primitives generic.
- Keep browser-specific helpers behind shared facades.
- Avoid inline user-facing strings.
- Avoid one giant component when focused extraction clarifies ownership.

Frontend verification:

- Lint/build.
- Manual responsive check when UI changes.
- Smoke flow for touched route.
- Component or E2E tests when test runner exists.

## Backend Guidelines

There is no backend service in the current MVP. If backend work is introduced, first create architecture, API, data, and
security artifacts.

Backend implementation guidance:

- Define API contracts before code.
- Validate all external input.
- Keep services UI-agnostic.
- Keep DTOs and domain types explicit.
- Treat large external identifiers as strings.
- Define error shapes.
- Document auth and authorization rules.
- Avoid hidden singletons for environment-dependent services.

Required artifacts before backend implementation:

- Architecture overview.
- Integration contract or API specification.
- Data model.
- Security requirements.
- Test strategy.

## Database Guidelines

Before database work:

- Define entity ownership.
- Define identifiers.
- Define relationships and constraints.
- Define indexes.
- Define migration and rollback.
- Define privacy classification.
- Define seed and fixture needs.

Database rules:

- Do not add persistence as a side effect of UI work.
- Do not store PII without privacy approval.
- Do not use destructive migrations without rollback notes and human approval.
- Keep migrations reviewable and small.

## API Documentation

Every API should define:

- Endpoint or operation name.
- Request method.
- Auth requirements.
- Request parameters and body.
- Response body.
- Error responses.
- Idempotency.
- Rate limits.
- Examples.
- Test cases.

Use `templates/api-specification.md`.

## Error Handling Policy

User-facing errors:

- Should be understandable.
- Should not expose internals.
- Should guide the next action when possible.
- Must be localized when shown in UI.

Internal errors:

- Should preserve useful debugging context.
- Must not log secrets or sensitive personal data.
- Should identify affected route, module, operation, or request id when available.

Browser API errors:

- Must fail gracefully.
- Must not crash the page.
- Should provide fallback UI only when that fallback helps the user.

## Dependency Policy

Before adding a package:

- Confirm existing code cannot solve the problem simply.
- Check maintenance status, bundle impact, license, security posture, and API stability.
- Explain why the dependency is worth it.
- Prefer mature libraries for complex domains, such as parsing, security, testing, or 3D.
- Avoid adding packages for small helpers.

Use `templates/dependency-review.md`.

## Engineering Handoff

Implementation is ready when:

- Requirements are clear.
- Architecture impact is known.
- Files to change are identified.
- Verification path is known.
- Security/privacy risk is understood.
- Documentation updates are planned.

Implementation is complete when:

- Acceptance criteria pass.
- Diff or pull request is ready for AI PR Reviewer review.
- Verification was run or gaps are documented.
- Pull request is created or updated for review.
- PR reviewer findings are resolved or documented before merge/final handoff.
- Pull request is merged when all gates pass, or merge blockers are documented.
- Project map is updated.
- User-facing changes are QA-ready.
