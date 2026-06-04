# ADR-003: Use Static Phrase Packs As The MVP Data Source

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `packages/data`, `apps/web/src/entities/phrase`, `.ai/project-map/data-flow.md`

## Context

The current product is a phrase browser MVP. Phrase packs are stored as JSON files in `packages/data` and imported into
the web app through the phrase entity.

The team needs a clear data-source decision before adding backend APIs, persistence, CMS, or AI-generated phrase content.

## Decision Drivers

- Optimize the MVP for speed, simplicity, and offline-friendly behavior.
- Avoid backend, database, auth, and deployment complexity before product validation.
- Keep phrase content centralized and versioned.
- Preserve a clean path for future content governance.

## Decision

Polite uses static phrase pack JSON files as the MVP data source.

Phrase content remains backend/content data, not localized UI copy. UI labels and interface text remain in the i18n
translation files.

## Alternatives Considered

### Backend API

Pros:

- Dynamic content updates.
- Easier personalization and analytics integration later.
- Can support admin/content workflows.

Cons:

- Requires API contracts, persistence, auth/security review, hosting, monitoring, and rollback.
- More expensive than needed for the MVP phrase browser.

### CMS

Pros:

- Friendly content management workflow.
- Content can change without code deploys.

Cons:

- Introduces vendor/platform dependency.
- Requires permissions, publishing workflow, and content quality gates.
- Too much process for current scope.

### AI-Generated Phrases

Pros:

- Could expand coverage quickly.
- Could personalize phrasing.

Cons:

- Requires AI evals, safety checks, human review, content governance, and fallback.
- Risk of inaccurate, inappropriate, or unsafe phrases.
- Not appropriate as default MVP source.

## Consequences

Positive:

- Simple build-time data flow.
- No backend dependency for the MVP.
- Phrase data can be reviewed in version control.
- The app stays usable without API availability.

Negative or trade-offs:

- Content updates require code changes and deployment.
- No personalization or server-side analytics by default.
- Large content growth may require a new content architecture.

## Security And Privacy Impact

No user data is stored by this decision. Future content systems, personalization, or AI-generated content require
security, privacy, and AI risk review.

## Operational Impact

No runtime backend operations are needed for phrase data. Releases must include phrase content changes.

## Rollback Or Reversal

Moving to API, CMS, or AI-generated content requires a new ADR plus API/data/security/QA artifacts.

## Follow-Ups

- Maintain phrase interfaces in shared packages.
- Add content governance before scaling phrase packs broadly.
