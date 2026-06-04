# Manual QA Strategy

Manual QA checks user-visible quality, exploratory risks, accessibility basics, and release confidence. It complements
automation rather than duplicating it.

## Manual QA Goals

- Confirm the product works as a user experiences it.
- Catch UX, layout, copy, and edge-case issues automation may miss.
- Verify critical flows before release.
- Provide human-readable evidence for release decisions.

## Test Types

Smoke testing:

- Minimal checks after build, deployment, or major refactor.
- Confirms the app is usable.
- Required before production release.

Regression testing:

- Rechecks critical flows and nearby affected behavior.
- Required for release candidates and risky changes.

Exploratory testing:

- Investigates areas where scripts are too narrow.
- Useful for UX, responsive layout, accessibility, unusual data, and browser API behavior.

UAT:

- Confirms the feature satisfies product expectations.
- Requires human approval for business-critical work.

Accessibility spot check:

- Keyboard reachability.
- Visible focus.
- Readable text.
- Meaningful labels.
- No obvious overlap or clipped text.

## Test Plan Requirements

Create a test plan for:

- New features.
- Release candidates.
- User-flow changes.
- High-risk bug fixes.
- UI refactors.

Test plan fields:

- Scope.
- Out of scope.
- Environments.
- Devices and browsers.
- Test data.
- Entry criteria.
- Exit criteria.
- Smoke checks.
- Regression checks.
- Exploratory charters.
- Risks.

Use `templates/test-plan.md`.

## Polite Smoke Checklist

Use after deployable web changes:

- `/` loads without runtime error.
- Main phrase browser is visible.
- UI is usable on mobile width.
- UI is usable on desktop width.
- Phrase packs can be selected.
- Search filters phrases.
- Search can be cleared or replaced.
- Empty search result state is understandable.
- A phrase card shows phrase text, phonetic hint, and translation.
- Copy action does not crash the page.
- Speech action does not crash the page.
- Browser API unavailable paths do not crash the page.
- Large text or reading mode renders clearly when in scope.
- `/manifest.webmanifest` is reachable when PWA behavior is in scope.
- User-facing UI copy comes from i18n when changed.

## Regression Checklist

Phrase browser:

- Initial load and default pack.
- Pack switching.
- Search by phrase text.
- Search by translation or supported searchable fields when implemented.
- Mixed-case search.
- Empty result.
- Long phrase wrapping.
- Phrase card expansion or secondary actions.
- Copy action.
- Speech action.
- Mobile viewport.
- Desktop viewport.
- Keyboard navigation for controls.

Shared helpers:

- Browser API supported path.
- Browser API unavailable path.
- Error path without UI crash.
- Public exports remain stable.

Content:

- Phrase pack JSON remains valid.
- Required fields exist.
- New domain content is not moved into UI localization.
- Static UI copy is localized.

## Exploratory Charters

Use focused 10-30 minute charters.

Suggested charters:

- Stress long phrase text and narrow mobile widths.
- Repeatedly switch packs and search.
- Rapidly click copy and speech actions.
- Disable or mock browser APIs.
- Try empty and unusual search strings.
- Inspect visual hierarchy and readability in a real browser.
- Check first-use experience without prior context.

Use `templates/exploratory-charter.md`.

## Bug Severity

Severity 1 - Blocker:

- App cannot load.
- Critical flow unusable.
- Data loss, security issue, or production-blocking regression.

Severity 2 - High:

- Important feature broken.
- Major layout issue on common viewport.
- Incorrect content in critical scenario.

Severity 3 - Medium:

- Workaround exists.
- Non-critical behavior broken.
- UX issue that affects confidence.

Severity 4 - Low:

- Minor visual, copy, or polish issue.

Use `templates/bug-report.md`.

## UAT Checklist

UAT is required when a product or business owner needs to confirm release fit.

UAT checks:

- Does the feature solve the intended problem?
- Does it match accepted scope?
- Is anything important missing?
- Are trade-offs acceptable?
- Are known risks acceptable?
- Can it ship to the target environment?

Use `templates/uat-checklist.md`.

## Manual QA Done Criteria

Manual QA is done when:

- Test scope was defined.
- Smoke checks passed or blockers were reported.
- Regression checks matched the blast radius.
- Exploratory testing covered highest-risk areas.
- Bugs include reproducible steps.
- Release confidence is stated.
