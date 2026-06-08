# CI/CD Pipeline: GitHub Actions And Vercel

## Pipeline

- Name: Polite CI/CD
- Owner: AI DevOps / AI PR Owner
- Provider: GitHub Actions, Vercel CLI
- Trigger: PRs to `main`, pushes to `main`, pushes to `polite/**`, pushes to `release/**`

## Stages

| Stage          | Command/action                                            | Required   | Notes                                                                |
| -------------- | --------------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| Install        | `corepack yarn install --immutable`                       | Yes        | Runs from repository root.                                           |
| Lint           | `yarn lint`                                               | Yes        | Uses root ESLint flat config.                                        |
| Typecheck      | `yarn typecheck`                                          | Yes        | Checks web, mobile, and shared package.                              |
| Test           | `yarn test:coverage`                                      | Yes        | Runs Vitest and Jest coverage.                                       |
| Build          | `yarn build`                                              | Yes        | Runs Turbo build.                                                    |
| Format         | `yarn format:check`                                       | Yes        | Prettier remains formatting source of truth.                         |
| Web E2E        | `yarn test:e2e:web`                                       | Yes for CI | Installs Playwright browsers in CI.                                  |
| Preview deploy | `vercel pull`, `vercel build`, `vercel deploy --prebuilt` | Yes on PRs | Deploys the PR head commit to Vercel preview and comments on the PR. |

## Environment Variables

- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Secrets

- `VERCEL_TOKEN`

## Artifacts

- Playwright HTML report and traces when web E2E retries fail.
- Vercel preview deployment output and the PR preview URL comment.

## Failure Handling

- CI failures block merge until investigated.
- Preview deployment failures block PR validation until investigated.
- Production deployment is intentionally not triggered by merge to `main`; production remains a separate human-approved
  release action until a future ADR defines automated production deployment.
- Automated AI review is intentionally not part of CI; use `.codex/skills/code-review` manually during PR review.
