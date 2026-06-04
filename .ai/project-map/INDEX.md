# Polite Project Map

Last verified: 2026-06-04

## Stack

- Monorepo with npm workspaces and Turbo.
- Web app: Next.js 15, React 19, TypeScript strict mode, Tailwind CSS.
- Shared packages: phrase data JSON under `packages/data`, platform helpers and domain types under `packages/shared`.

## Architecture Snapshot

```text
polite/
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

| Area                      | Key files                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| Web route and metadata    | `apps/web/src/app/page.tsx`, `apps/web/src/app/layout.tsx`                                       |
| Phrase browser workflow   | `apps/web/src/widgets/phrase-browser/ui/phrase-browser.tsx`                                      |
| Phrase card actions       | `apps/web/src/widgets/phrase-browser/ui/phrase-card.tsx`                                         |
| Phrase toolbar and search | `apps/web/src/widgets/phrase-browser/ui/phrase-toolbar.tsx`                                      |
| Phrase entity public API  | `apps/web/src/entities/phrase/index.ts`, `apps/web/src/entities/phrase/model/phrase-packs.ts`    |
| UI copy                   | `apps/web/src/shared/core/i18n/translations/en.json`                                             |
| Shared UI primitives      | `apps/web/src/shared/ui/button/button.tsx`, `apps/web/src/shared/ui/text-input/text-input.tsx`   |
| Browser helpers           | `packages/shared/src/lib/clipboard.ts`, `packages/shared/src/lib/speech.ts`                      |
| Web config                | `apps/web/next.config.mjs`, `apps/web/tsconfig.json`, `apps/web/eslint.config.mjs`, `turbo.json` |

## Main Flows

1. `/` renders `PhraseBrowser` from `@widgets/phrase-browser`.
2. `PhraseBrowser` reads static packs from `@entities/phrase`, owns local selected-pack, query, and large-text state.
3. Filtering is local and memoized from the active pack and query.
4. `PhraseCard` invokes `speak` and `copyText` through `@shared/lib/browser`.
5. UI copy comes from `@shared/core/i18n`; phrase pack content remains backend/content data in `packages/data`.

## Known Decisions

- Static phrase packs remain the MVP data source.
- The web app is organized by FSD layers under `apps/web/src`.
- Reusable browser helpers and phrase interfaces stay in `packages/shared/src` and are exposed through public barrels.
- Shared UI primitives wrap native elements and Tailwind classes, matching the current project stack.
