# Polite Project Map

Last verified: 2026-06-04

## Stack

- Monorepo with npm workspaces and Turbo.
- Web app: Next.js 15, React 19, TypeScript strict mode, Tailwind CSS.
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
├── packages/data/           # Static phrase pack JSON files
└── packages/shared/src/     # Cross-platform helpers and domain types
```

The active web app now uses FSD aliases from `apps/web/tsconfig.json`. App entry points import through slice/segment public APIs.

## Where To Look First

| Area                       | Key files                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| Web route and metadata     | `apps/web/src/app/page.tsx`, `apps/web/src/app/layout.tsx`                                           |
| Phrase browser workflow    | `apps/web/src/widgets/phrase-browser/ui/phrase-browser.tsx`                                          |
| Phrase card actions        | `apps/web/src/widgets/phrase-browser/ui/phrase-card.tsx`                                             |
| Phrase toolbar and search  | `apps/web/src/widgets/phrase-browser/ui/phrase-toolbar.tsx`                                          |
| Phrase entity public API   | `apps/web/src/entities/phrase/index.ts`, `apps/web/src/entities/phrase/model/phrase-packs.ts`        |
| UI copy                    | `apps/web/src/shared/core/i18n/translations/en.json`                                                 |
| Shared UI primitives       | `apps/web/src/shared/ui/button/button.tsx`, `apps/web/src/shared/ui/text-input/text-input.tsx`       |
| Browser helpers            | `packages/shared/src/lib/clipboard.ts`, `packages/shared/src/lib/speech.ts`                          |
| Web config                 | `apps/web/next.config.mjs`, `apps/web/tsconfig.json`, `apps/web/eslint.config.mjs`, `turbo.json`     |
| AI SDLC operating model    | `.ai/ai-sdlc/README.md`, `.ai/ai-sdlc/coverage-matrix.md`, `.ai/ai-sdlc/workflow.md`                 |
| Product, BA, architecture  | `.ai/ai-sdlc/product-business.md`, `.ai/ai-sdlc/business-analysis.md`, `.ai/ai-sdlc/architecture.md` |
| Engineering and governance | `.ai/ai-sdlc/engineering.md`, `.ai/ai-sdlc/ai-development-policy.md`, `.ai/ai-sdlc/governance.md`    |
| AI team roles and QA       | `.ai/ai-sdlc/roles.md`, `.ai/ai-sdlc/responsibility-matrix.md`, `.ai/ai-sdlc/qa-manual.md`           |
| Release and risk           | `.ai/ai-sdlc/qa-automation.md`, `.ai/ai-sdlc/devops-release.md`, `.ai/ai-sdlc/security-risk.md`      |

## Main Flows

1. `/` renders `PhraseBrowser` from `@widgets/phrase-browser`.
2. `PhraseBrowser` reads static packs from `@entities/phrase`, owns local selected-pack, query, and large-text state.
3. Filtering is local and memoized from the active pack and query.
4. `PhraseCard` invokes `speak` and `copyText` through `@shared/lib/browser`.
5. UI copy comes from `@shared/core/i18n`; phrase pack content remains backend/content data in `packages/data`.
6. Non-trivial AI-assisted work follows `AGENTS.md` into `.ai/ai-sdlc`, checks `coverage-matrix.md`, applies the
   relevant product, BA, architecture, engineering, QA, DevOps, security, governance, and template artifacts, then passes
   quality gates and human approval gates before implementation or release.

## Known Decisions

- Static phrase packs remain the MVP data source.
- The web app is organized by FSD layers under `apps/web/src`.
- Reusable browser helpers and phrase interfaces stay in `packages/shared/src` and are exposed through public barrels.
- Shared UI primitives wrap native elements and Tailwind classes, matching the current project stack.
- AI-assisted delivery uses `.ai/ai-sdlc` as a comprehensive managed fullstack team operating model with coverage matrix,
  role playbooks, lifecycle gates, QA strategy, DevOps/release practice, security/risk review, governance, and templates.
