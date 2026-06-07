# CI/CD Pipeline: GitHub Actions And Vercel

## Pipeline

- Name: Polite CI/CD
- Owner: AI DevOps / AI PR Owner
- Provider: GitHub Actions, Vercel CLI
- Trigger: PRs to `main`, pushes to `main`, pushes to `polite/**`, pushes to `release/**`, and manual deploy dispatches

## Stages

| Stage             | Command/action                                                          | Required            | Notes                                                          |
| ----------------- | ----------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------- |
| Install           | `corepack yarn install --immutable`                                     | Yes                 | Runs from repository root.                                     |
| Lint              | `yarn lint`                                                             | Yes                 | Uses root ESLint flat config.                                  |
| Typecheck         | `yarn typecheck`                                                        | Yes                 | Checks web, mobile, and shared package.                        |
| Test              | `yarn test:coverage`                                                    | Yes                 | Runs Vitest and Jest coverage.                                 |
| Build             | `yarn build`                                                            | Yes                 | Runs Turbo build.                                              |
| Format            | `yarn format:check`                                                     | Yes                 | Prettier remains formatting source of truth.                   |
| Web E2E           | `yarn test:e2e:web`                                                     | Yes for CI          | Installs Playwright browsers in CI.                            |
| Preview deploy    | `vercel pull`, `vercel build`, `vercel deploy --prebuilt`               | Yes on `release/**` | Uses Vercel preview environment.                               |
| Production deploy | `vercel pull`, `vercel build --prod`, `vercel deploy --prebuilt --prod` | Yes on `main`       | Should be protected by GitHub production environment approval. |

## Environment Variables

- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Secrets

- `VERCEL_TOKEN`

## Artifacts

- Playwright HTML report and traces when web E2E retries fail.
- Vercel deployment output from preview and production workflows.

## Failure Handling

- CI failures block merge until investigated.
- Preview deployment failures block release branch validation.
- Production deployment failures require rollback to the previous `main` commit or a forward-fix PR.
- Automated AI review is intentionally not part of CI; use `.codex/skills/code-review` manually during PR review.
