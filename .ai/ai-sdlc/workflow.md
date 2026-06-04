# AI SDLC Workflow

This workflow keeps AI-assisted work rational before implementation. It scales from a lightweight checklist for small
changes to a full staged process for high-risk product, engineering, QA, DevOps, security, and release work.

## Work Classification

Classify every task before implementation.

| Work type                 | Examples                                                | Default path                            |
| ------------------------- | ------------------------------------------------------- | --------------------------------------- |
| Low-risk docs or copy     | Typo, wording, local doc update                         | Lightweight                             |
| Local UI or helper change | Small component fix, pure helper refactor               | Lightweight or standard                 |
| Feature                   | New user capability or flow                             | Standard                                |
| Architecture              | New package, service, integration, API, database        | Full                                    |
| Security/privacy          | Auth, authorization, PII, secrets, logging, permissions | Full with human approval                |
| QA                        | Test strategy, regression suite, E2E plan               | Standard or full                        |
| DevOps/release            | CI/CD, deployment, rollback, monitoring                 | Full with human approval for production |
| AI feature                | Prompting, RAG, model integration, AI-generated content | Full with evals and human approval      |

## Context Retrieval Rule

Before implementation, retrieve the smallest authoritative context set that can support a correct decision.

Required baseline:

- `AGENTS.md`.
- `.ai/project-map/INDEX.md`.
- `.ai/project-map/modules.yaml`.
- Relevant `.ai/ai-sdlc` docs for the work type.
- Relevant accepted ADRs from `.ai/ai-sdlc/adr/`.
- Relevant source files, tests, config, templates, or external official docs.

Use `.ai/ai-sdlc/rag-strategy.md` for source priority, stale-context handling, conflict resolution, citation rules, and
future automated RAG requirements.

## Stage 1: Intake

Goal:

- Understand what is being requested and what outcome matters.

Inputs:

- User request.
- Existing docs.
- Project map.
- Relevant code or artifacts.
- Relevant ADRs.
- RAG strategy and source-priority rules when AI context, documentation, or retrieval is involved.

Required output:

- Work type.
- Target user or system owner.
- Problem or opportunity.
- Desired outcome.
- Acceptance criteria or open requirement gaps.
- Risk level.
- Required artifacts.

Questions:

- What is the smallest useful result?
- Is this a product, engineering, QA, DevOps, security, or docs task?
- Does this touch production, secrets, sensitive data, auth, payments, or architecture?
- Is human approval required before implementation?

## Stage 2: Product Validation

Goal:

- Confirm the work is worth doing now.

Owner:

- AI Product Owner.

Required for:

- Features.
- Roadmap changes.
- User-flow changes.
- Business-critical work.

Pass criteria:

- Target user is clear.
- User or business outcome is clear.
- Scope is bounded.
- Success metric or learning goal is known.
- Out-of-scope items are explicit.

Artifact:

- `templates/feature-brief.md` for feature work.
- `templates/prioritization-score.md` for roadmap decisions.

## Stage 3: Business Analysis

Goal:

- Convert intent into testable behavior.

Owner:

- AI Business Analyst.

Required for:

- New or changed user flows.
- Business rules.
- Permission logic.
- Edge-case-heavy changes.

Pass criteria:

- User stories are clear.
- Acceptance criteria are testable.
- Main, alternate, and failure flows are covered.
- Domain terms are defined.
- Business rules are explicit.
- Open questions are listed.

Artifacts:

- `templates/business-requirements.md`.
- `templates/user-story.md`.
- `templates/use-case.md`.
- `templates/domain-glossary.md`.
- `templates/business-rules.md`.

## Stage 4: Architecture Review

Goal:

- Choose a design that fits the current codebase and is safe to maintain.

Owner:

- AI Architect.

Required for:

- New modules.
- Cross-boundary changes.
- API contracts.
- Data models.
- New dependencies.
- Backend, database, infrastructure, or AI-provider work.

Pass criteria:

- Affected modules are identified from the project map.
- FSD boundaries and public APIs are respected.
- Alternatives are considered when meaningful.
- Required contracts, data models, and NFRs are drafted.
- ADR or RFC is created when triggered.

Artifacts:

- `templates/architecture-overview.md`.
- `templates/c4-diagram.md`.
- `adr.md` and `adr/`.
- `templates/adr.md`.
- `templates/rfc.md`.
- `templates/integration-contract.md`.
- `templates/data-model.md`.
- `templates/non-functional-requirements.md`.
- `rag-strategy.md` when retrieval, AI context, embeddings, or RAG are involved.

## Stage 5: Risk, Security, And Privacy Review

Goal:

- Identify risks before implementation makes them harder to fix.

Owner:

- AI Security / Privacy Reviewer.

Required for:

- Medium and high-risk work.
- User input.
- Sensitive data.
- Auth, authorization, secrets, payments, logging.
- AI features or AI-generated user-facing content.

Pass criteria:

- Risk level is assigned.
- Threats are documented when relevant.
- PII and privacy impact are checked.
- Security checklist is applied.
- High risks have human approval or mitigation.

Artifacts:

- `templates/risk-register-entry.md`.
- `templates/threat-model.md`.
- `templates/privacy-pii-policy.md`.
- `templates/security-review-checklist.md`.

## Stage 6: Implementation Plan

Goal:

- Turn design into a safe implementation path.

Required output:

- Files and modules to change.
- Contracts that must stay stable.
- Implementation steps.
- Verification commands.
- Manual QA checklist.
- Docs and project-map updates.
- Rollback plan if needed.

Plan quality rules:

- Keep steps small.
- Avoid unrelated refactors.
- Name assumptions.
- Include failure and fallback handling.
- Include test gaps if no test runner exists.

## Stage 7: Development

Goal:

- Implement the smallest cohesive change that satisfies accepted requirements.

Rules:

- Follow `AGENTS.md`.
- Follow FSD boundaries.
- Use public APIs.
- Keep UI copy in i18n.
- Keep mock data centralized and ticketed.
- Avoid new dependencies without review.
- Preserve public behavior unless intentionally changed.
- Never revert unrelated user changes.

## Stage 8: Automated Verification

Goal:

- Prove the implementation did not break known behavior.

Baseline:

```bash
npm run lint
npm run build
```

Additional checks depend on risk:

- Unit tests for pure logic.
- Integration tests for module interactions.
- E2E tests for critical journeys.
- API/contract tests for backend or integration changes.
- Security checks for sensitive changes.

If a command cannot run, explain why and what was verified instead.

## Stage 9: Documentation Update

Goal:

- Keep operational memory accurate before pull request review and merge.

Required updates:

- Project map according to `project-cartographer`.
- ADR or RFC when triggered.
- QA docs when testing strategy changes.
- Security docs when risk posture changes.
- Release docs when deployable behavior changes.
- RAG strategy when source priority, retrieval, indexing, or AI knowledge governance changes.

Always append `.ai/project-map/update-log.md` after implementation.

## Stage 10: Pull Request Creation Or Update

Goal:

- Create or update the pull request that contains the verified implementation and documentation.

Owner:

- AI PR Owner.

Required for:

- Any committed and pushed work that is intended to land on `main`.
- Any existing PR updated by AI.

Pass criteria:

- PR targets the correct base branch.
- PR title and body summarize scope, changed files, verification, manual QA plan or result, security/privacy impact,
  docs/project-map updates, and residual risk.
- PR includes or references the PR checklist.
- PR excludes unrelated or user-owned changes.
- PR URL is recorded in the final handoff.

Blocking failures:

- Work is pushed but no PR is created or updated.
- PR contains unrelated changes.
- PR body omits verification, reviewer, or merge-readiness evidence.

Use:

- `templates/pr-checklist.md`.
- `governance.md`.

## Stage 11: Pull Request Review

Goal:

- Review the implemented diff before merge.

Owner:

- AI PR Reviewer.

Required for:

- Any code change.
- Any docs, process, dependency, config, or project-map change that will be committed or pushed.
- Any pull request opened or updated by AI.

Pass criteria:

- The diff matches the accepted scope and implementation plan.
- Unrelated or user-owned changes are not included.
- Architecture boundaries, public APIs, localization, dependency changes, and documentation triggers are checked.
- Findings are prioritized by severity and cited with file/line references when applicable.
- Automated verification, planned or completed manual QA, security/privacy, and release evidence are reviewed for
  sufficiency.
- The reviewer states merge-ready, blocked, or mergeable with explicit residual risks.

Use:

- `roles.md`.
- `quality-gates.md`.
- `responsibility-matrix.md`.
- `templates/pr-checklist.md`.

## Stage 12: Manual QA

Goal:

- Verify user-visible behavior, UX, accessibility basics, and release confidence.

Required for:

- UI changes.
- User-flow changes.
- Release work.
- Bugs that were visible to users.

Use:

- `qa-manual.md`.
- `templates/test-plan.md`.
- `templates/manual-test-case.md`.
- `templates/regression-checklist.md`.
- `templates/uat-checklist.md`.

## Stage 13: Release Readiness

Goal:

- Ensure the change can be deployed, monitored, and rolled back.

Required for:

- Production-impacting work.
- Changes that need staging or preview verification.
- Infrastructure, backend, or release process changes.

Pass criteria:

- Release scope is clear.
- Checks passed or gaps are approved.
- Smoke test is defined.
- Rollback path is known.
- Monitoring or post-release checks are defined.
- Human approval exists when required.

Use:

- `devops-release.md`.
- `templates/release-checklist.md`.
- `templates/deployment-guide.md`.

## Stage 14: Pull Request Merge

Goal:

- Merge the reviewed pull request once all required gates pass.

Owner:

- AI PR Owner.

Required for:

- Completed, verified, reviewed, and merge-ready pull requests.

Pass criteria:

- PR review verdict is merge-ready or all blocker findings are resolved.
- Automated verification passed or approved gaps are documented.
- Manual QA and release readiness are complete when applicable.
- Human approval exists for production, high-risk, security, privacy, auth, payments, infrastructure, or major
  architecture changes.
- Merge method is appropriate for repository policy.
- Merge result, SHA, and remaining follow-ups are recorded in the final handoff.

Blocking failures:

- PR is unreviewed.
- Required checks, manual QA, release readiness, or approvals are missing.
- Branch protection, merge conflicts, or failing checks prevent merge.
- High-risk residual issues lack human approval.

## Lifecycle By Product Stage

MVP:

- Optimize for learning.
- Keep scope small.
- Use lightweight gates except for security, privacy, auth, payments, production, and AI-generated content.
- Manual QA can be checklist-based.

Beta:

- Add repeatable release rhythm.
- Add analytics and feedback loops.
- Add critical automated tests.
- Track regression and bugs systematically.

Production:

- Require release checklists.
- Require monitoring and rollback.
- Require stronger security and privacy review.
- Keep ADRs for durable decisions.

Scale:

- Standardize teams, ownership, and artifacts.
- Use CI/CD gates.
- Use observability and incident processes.
- Manage AI features with evals and model/prompt governance.

## Definition Of Ready

A task is ready when:

- The work type and risk level are known.
- Desired behavior is clear enough to implement.
- Acceptance criteria are testable.
- Affected modules are identified or discoverable from the project map.
- Required artifacts are present or intentionally scoped out.
- Human approvals are identified.
- Verification path is known.

## Definition Of Done

A task is done when:

- Implementation matches acceptance criteria.
- Relevant automated checks passed or gaps are documented.
- Manual QA was performed or explicitly scoped out.
- Security/privacy concerns were reviewed for the change type.
- Required docs, ADRs, and project-map entries were updated.
- Release readiness is complete when applicable.
- Final handoff states changed files, verification, approvals, and residual risks.
