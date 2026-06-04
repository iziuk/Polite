# Business Analysis Documentation

This document is the operating guide for the AI Business Analyst. It turns product intent into precise behavior that a
developer, QA engineer, and reviewer can verify.

## Business Requirements Document

A BRD is required when the task affects a full flow, product capability, business rule, or release milestone.

Minimum BRD sections:

- Business problem.
- Target users.
- Current behavior.
- Desired behavior.
- In-scope requirements.
- Out-of-scope requirements.
- Business rules.
- Assumptions.
- Dependencies.
- Acceptance criteria.
- Risks.
- Approval.

Use `templates/business-requirements.md`.

## User Stories

Use user stories to describe value, not implementation.

Format:

```text
As a <user or system actor>, I want <capability>, so that <outcome>.
```

Story quality rules:

- The actor is specific.
- The outcome is user-observable or system-observable.
- The story does not prescribe UI or architecture unless that is the actual requirement.
- The story has acceptance criteria.
- The story can be split if it has multiple independent outcomes.

Use `templates/user-story.md`.

## Use Cases

Use cases are required for important user journeys, multi-step workflows, and flows with alternate paths.

Use case fields:

- Actor.
- Goal.
- Preconditions.
- Trigger.
- Main success path.
- Alternate paths.
- Error paths.
- Postconditions.
- Business rules.
- Acceptance criteria.

Use `templates/use-case.md`.

## Acceptance Criteria

Acceptance criteria must be testable.

Good criteria:

- Given a selected phrase pack, when the user searches by partial phrase text, then matching phrases are shown.
- Given no matching phrases, when the user searches, then an empty state is shown without crashing.

Weak criteria:

- Search should be good.
- UI should look nice.
- The app should be fast.

Acceptance criteria should cover:

- Happy path.
- Empty state.
- Error or unavailable state.
- Permission or role behavior when relevant.
- Mobile and desktop behavior when UI changes.
- Analytics or logging when explicitly required.

## User Flows

For every significant feature, describe:

- Entry point.
- User decisions.
- System responses.
- Success result.
- Exit or recovery path.

Current core Polite flow:

```text
open /
-> choose phrase pack
-> browse or search phrases
-> inspect phrase card
-> copy phrase or play speech
-> optionally use large readable text
```

Future flows should be added as separate use cases or diagrams before implementation.

## Domain Glossary

Glossary prevents AI from mixing business concepts.

Current baseline:

| Term          | Meaning                                                           |
| ------------- | ----------------------------------------------------------------- |
| Phrase        | A ready-to-use sentence or short expression for a real situation. |
| Phrase pack   | A curated group of phrases for a scenario, language, or context.  |
| Phonetic hint | A user-friendly pronunciation guide.                              |
| Translation   | Meaning of the phrase in the user's known language.               |
| Speech action | Browser text-to-speech playback of a phrase.                      |
| Copy action   | Clipboard copy of a phrase or related text.                       |

Use `templates/domain-glossary.md` when new domain terms appear.

## Business Rules And Policies

Rules must be explicit when they affect behavior.

Current baseline rules:

- Phrase content is domain content, not UI copy.
- UI labels and user-facing interface copy live in i18n.
- Browser APIs must fail gracefully when unavailable.
- Static phrase packs are the MVP data source.
- New AI-generated content must not be shipped without content quality review and AI risk review.

Use `templates/business-rules.md`.

## Requirement Risk Checks

Before handing work to architecture or implementation, AI Business Analyst asks:

- Are there conflicting requirements?
- Is any requirement implied but not stated?
- Are there hidden roles, permissions, or user states?
- Are there edge cases that would change the design?
- Is content static, backend-owned, user-generated, or AI-generated?
- Does this task require human approval?

## Handoff To Development

Business analysis is complete when:

- Story and acceptance criteria are clear.
- Main and alternate flows are documented.
- Business rules are explicit.
- Open questions are listed.
- Required human approval is identified.
- QA can derive test cases from the requirements.
