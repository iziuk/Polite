# ADR-011: Deploy Vercel Previews From Pull Requests

Status: Accepted

Date: 2026-06-08

Owner: AI Architect / AI DevOps / AI PR Reviewer

Supersedes: ADR-010 production-on-main deployment trigger

Related work: `.github/workflows/vercel-preview.yml`, `apps/web/vercel.json`, `.github/pull_request_template.md`

## Context

After enabling GitHub Actions-based Vercel deployment, the first production workflow on `main` proved too early for the
project's desired review loop. Polite needs CI to verify pull requests and CD to publish a Vercel preview URL before
merge, so reviewers can inspect the implementation in Vercel before any `main` change lands.

## Decision Drivers

- Keep pull request review centered on tested, inspectable changes.
- Avoid automatic production deployment on merge to `main`.
- Keep Vercel Git auto-deploys disabled so deployment behavior is not duplicated.
- Keep preview deploys auditable in the PR conversation.
- Preserve human approval gates for production.

## Decision

Polite deploys Vercel previews from same-repository pull requests targeting `main`.

- CI runs root Yarn verification on PRs and pushes.
- Preview CD checks out the PR head SHA, runs Vercel CLI from `apps/web`, deploys a preview, and upserts a PR comment with
  the preview URL.
- Merging to `main` does not run an automatic production deployment.
- Production deployment remains a separate human-approved release action until a future ADR defines an automated
  production path.
- Vercel Git auto-deploys stay disabled by tracked web app configuration.

## Alternatives Considered

### Deploy Production On `main`

Pros:

- Simple mental model after merge.
- Production follows the protected branch.

Cons:

- Reviewers cannot inspect the deployed result before merge.
- A bad deploy happens after the code is already on `main`.
- Requires stronger production environment gating than the project currently needs.

### Keep Release Branch Preview Deploys

Pros:

- Release branches map cleanly to versioned release candidates.
- Works well for formal release trains.

Cons:

- Too late for ordinary PR review.
- Requires an extra branch before visual/product review.

## Consequences

Positive:

- Every internal PR can show a Vercel preview URL before merge.
- Merge to `main` is no longer production-impacting by itself.
- Review evidence lives directly in the PR conversation.

Negative or trade-offs:

- Preview deploys require GitHub Vercel secrets to be available to the PR workflow.
- Forked PRs are intentionally skipped by the preview workflow to avoid exposing secrets.
- Production deployment is manual or future-defined until another ADR changes it.

## Security And Privacy Impact

The workflow only deploys previews for PRs whose head repository matches the base repository, so Vercel secrets are not
used for forked pull requests. Vercel secrets remain in GitHub Secrets as `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and
`VERCEL_PROJECT_ID`; no secret values or `.vercel` local metadata are committed.

## Operational Impact

PR preview deploys use:

```bash
vercel pull --yes --environment=preview --scope="$VERCEL_SCOPE"
vercel build --scope="$VERCEL_SCOPE"
vercel deploy --prebuilt --scope="$VERCEL_SCOPE"
```

The workflow writes or updates one PR comment marked with `<!-- polite-vercel-preview -->`.

## Rollback Or Reversal

Rollback can disable `.github/workflows/vercel-preview.yml`, re-enable Vercel Git auto-deploys, or introduce a new
approved production deployment ADR. Reintroducing automatic production deploys from `main` requires explicit human
approval.
