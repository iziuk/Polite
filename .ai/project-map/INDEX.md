# Polite Project Map

Last verified: 2026-06-08

## Stack

- Monorepo with Yarn 4 workspaces, `nodeLinker: node-modules`, and Turbo.
- Toolchain baseline: Node.js 22.22.1+, Yarn 4.12.0+, Turbo 2, ESLint 9.39+, Prettier 3, TypeScript 6.
- JS/TS quality gates use a strict root `eslint.config.mjs`, root Prettier config, and explicit web/mobile/shared
  typecheck scripts.
- Unit/component tests use Vitest for web/shared and Jest with `jest-expo` for Expo/RN, both with 100% covered-source
  thresholds.
- E2E uses Playwright for the web app and Maestro/EAS Workflows for native iOS/Android mobile journeys.
- CI/CD uses GitHub Actions for root verification plus Vercel CLI deploys from `release/a.b.c.d` preview branches and
  `main` production.
- Web app: Next.js 16, React 19, TypeScript strict mode, Tailwind CSS 4, next-intl.
- Mobile app: Expo SDK 56, React 19, React Native 0.85, TypeScript strict mode.
- Shared packages: phrase data JSON under `packages/data`, platform helpers and domain types under `packages/shared`.

## Architecture Snapshot

```text
polite/
├── AGENTS.md             # Project agent instructions and required workflows
├── .ai/
│   ├── ai-sdlc/          # Managed AI fullstack team operating model
│   └── project-map/      # Incremental codebase map
├── apps/web/
│   ├── src/app/             # Next.js app route, layout, metadata, global CSS
│   ├── src/widgets/         # Composed page-level UI
│   ├── src/entities/        # Domain public APIs for phrase packs/types
│   └── src/shared/          # i18n, browser helpers, shared UI primitives
├── apps/mobile/
│   ├── index.ts             # Expo root registration
│   └── src/
│       ├── app/             # RN app root
│       ├── widgets/         # Composed phrase browser UI
│       ├── entities/        # Domain public APIs for phrase packs/types
│       └── shared/          # i18n, native helpers, RN UI primitives
├── packages/data/           # Static phrase pack JSON files
└── packages/shared/src/     # Cross-platform helpers and domain types
```

The active web and mobile apps use FSD-style aliases from their app-level TypeScript/Babel config. App entry points
import through slice/segment public APIs.

## Where To Look First

| Area                       | Key files                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Web route and metadata     | `apps/web/src/app/page.tsx`, `apps/web/src/app/layout.tsx`                                                                                  |
| Mobile app root            | `apps/mobile/index.ts`, `apps/mobile/src/app/app.tsx`                                                                                       |
| Phrase browser workflow    | `apps/web/src/widgets/phrase-browser/ui/phrase-browser.tsx`                                                                                 |
| Mobile phrase workflow     | `apps/mobile/src/widgets/phrase-browser/ui/phrase-browser.tsx`                                                                              |
| Phrase card actions        | `apps/web/src/widgets/phrase-browser/ui/phrase-card.tsx`                                                                                    |
| Mobile phrase card actions | `apps/mobile/src/widgets/phrase-browser/ui/phrase-card.tsx`                                                                                 |
| Phrase toolbar and search  | `apps/web/src/widgets/phrase-browser/ui/phrase-toolbar.tsx`                                                                                 |
| Mobile toolbar and search  | `apps/mobile/src/widgets/phrase-browser/ui/phrase-toolbar.tsx`                                                                              |
| Phrase entity public API   | `apps/web/src/entities/phrase/index.ts`, `apps/web/src/entities/phrase/model/phrase-packs.ts`                                               |
| Mobile phrase entity API   | `apps/mobile/src/entities/phrase/index.ts`, `apps/mobile/src/entities/phrase/model/phrase-packs.ts`                                         |
| UI localization            | `apps/web/src/shared/core/i18n/request.ts`, `apps/web/src/shared/core/i18n/translation-map.ts`                                              |
| UI copy                    | `apps/web/src/shared/core/i18n/translations/en.json`, `apps/web/src/shared/core/i18n/translations/uk.json`                                  |
| Mobile UI localization     | `apps/mobile/src/shared/core/i18n/i18n-provider.tsx`, `apps/mobile/src/shared/core/i18n/translation-map.ts`                                 |
| Mobile UI copy             | `apps/mobile/src/shared/core/i18n/translations/en.json`, `apps/mobile/src/shared/core/i18n/translations/uk.json`                            |
| Shared UI primitives       | `apps/web/src/shared/ui/button/button.tsx`, `apps/web/src/shared/ui/select/select.tsx`, `apps/web/src/shared/ui/text-input/text-input.tsx`  |
| Mobile UI primitives       | `apps/mobile/src/shared/ui/button/button.tsx`, `apps/mobile/src/shared/ui/text-input/text-input.tsx`                                        |
| Shared helpers             | `packages/shared/src/lib/filter-phrases.ts`, `packages/shared/src/lib/clipboard.ts`, `packages/shared/src/lib/speech.ts`                    |
| Mobile native helpers      | `apps/mobile/src/shared/lib/native/actions.ts`                                                                                              |
| Tooling config             | `.yarnrc.yml`, `yarn.lock`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.mjs`, `package.json`, `turbo.json`                   |
| Web config                 | `apps/web/next.config.mjs`, `apps/web/tsconfig.json`, `apps/web/package.json`, `tests/e2e/web/phrase-browser.spec.ts`                       |
| Mobile config              | `apps/mobile/app.json`, `apps/mobile/babel.config.js`, `apps/mobile/metro.config.js`, `apps/mobile/jest.config.js`, `apps/mobile/eas.json`  |
| AI SDLC operating model    | `.ai/ai-sdlc/README.md`, `.ai/ai-sdlc/coverage-matrix.md`, `.ai/ai-sdlc/workflow.md`                                                        |
| AI team completeness       | `.ai/ai-sdlc/completeness-audit.md`, `.ai/ai-sdlc/templates/team-completeness-audit.md`                                                     |
| Product, BA, architecture  | `.ai/ai-sdlc/product-business.md`, `.ai/ai-sdlc/business-analysis.md`, `.ai/ai-sdlc/architecture.md`                                        |
| Engineering and governance | `.ai/ai-sdlc/engineering.md`, `.ai/ai-sdlc/ai-development-policy.md`, `.ai/ai-sdlc/governance.md`                                           |
| Architecture decisions     | `.ai/ai-sdlc/adr.md`, `.ai/ai-sdlc/adr/README.md`, `.ai/ai-sdlc/adr/`                                                                       |
| RAG / project knowledge    | `.ai/ai-sdlc/rag-strategy.md`, `.ai/project-knowledge/README.md`, `.ai/tools/project-knowledge/`                                            |
| RAG feature and evals      | `.ai/ai-sdlc/ai-features/local-project-knowledge-retrieval.md`, `.ai/ai-sdlc/evaluations/`                                                  |
| AI team roles and QA       | `.ai/ai-sdlc/roles.md`, `.ai/ai-sdlc/responsibility-matrix.md`, `.ai/ai-sdlc/quality-gates.md`, `.ai/ai-sdlc/qa-manual.md`                  |
| Pull request lifecycle     | `.ai/ai-sdlc/templates/pr-checklist.md`, `.ai/ai-sdlc/completeness-audit.md`                                                                |
| Release and risk           | `.ai/ai-sdlc/qa-automation.md`, `.ai/ai-sdlc/automation-test-plan-yarn4-coverage-e2e.md`, `.ai/ai-sdlc/devops-release.md`                   |
| CI/CD and release tooling  | `.github/workflows/ci.yml`, `.github/workflows/vercel-preview.yml`, `.github/workflows/vercel-production.yml`, `scripts/create-release.mjs` |
| Git hooks and review skill | `.husky/pre-commit`, `.husky/pre-push`, `.codex/skills/code-review/SKILL.md`, `.github/pull_request_template.md`                            |

## Main Flows

1. `/` renders `PhraseBrowser` from `@widgets/phrase-browser`.
2. `PhraseBrowser` reads static packs from `@entities/phrase`, owns local selected-pack, query, and large-text state.
3. Filtering uses `filterPhrases` from `packages/shared/src/lib` and is memoized from the active pack and query.
4. `PhraseCard` invokes `speak` and `copyText` through `@shared/lib/browser`.
5. `next-intl` reads the locale from the `locale` cookie through `@shared/core/i18n/request`, then provides messages to
   the app layout.
6. `PhraseToolbar` switches interface locale by updating the locale cookie and reloading the current route; routes stay
   prefix-free.
7. UI copy comes from `@shared/core/i18n`; phrase pack content remains backend/content data in `packages/data`.
8. `apps/mobile` registers an Expo root component, provides client-local `uk`/`en` interface localization, renders the RN
   `PhraseBrowser`, reads the same static packs, and uses Expo Clipboard/Speech modules for copy and TTS parity with the
   web app.
9. Non-trivial AI-assisted work follows `AGENTS.md` into `.ai/ai-sdlc`, checks `coverage-matrix.md`, retrieves context
   through the RAG/source-priority policy, checks accepted ADRs, applies the relevant product, BA, architecture,
   engineering, PR lifecycle, QA, DevOps, security, governance, and template artifacts, then passes quality gates and
   human approval gates before implementation, pull request merge, or release.
10. GitHub Actions runs root verification on PRs and pushes, deploys Vercel preview from `release/a.b.c.d`, deploys
    Vercel production from `main`, and keeps AI code review as a manual `.codex/skills/code-review` PR step.

## Known Decisions

- Static phrase packs remain the MVP data source.
- The web app is organized by FSD layers under `apps/web/src`.
- The mobile app mirrors the web phrase browser under `apps/mobile/src` with FSD-style app/widgets/entities/shared
  layers.
- Reusable browser helpers and phrase interfaces stay in `packages/shared/src` and are exposed through public barrels.
- Future endpoint contracts, request/response DTOs, API types, domain models, field validations, and pure utilities
  shared by web and mobile belong in `packages/shared/src`; app-local `src/shared` folders only adapt platform-specific
  UI, framework, browser, or native behavior.
- Shared UI primitives wrap native elements and Tailwind classes, matching the current project stack.
- Interface localization uses `next-intl` with local `uk` and `en` message files and a cookie-based locale preference.
- Mobile interface localization uses a client-local provider and translation map under
  `apps/mobile/src/shared/core/i18n` with local `uk` and `en` message files.
- Yarn 4 with `nodeLinker: node-modules` is the package-manager baseline; ADR-009 supersedes ADR-001 for the previous
  npm workspace tooling decision.
- Dependency freshness tracks latest stable direct dependencies where the ecosystem supports them; the current baseline
  requires Node.js 22.22.1+ and Yarn 4.12.0+.
- JS/TS linting is enforced from the repo root with strict FSD boundaries, import ordering, naming, promise-safety,
  filename, unused-import, and TypeScript-safety rules across web, mobile, and shared package code.
- Vitest and Jest enforce 100% covered-source thresholds; Playwright covers the web journey, and Maestro covers native
  mobile journeys where simulator/emulator or EAS infrastructure is available.
- GitHub Actions is the CI/CD orchestrator: CI verifies root Yarn checks, Vercel preview deploys from `release/a.b.c.d`,
  Vercel production deploys from `main`, and Vercel Git auto-deploys are disabled for the web project.
- Release automation uses `version.json` as the only release version source and creates `release/a.b.c.d` branches.
- Manual AI code review uses the repo-tracked `.codex/skills/code-review` skill and PR checklist; CI intentionally does
  not call an AI API.
- Future backend work should keep the monorepo shape and is currently expected to add a Python FastAPI app under
  `apps/api`; OpenAPI should be the contract boundary between that backend and the TypeScript clients.
- AI-assisted delivery uses `.ai/ai-sdlc` as a comprehensive managed fullstack team operating model with coverage matrix,
  role playbooks, lifecycle gates, QA strategy, DevOps/release practice, security/risk review, governance, and templates.
- AI fullstack team completeness is audited by checking every lifecycle stage for owner, input, output, quality gate, and
  evidence; current verdict is a substantially complete operational baseline.
- Completed pushed work requires an explicit pull request lifecycle: create or update PR, run AI PR Reviewer review, and
  merge when gates pass or document the merge blocker.
- Accepted ADRs in `.ai/ai-sdlc/adr/` are the authoritative architecture decision log; `.ai/project-map/decisions.md`
  summarizes project-map relevant decisions.
- Current RAG posture includes local project-knowledge retrieval through `.ai/tools/project-knowledge`; external
  provider/vector database/product RAG is not implemented and requires ADR, evals, security/privacy review, and approval
  before adoption.
- Local retrieval is governed by ADR-008, exposed through Yarn knowledge scripts, and verified with
  `.ai/project-knowledge/eval-cases.json`.
- Every new task starts on a new dedicated `polite/` branch; reuse an existing branch only for clear continuations of
  the same task or PR, and ask when task boundaries are unclear.
- Completed and verified tasks should be committed and pushed automatically; if readiness or safety is uncertain, ask
  before pushing.
