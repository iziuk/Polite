# Architectural Decisions

Last verified: 2026-06-04

## Static Phrase Packs For MVP

Phrase packs live in `packages/data/*.json` and are imported at build time through the phrase entity. This keeps the first version offline-friendly and simple.

## FSD In The Web App

The web app now uses FSD layers under `apps/web/src`. Route files stay in `src/app`, composed UI lives in `src/widgets`, phrase domain access lives in `src/entities`, and reusable app utilities live in `src/shared`.

## Public APIs And Aliases

Cross-layer imports use `@widgets`, `@entities`, and `@shared` aliases. Shared package internals are exposed through barrels in `packages/shared/src`.

## UI Copy Ownership

User-facing UI copy is centralized in `apps/web/src/shared/core/i18n/translations/en.json` and accessed through `translate` or `useTranslation`.

## React 19 Component Typing

Reusable components are const arrow functions checked with `satisfies React.FC`. Their concrete return type stays `React.ReactElement` to remain compatible with Next.js 15 generated route checks.

## AI SDLC Managed Team Operating Model

Non-trivial AI-assisted work now uses `.ai/ai-sdlc` as the project operating model. `AGENTS.md` points future agents to
check the coverage matrix, right-size the workflow, simulate the needed fullstack roles, use the required artifacts and
templates, pass relevant quality gates, and require human approval for production, sensitive data, auth, payments,
security exceptions, and major architecture decisions.

## ADR Operating Policy And Decision Records

Architecture decisions are governed by `.ai/ai-sdlc/adr.md` and stored in `.ai/ai-sdlc/adr/`. Accepted ADRs are the
authoritative decision memory for architecture, platform, AI, security, production, and governance choices; the project
map summarizes only navigation-relevant decisions.

## RAG-Ready Project Knowledge Strategy

Polite uses `.ai/ai-sdlc/rag-strategy.md` as the policy for AI context retrieval, source priority, stale-context handling,
citations, future indexing, prompt-injection controls, and retrieval evaluation. No automated vector RAG pipeline exists
yet; adding one requires a new ADR, AI feature spec, eval plan, security/privacy review, rollback path, and human
approval when high-risk sources or user-facing output are involved.

## Polite Branch Prefix

Project work branches should use the `polite/` prefix by default, for example `polite/ai-sdlc-fullstack-team`. Git
worktrees should not be created unless the user explicitly asks for a worktree.

## Commit Message Drafting Skill

Commit messages should always be drafted through the global `draft-commit-message` skill. The workflow must inspect git
state, classify in-scope and out-of-scope changes, and produce a Conventional Commit message that follows project rules.
