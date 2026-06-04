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

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/\*\*
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> AI SDLC operating model lookup and main-flow note
- modules.yaml -> new ai-sdlc-operating-model entry
- data-flow.md -> AI SDLC delivery flow
- decisions.md -> managed AI fullstack team operating decision

Notes:

- Added project-level AI SDLC process, role playbooks, QA strategy, release guidance, security/risk guidance, and reusable templates.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- decisions.md -> Polite branch prefix and no-worktree convention

Notes:

- Added project convention to create normal work branches from `main` with the `polite/` prefix by default.
- Confirmed git worktrees should only be created on explicit user request.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/\*\*
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> expanded AI SDLC lookup table and main-flow coverage
- modules.yaml -> expanded ai-sdlc-operating-model key files and public API
- data-flow.md -> coverage matrix and artifact flow in AI SDLC delivery
- decisions.md -> comprehensive AI SDLC artifact and template convention

Notes:

- Expanded AI SDLC from a lightweight skeleton into a comprehensive managed fullstack team operating system.
- Added coverage matrix, product/business docs, business analysis docs, architecture docs, engineering docs, AI development policy, governance, responsibility matrix, expanded QA, DevOps, security/risk playbooks, and broad artifact templates.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/governance.md
- .ai/project-map/modules.yaml
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- modules.yaml -> ai-sdlc-operating-model public API includes commit message drafting convention
- decisions.md -> commit messages use the global draft-commit-message skill

Notes:

- Added project convention to always use `draft-commit-message` before drafting commit messages or preparing commits.
- routes.md, INDEX.md, and data-flow.md checked; no updates required for this convention-only change.
