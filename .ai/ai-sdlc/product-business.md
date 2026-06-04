# Product And Business Documentation

This document is the operating guide for the AI Product Owner and the human founder/product approver. It answers what
Polite is building, for whom, why it matters, how work is prioritized, and how AI should judge whether a task is worth
doing.

## Product Vision

Polite helps people communicate in practical real-life situations when they do not fully control the local language. The
current MVP is a web/PWA phrase browser with ready-made phrases, phonetic hints, translations, copy actions, and text to
speech.

The long-term product direction can grow into:

- A multilingual phrase and conversation assistant.
- A travel, migration, and everyday-services communication helper.
- A mobile-first offline-capable product.
- A curated phrase knowledge base with scenario packs, personalization, and possibly AI-assisted phrase generation.

Use `templates/product-vision.md` whenever the product direction changes or a new product line is proposed.

## Target Users And ICP

Primary ICP for the MVP:

- People in a foreign country who need quick practical phrases.
- Users who need confidence in markets, pharmacies, transport, auto service, public services, or similar scenarios.
- Users who benefit from phonetic guidance and simple UI more than from complex chat interaction.

Secondary users:

- Travelers preparing for short trips.
- Immigrants or temporary residents building practical language confidence.
- Caregivers or family members helping someone communicate.
- Language learners who want situation-based practice.

AI must check that new product work serves at least one ICP segment unless the user explicitly asks for exploratory work.

## Personas

Use personas to evaluate trade-offs.

Persona: First-week resident

- Goal: Solve everyday tasks quickly without embarrassment.
- Pain: Does not know which phrases are socially appropriate.
- Constraint: Often uses the app on a phone in a stressful environment.
- Product implication: Fast search, large readable text, simple actions, offline-friendly data.

Persona: Traveler in a hurry

- Goal: Ask for help, directions, products, prices, and services.
- Pain: Time pressure and unreliable connectivity.
- Constraint: Needs immediate phrase access, not a long conversation flow.
- Product implication: Categories, favorites, speech playback, phrase packs.

Persona: Language learner

- Goal: Practice common phrases and pronunciation.
- Pain: Needs repetition and phonetic hints.
- Constraint: May use desktop and mobile.
- Product implication: Repeat actions, pronunciation support, scenario grouping.

Use `templates/persona.md` for new personas.

## Business Goals

Until the business model is explicitly defined, evaluate work against these goals:

- Activation: users can find a useful phrase quickly on first visit.
- Retention: users return because packs cover real situations.
- Time-to-value: a user reaches a useful phrase with minimal steps.
- Trust: phrase content feels accurate, safe, and appropriate.
- Reach: the app works on mobile and can support more packs/languages.
- Maintainability: content and UI can evolve without rewriting the product.

Potential future business metrics:

- Conversion to paid packs or premium features.
- Number of active phrase packs used per user.
- Repeat usage by scenario.
- Cost per active user for AI-assisted features.

## North Star Metric

Default North Star Metric:

- Successful phrase use per active user.

Until instrumentation exists, approximate it with:

- Search to phrase-card interaction.
- Copy action.
- Speech action.
- Pack selection followed by phrase interaction.

AI must not invent analytics implementation. If a metric is needed but not instrumented, propose instrumentation as a
separate product/engineering task.

## Product Strategy

MVP strategy:

- Keep the product simple and practical.
- Prioritize core phrase discovery and phrase usefulness.
- Prefer static curated content over complex AI generation until quality gates exist.
- Make the app reliable on mobile.
- Avoid features that add friction before the core workflow is validated.

Beta strategy:

- Add structured feedback loops.
- Improve content coverage and quality.
- Add analytics for activation and retention.
- Introduce test automation for critical flows.
- Consider offline behavior and mobile polish.

Production strategy:

- Harden monitoring, release practices, and security.
- Add clear ownership for content, platform, and product decisions.
- Introduce scalable content governance.
- Add AI features only with evals, safety checks, fallback, and human review where needed.

Scale strategy:

- Manage multiple language packs, markets, and user segments.
- Establish data-driven prioritization.
- Standardize architecture, testing, observability, and incident management.

## Roadmap Model

Roadmap stages:

MVP:

- Phrase browser, pack selection, search, phonetic hint, copy, speech, responsive UI.

Beta:

- Favorites or recently used phrases.
- More phrase packs and content validation.
- Basic analytics.
- Manual QA regression baseline.
- Test runner and critical automated tests.

Production:

- Release checklist and deployment discipline.
- Monitoring and error tracking.
- Offline/PWA hardening if required.
- Accessibility pass.
- Security and privacy baseline.

Scale:

- Content management workflow.
- Personalization.
- AI-assisted phrase suggestions or RAG over curated content, only with AI SDLC gates.
- Multi-platform support.

Use `templates/roadmap.md` for roadmap updates.

## Prioritization Framework

Default scoring model:

| Factor        | Score | Meaning                                                     |
| ------------- | ----- | ----------------------------------------------------------- |
| User value    | 1-5   | How strongly it improves the user outcome.                  |
| Strategic fit | 1-5   | How well it supports MVP, beta, production, or scale goals. |
| Confidence    | 1-5   | How much evidence supports the work.                        |
| Reach         | 1-5   | How many target users or flows it affects.                  |
| Effort        | 1-5   | How expensive it is, where 5 is high effort.                |
| Risk          | 1-5   | Product, security, operational, or technical risk.          |

Suggested formula:

```text
priority = (user value + strategic fit + confidence + reach) - effort - risk
```

Tie-breakers:

- Prefer learning over polish during MVP.
- Prefer reliability over novelty for production.
- Prefer maintainability when the same pattern will be reused.
- Prefer human approval when a business trade-off is ambiguous.

Use `templates/prioritization-score.md`.

## Product Gate Questions

Before implementation, AI Product Owner asks:

- Who benefits from this work?
- Which current product stage does it serve?
- What user behavior or business metric should improve?
- What is the smallest useful version?
- What is out of scope?
- What would make this task not worth doing now?
- Does this require human product approval?

## Product Artifacts

Required for new features:

- Feature brief.
- User story.
- Acceptance criteria.
- Prioritization score for significant roadmap items.
- Risk and approval note for sensitive flows.

Required for roadmap or strategy changes:

- Product vision update.
- Roadmap update.
- Decision log or ADR when technical direction changes.

## Human Approval Triggers

Human product approval is required for:

- Product strategy changes.
- Pricing or monetization decisions.
- New user segments that change the product direction.
- Legal, medical, financial, or safety-sensitive content.
- Launching AI-generated phrase content to users.
- Production release of business-critical workflows.
