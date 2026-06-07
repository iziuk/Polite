# Automation QA Strategy

Automation should protect critical behavior while staying stable, maintainable, and cheap to run. It should not be added
as ceremony; it should reduce real regression risk.

## Automation Goals

- Catch regressions before release.
- Protect core user journeys.
- Verify contracts and pure logic cheaply.
- Support refactoring.
- Reduce repeated manual work.

## Test Pyramid

Preferred balance:

- Unit tests: pure logic, mappers, validation, helpers.
- Integration tests: module boundaries, component behavior, service interactions.
- Contract/API tests: backend and integration contracts.
- E2E tests: small number of critical user journeys.
- Visual tests: stable high-value UI where layout regressions are common.

Avoid:

- Too many E2E tests for logic that can be unit-tested.
- Tests coupled to implementation details.
- Arbitrary sleeps.
- Tests that depend on production data.

## Current Baseline

Current verification commands:

```bash
npm run lint
npm run build
```

Treat these as minimum checks until a test runner is introduced.

## Candidate Coverage For Polite

Unit candidates:

- Phrase filtering logic once extracted from UI.
- Translation lookup and fallback.
- `copyText` success path.
- `copyText` unavailable-browser path.
- `speak` success path.
- `speak` unavailable-browser path.
- Phrase pack schema validation if introduced.

Integration/component candidates:

- Phrase browser initial render.
- Pack switching.
- Search filtering.
- Empty result state.
- Phrase card actions with mocked browser APIs.
- i18n-driven labels.

E2E candidates:

- Open `/`, select a pack, search, see matching phrases.
- Trigger copy and speech actions without page crash.
- Mobile viewport renders primary workflow without overlap.
- PWA manifest is reachable when PWA behavior is in release scope.

API/contract candidates for future backend:

- Auth required and unauthorized cases.
- Validation errors.
- Rate limits.
- Idempotent operations.
- Error response shape.
- Backward compatibility.

## Automation Test Plan

Create an automation test plan when:

- Introducing a test runner.
- Adding E2E tests.
- Adding backend/API contracts.
- Changing CI policy.
- Covering a critical release flow.

Use `templates/automation-test-plan.md`.

## E2E Scenario Rules

Good E2E scenarios:

- Represent real user value.
- Are stable across small UI refactors.
- Use accessible selectors when possible.
- Control test data.
- Avoid dependency on production services.

Use `templates/e2e-scenario.md`.

## API Test Specification

For future APIs, test:

- Success response.
- Auth required.
- Authorization denied.
- Validation errors.
- Not found.
- Conflict.
- Rate limit if applicable.
- Idempotency if applicable.
- Backward compatibility.

Use `templates/api-test-specification.md`.

## Test Data Strategy

Rules:

- Use deterministic fixtures.
- Keep fixtures close to the tests that own them.
- Avoid production data.
- Clean up created data.
- Do not include secrets or real PII.
- Version fixture data when it represents a contract.

## CI Policy

PR checks should run:

- Lint.
- Build.
- Unit/integration tests when introduced.

Release checks should run:

- PR checks.
- Critical E2E journeys.
- Manual smoke checklist.
- Migration/rollback checks when relevant.

Use `templates/ci-test-policy.md`.

## Flaky Test Policy

Flaky tests are product risk.

When a test flakes:

- Reproduce if possible.
- Inspect logs and screenshots.
- Classify cause: timing, shared state, environment, network, product instability, or test bug.
- Fix selectors, waits, fixtures, isolation, or product behavior.
- Quarantine only with tracked owner and follow-up.
- Do not repeatedly rerun CI without diagnosis.

## Coverage Expectations

Coverage is behavior-based.

Critical behavior must be covered:

- Search and phrase browsing.
- Browser helper failure paths.
- Public API exports for shared helpers and phrase entities.
- Future auth, payments, sensitive-data, and AI workflows.

Coverage gaps must be documented in the final handoff when relevant.

## Automation QA Done Criteria

Automation QA is done when:

- Correct test level was selected.
- Tests are deterministic.
- CI expectations are clear.
- Critical paths have coverage or documented gaps.
- Flaky behavior is not ignored.
