# ADR-010: Use GitHub Actions For Vercel Deploys And Manual AI Code Review

Status: Superseded by ADR-011

Date: 2026-06-08

Owner: AI Architect / AI DevOps / AI PR Reviewer

Related work: `.github/workflows/`, `apps/web/vercel.json`, `.codex/skills/code-review`, `scripts/create-release.mjs`, `.husky/`

## Context

Polite has a connected Vercel project for the Next.js web app and needs repeatable CI/CD, release branch handling,
pre-commit/pre-push guardrails, and a code-review process. The repository already uses Yarn 4, Turbo, Playwright,
Vitest, Jest, Maestro, and the AI SDLC process. Automated AI review in CI would require separate API billing and secrets;
the project prefers a free manual review skill for now.

## Decision Drivers

- Keep root verification consistent with ADR-009.
- Make preview and production deploy sources explicit.
- Avoid duplicate Vercel Git auto-deploys when GitHub Actions owns deployment.
- Keep release versions independent from workspace package versions.
- Keep code review usable without OpenAI API billing or AI provider secrets.
- Preserve human approval expectations for production deploys and future paid AI automation.

## Decision

Polite uses GitHub Actions as the CI/CD orchestrator.

- CI runs root Yarn verification on PRs and pushes.
- Vercel preview deploys run from `release/a.b.c.d` branches.
- Vercel production deploys run from `main`.
- Vercel Git auto-deploys are disabled by tracked web app configuration.
- Release automation creates `release/a.b.c.d` branches and updates only `version.json`.
- Code review uses the repo-tracked `.codex/skills/code-review` skill manually; no CI job calls an AI API.

## Alternatives Considered

### Vercel Git Integration Owns Deploys

Pros:

- Fewer GitHub Actions steps.
- No Vercel CLI setup in CI.

Cons:

- Less explicit release branch control.
- Harder to align deploys with AI SDLC release gates.
- Can duplicate deployment behavior when Actions is also configured.

### GitHub Actions With Automated OpenAI Review

Pros:

- Fully automated review signal.
- Review could run on every PR.

Cons:

- Requires `OPENAI_API_KEY`, separate API billing, usage budgets, model selection, and security approval.
- ChatGPT Pro does not cover API usage.
- Adds provider dependence before the project needs it.

### Manual Vercel Deploy Only

Pros:

- Lowest CI complexity.
- No deployment secrets needed in GitHub.

Cons:

- Release behavior is less repeatable.
- Production and preview evidence is harder to audit.

## Consequences

Positive:

- CI/CD has clear triggers and owners.
- Release branches map directly to preview deploys.
- Production deploys happen only from `main`.
- Manual AI review remains free and repo-documented.
- Release versioning does not churn workspace package versions.

Negative or trade-offs:

- GitHub Actions requires Vercel secrets.
- Hosted mobile E2E still depends on separate Maestro/EAS capabilities.
- Manual code review relies on a human or agent to invoke the skill.

## Security And Privacy Impact

Vercel secrets must be stored in GitHub Secrets as `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`; no secret
values or `.vercel` local metadata are committed. Manual AI review avoids sending diffs to an API from CI. Future
automated AI review requires a new security/privacy and billing approval.

## Operational Impact

Root CI runs:

```bash
corepack yarn install --immutable
yarn lint
yarn typecheck
yarn test:coverage
yarn build
yarn format:check
yarn test:e2e:web
```

Preview deploys use Vercel CLI from `release/a.b.c.d`. Production deploys use Vercel CLI from `main`. Vercel production
environments should require human approval in GitHub environment settings.

## Rollback Or Reversal

Rollback can disable or remove the Vercel GitHub Actions workflows, re-enable Vercel Git auto-deploys, and remove the
release script/hook changes. Replacing manual AI review with automated AI review requires a new approved decision.

## Follow-Ups

- Configure GitHub Secrets for Vercel.
- Configure GitHub environment protection for production.
- Add hosted native E2E only after EAS credentials and approval are available.
