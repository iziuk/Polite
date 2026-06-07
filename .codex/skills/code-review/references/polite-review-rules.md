# Polite Review Rules

Use this checklist for Polite PRs and local diffs. Flag only issues you are confident are real.

## Architecture And Ownership

- Respect FSD layers in `apps/web/src` and `apps/mobile/src`: `app` can import lower layers, `widgets` can import `features`, `entities`, `shared`, `features` can import `entities` and `shared`, `entities` can import `shared`, and `shared` imports only `shared`.
- Cross-slice imports within the same FSD layer are forbidden. Move shared code down to `shared` or `packages/shared`.
- Cross-layer imports must use public APIs and configured aliases. Do not deep-import another slice internals.
- `packages/shared/src` owns cross-platform pure helpers, domain models, DTOs, validation rules, and future API contracts.
- App-local `apps/*/src/shared` code owns platform-specific UI, routing, i18n wiring, browser/native facades, and framework adapters.

## TypeScript And Imports

- No `any`, unsafe member access, floating promises, unused variables, shadowing, forward references, or non-transpilable files.
- Keep callback parameters descriptive; avoid vague one-letter names in maps, filters, event handlers, and render callbacks.
- Keep imports ordered by project convention: types, external packages, Node built-ins, aliases, parent, sibling, index.
- Do not include file extensions except image assets.
- Preserve strict TypeScript, isolated modules, and public barrel boundaries.

## React, UI, And Localization

- Reusable React components should be const arrow components checked with `satisfies React.FC`; Next.js special route files may use their framework conventions.
- Do not add inline nested components that remount on render.
- User-facing copy must live in web or mobile `src/shared/core/i18n/translations/*.json` and be rendered through the local translation API.
- Phrase pack/domain content remains in `packages/data`, not UI translation files.
- The current UI stack uses Tailwind/native primitives and shared UI wrappers where present; do not introduce stale MUI/react-i18next patterns.

## JavaScript Patterns

- Use `===` and `!==`, `const` where possible, template literals, object shorthand, and braces for multiline control flow.
- Do not use `eval`, `new Function`, literal throws, sequential `await` loops, mutable exports, or committed `console.log`.
- Mock data must be centralized in `MOCK_` constants with a ticketed TODO when it stands in for future API/store data.
- Refactors must preserve behavior unless the PR explicitly states and tests a behavior change.

## QA, CI/CD, And Release

- Root verification baseline is `corepack yarn install --immutable`, `yarn lint`, `yarn typecheck`, `yarn test:coverage`, `yarn build`, and `yarn format:check`.
- Web E2E uses Playwright. Native E2E uses Maestro/EAS when simulator, emulator, or hosted credentials are available.
- CI/CD changes must protect secrets, avoid committing `.vercel` or environment values, and document deploy/rollback impact.
- Vercel preview deploys come from `release/a.b.c.d`; production deploys come from `main`.
- Release automation uses `version.json` only and release branches must match `release/a.b.c.d`.
- New architecture, CI/CD, release, security, or production process decisions must be reflected in ADRs and project-map updates.

## Security And Privacy

- Do not commit secrets, tokens, `.env` values, Vercel project metadata, or production credentials.
- Review new dependencies for purpose, maintenance, license, and security risk.
- Auth, authorization, sensitive data, payments, production deploys, and high-risk changes require human approval under `.ai/ai-sdlc`.
- AI review is manual/free in this project. Do not add API-backed AI review jobs unless billing, secrets, evals, and security approval are explicitly provided.
