## 2026-06-04

Changed files:

- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/routes.md
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> initial map
- modules.yaml -> initial module inventory
- routes.md -> initial route inventory
- data-flow.md -> initial phrase browser flow
- decisions.md -> initial architecture decisions

Notes:

- Full bootstrap because `.ai/project-map/INDEX.md` did not exist.

## 2026-06-04

Changed files:

- apps/web/src/app/page.tsx
- apps/web/src/app/layout.tsx
- apps/web/src/widgets/phrase-browser/\*\*
- apps/web/src/entities/phrase/\*\*
- apps/web/src/shared/\*\*
- packages/shared/src/\*\*
- apps/web/tsconfig.json
- apps/web/next.config.mjs
- apps/web/eslint.config.mjs
- apps/web/tailwind.config.js
- apps/web/postcss.config.mjs
- apps/web/package.json
- package.json
- turbo.json
- .gitignore

Updated map files:

- INDEX.md -> FSD architecture snapshot and lookup table
- modules.yaml -> new app/widget/entity/shared/config modules
- routes.md -> moved route files under `apps/web/src/app`
- data-flow.md -> phrase entity/widget/shared helper flow
- decisions.md -> FSD, public API, i18n, and React 19 typing decisions

Notes:

- Incremental update after adapting the MVP implementation toward `AGENTS.md` conventions.
- Verification passed with `npm run lint`, `npm run build`, and targeted Prettier check.
