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

## AI Fullstack Team Completeness

Polite verifies managed fullstack team completeness through `.ai/ai-sdlc/completeness-audit.md`. A team is considered
complete only when every important lifecycle responsibility has an owner, input, output, quality gate, and evidence. The
current verdict is a substantially complete operational baseline with no obvious ownerless lifecycle responsibility.

## ADR Operating Policy And Decision Records

Architecture decisions are governed by `.ai/ai-sdlc/adr.md` and stored in `.ai/ai-sdlc/adr/`. Accepted ADRs are the
authoritative decision memory for architecture, platform, AI, security, production, and governance choices; the project
map summarizes only navigation-relevant decisions.

## RAG-Ready Project Knowledge Strategy

Polite uses `.ai/ai-sdlc/rag-strategy.md` as the policy for AI context retrieval, source priority, stale-context handling,
citations, indexing, prompt-injection controls, and retrieval evaluation.

## Local Project Knowledge Retrieval

Polite now has local automated project-knowledge retrieval under `.ai/tools/project-knowledge` and
`.ai/project-knowledge`. It builds a gitignored JSON index from allowlisted sources, uses local TF-IDF/cosine ranking,
and exposes `npm run knowledge:index`, `npm run knowledge:search`, and `npm run knowledge:evaluate`. External embedding
providers, vector databases, product RAG, and LLM-generated answers are still not implemented and require a new ADR,
security/privacy review, evals, rollback path, and human approval when high-risk sources or user-facing output are
involved.

## Polite Branch Prefix

Project work branches should use the `polite/` prefix by default, for example `polite/ai-sdlc-fullstack-team`. Git
worktrees should not be created unless the user explicitly asks for a worktree.

## Commit Message Drafting Skill

Commit messages should always be drafted through the global `draft-commit-message` skill. The workflow must inspect git
state, classify in-scope and out-of-scope changes, and produce a Conventional Commit message that follows project rules.

## Post-Task Push Policy

After a completed and verified task, agents should commit and push finished changes without waiting for an extra user
instruction. If readiness, scope, verification, safety, approval, or repository state is uncertain, agents must not push
silently and must ask the user before pushing.
