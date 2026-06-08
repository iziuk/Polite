# DevOps And Release Guide

This guide defines operational checks for AI-assisted delivery. It covers environments, deployment, CI/CD, secrets,
observability, incident response, rollback, and backup/recovery expectations.

## DevOps Goals

- Keep local, preview/staging, and production behavior understandable.
- Make builds repeatable.
- Make deployments reversible where possible.
- Keep secrets out of source control.
- Detect failures quickly.
- Give humans enough release evidence to approve production.

## Environment Model

Expected environment types:

- Local: developer and AI workspace.
- Preview: branch or PR deployment when available.
- Staging: production-like verification environment when available.
- Production: user-facing deployment.

Every environment should document:

- URL or access path.
- Owner.
- Deployment source.
- Required environment variables.
- Secret storage location.
- Data source.
- Monitoring.
- Known limitations.

Use `templates/environment-doc.md`.

## Local Verification

Baseline commands:

```bash
corepack yarn install --immutable
yarn lint
yarn typecheck
yarn test:coverage
yarn build
yarn format:check
```

Local app command:

```bash
yarn dev:web
```

Mobile E2E requires local Maestro plus an iOS simulator or Android emulator. EAS Workflows can run Maestro against
simulator/APK builds after the Expo/EAS project and token are configured.

Manual local checks should use `qa-manual.md`.

## CI/CD Pipeline Documentation

Document CI/CD when adding or changing:

- Build steps.
- Lint/test steps.
- Preview deployments.
- Staging deployments.
- Production deployments.
- Caching.
- Environment variables.
- Migration steps.
- Rollback steps.

Use `templates/cicd-pipeline.md`.

Current Polite CI/CD is documented in `cicd-pipeline-github-actions-vercel.md` and governed by
`adr/adr-011-pr-preview-vercel-deploys.md`.

- GitHub Actions runs root verification on PRs and pushes.
- Vercel preview deploys run for same-repository pull requests targeting `main`; the workflow comments the preview URL on
  the PR for review before merge.
- Merging to `main` does not trigger a production deployment. Production remains a separate human-approved release action
  until an ADR defines a safe automated production path.
- Vercel deployment secrets live only in GitHub Secrets.
- Manual AI code review uses `.codex/skills/code-review`; CI does not call an AI API.

## Deployment Guide

Every production-impacting deployment should define:

- What is being released.
- Source branch or commit.
- Target environment.
- Required checks.
- Required approvals.
- Deployment steps.
- Post-deploy checks.
- Rollback steps.
- Communication notes.

Use `templates/deployment-guide.md` and `templates/release-checklist.md`.

## Release Checklist

Before release:

- Confirm release scope.
- Confirm branch and commit.
- Confirm release branch format is `release/a.b.c.d` when creating a release version branch.
- Run required automated checks.
- Review the PR Vercel preview URL before merge.
- Run manual smoke checks.
- Review security/privacy impact.
- Confirm migrations and data impact.
- Confirm rollback path.
- Confirm monitoring/post-release checks.
- Get human approval for production.

## Rollback Plan

Every production-impacting change must know:

- Rollback trigger.
- Rollback owner.
- Previous version or commit.
- Config or feature flag disable path.
- Data rollback or forward-fix path.
- User communication needs.
- Post-rollback verification.

Blocking issue:

- If a high-risk change has no rollback or mitigation plan, production release needs explicit human approval.

## Feature Flags

Use feature flags when:

- A change is risky but can be isolated.
- Rollout should be gradual.
- A feature may need quick disable.
- Backend and frontend deployment timing differs.

Feature flag docs should include:

- Flag name.
- Owner.
- Default per environment.
- Removal criteria.
- Monitoring.
- Cleanup ticket.

## Infrastructure As Code

If IaC is introduced:

- Keep modules small and named consistently.
- Document state storage.
- Document plan/apply workflow.
- Review destructive changes.
- Protect production changes with approval.
- Never commit secrets.

Use `templates/infrastructure-as-code.md`.

## Secrets Management

Rules:

- Never commit secrets.
- Never paste secrets into docs or prompts.
- Use environment-specific secret storage.
- Rotate secrets after exposure.
- Document required variable names without values.
- Keep local `.env` files ignored.

Use `templates/secrets-management-policy.md`.

## Monitoring And Observability

Current MVP may rely on lightweight manual monitoring. As production matures, define:

- Availability checks.
- Client runtime errors.
- Build/deploy failures.
- Core user-flow completion.
- API latency and error rates when backend exists.
- AI cost, latency, and quality when AI features exist.
- Alert owners and severity.

Use `templates/observability-guide.md`.

## Incident Response

Incident stages:

1. Detect.
2. Triage severity.
3. Assign owner.
4. Stabilize user impact.
5. Communicate when needed.
6. Roll back or mitigate.
7. Verify recovery.
8. Write postmortem for major incidents.
9. Track follow-ups.

Use `templates/incident-runbook.md` and `templates/postmortem.md`.

## Backup And Recovery

Before adding persistent data:

- Define backup scope.
- Define retention.
- Define RPO.
- Define RTO.
- Define restore procedure.
- Test restore for production-critical data.

Use `templates/backup-recovery-plan.md`.

## DevOps Done Criteria

DevOps review is done when:

- Environment impact is known.
- CI/CD impact is known.
- Secrets are safe.
- Release and rollback are documented when applicable.
- Monitoring or post-release checks are defined.
- Human approval is captured for production.
