# Architectural Decisions

Last verified: 2026-06-08

## Static Phrase Packs For MVP

Phrase packs live in `packages/data/*.json` and are imported at build time through the phrase entity. This keeps the first version offline-friendly and simple.

## FSD In The Web App

The web app now uses FSD layers under `apps/web/src`. Route files stay in `src/app`, composed UI lives in `src/widgets`, phrase domain access lives in `src/entities`, and reusable app utilities live in `src/shared`.

## FSD-Style Mobile App

The Expo mobile app mirrors the web phrase browser under `apps/mobile/src` with app, widgets, entities, and shared
layers. Mobile imports use the same FSD-style aliases through TypeScript and Babel config, while Metro watches
`packages/` for shared data and types.

## Public APIs And Aliases

Cross-layer imports use `@widgets`, `@entities`, and `@shared` aliases. Shared package internals are exposed through barrels in `packages/shared/src`.

## Root Shared Ownership

Reusable endpoint contracts, operation names, endpoint paths, request/response DTOs, API error shapes, generated or
handwritten API types, domain models, field validation rules, and pure utilities shared by web and mobile belong in
`packages/shared/src` and are exposed through public barrels. App-local `apps/web/src/shared` and
`apps/mobile/src/shared` code may adapt these exports for browser, React, Next.js, Expo, or native behavior, but should
not duplicate cross-platform contracts or helpers.

## UI Copy Ownership

User-facing UI copy is centralized in `apps/web/src/shared/core/i18n/translations/*.json` and accessed through the
`@shared/core/i18n` public API. Mobile UI copy is centralized under
`apps/mobile/src/shared/core/i18n/translations/*.json` and accessed through the mobile `@shared/core/i18n` public API.
Phrase pack domain content remains in `packages/data` rather than UI localization files.

## next-intl For Interface Localization

The web app uses `next-intl` for request-scoped interface localization. `apps/web/next.config.mjs` wires the plugin to
`apps/web/src/shared/core/i18n/request.ts`, which reads a `locale` cookie and loads local `uk` or `en` messages. Routes
remain prefix-free for the MVP; the toolbar updates the cookie and reloads the current route.

## Platform Actions

The web app uses guarded browser helper facades for Web Speech and Clipboard APIs. The mobile app uses Expo-native
`expo-speech` and `expo-clipboard` wrappers in `apps/mobile/src/shared/lib/native` for the same phrase card actions.

## Yarn 4 Tooling And Test Automation

Polite uses Yarn 4 with `nodeLinker: node-modules` as the package-manager baseline. ADR-009 supersedes ADR-001 for the
previous npm workspace tooling direction while preserving the monorepo shape. Web/shared tests use Vitest, Expo/RN tests
use Jest with `jest-expo`, web E2E uses Playwright, and native mobile E2E uses Maestro with EAS Workflow definitions.
Vitest and Jest enforce 100% covered-source thresholds; E2E remains pass/fail journey coverage.

## GitHub Actions, Vercel, And Release Branches

Polite uses GitHub Actions as the CI/CD orchestrator. Root CI runs Yarn install, lint, typecheck, coverage, build, format
check, and web E2E. Vercel preview deploys run for same-repository PRs targeting `main`, post the preview URL in a PR
comment, and the web Vercel project disables automatic Git deploys so Actions owns preview deployment. Merging to `main`
does not automatically deploy production. Release automation stores the release version only in `version.json` and
creates `release/a.b.c.d` branches.

## Manual AI Code Review

AI code review is a manual PR gate using the repo-tracked `.codex/skills/code-review` skill and PR checklist. CI does
not call an AI API; adding automated AI review requires new billing, secrets, security/privacy, and approval review.

## Fresh Dependency Baseline

Direct dependencies track latest stable releases where the surrounding ecosystem supports them. The current baseline is
Node.js 22.22.1+ and Yarn 4.12.0+ so Next.js 16, Expo SDK 56, React Native 0.85, the latest ESLint 9 compatible line,
Tailwind CSS 4, and TypeScript 6 can be used without downgrading to older toolchains. ESLint 10 is held
until the Next.js React lint plugin stack supports its rule context API. Transitive audit fixes must not force major
downgrades of Next.js or Expo.

## Strict Monorepo JS/TS Tooling

JS/TS linting is enforced from the repo root with `eslint.config.mjs` rather than app-local lint commands. The strict
baseline covers FSD layer boundaries, public API import depth, import ordering, kebab-case filenames, unused imports,
promise safety, TypeScript safety, and naming rules across `apps/web`, `apps/mobile`, and `packages/shared`. Prettier
stays separate from ESLint and is checked with `yarn format:check`.

## Future Python API Backend

Polite stays a mixed-language monorepo. Future backend work is expected to add `apps/api` as a Python FastAPI/Pydantic
service, with OpenAPI as the contract boundary for web and mobile clients. The current JS/TS tooling must not assume a
Node.js backend app.

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

## AI Pull Request Lifecycle

Pull request lifecycle is an explicit AI SDLC responsibility owned by the AI PR Owner and AI PR Reviewer. Completed
pushed work must create or update a PR, pass PR review with severity-ranked findings resolved, approved, or documented
as residual risk, and merge the PR when gates pass. If merge is blocked, the blocker and next action must be recorded.

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
and exposes `yarn knowledge:index`, `yarn knowledge:search`, and `yarn knowledge:evaluate`. External embedding
providers, vector databases, product RAG, and LLM-generated answers are still not implemented and require a new ADR,
security/privacy review, evals, rollback path, and human approval when high-risk sources or user-facing output are
involved.

## Branch-Per-Task Workflow

Every new task starts on a new dedicated branch. Project work branches should use the `polite/` prefix by default, for
example `polite/ai-sdlc-fullstack-team`, and start from `main` unless the user requests another base or the task depends
on unmerged current branch context. Existing branches are reused only for clear continuations, fixes, or follow-ups for
the same task or PR. If the task boundary is unclear, ask before branching, committing, or pushing. Git worktrees should
not be created unless the user explicitly asks for a worktree.

## Commit Message Drafting Skill

Commit messages should always be drafted through the global `draft-commit-message` skill. The workflow must inspect git
state, classify in-scope and out-of-scope changes, and produce a Conventional Commit message that follows project rules.

## Post-Task Push Policy

After a completed and verified task, agents should commit and push finished changes without waiting for an extra user
instruction. If readiness, scope, verification, safety, approval, or repository state is uncertain, agents must not push
silently and must ask the user before pushing.
