# AI Development Policy

This document defines what AI may do independently, what requires human approval, and how AI evaluates its own output.

## AI Autonomy Levels

Level 0 - No autonomy:

- AI may analyze and draft options only.
- Human approval required before implementation.
- Applies to production deploys, secrets, payments, auth, sensitive data, and major architecture changes.

Level 1 - Assisted execution:

- AI may implement after the user approves the direction or scope.
- Applies to medium-risk features, new workflows, cross-module refactors, and dependency additions.

Level 2 - Supervised autonomy:

- AI may plan, implement, verify, and document within the requested scope.
- Applies to normal feature work with clear acceptance criteria and low to medium risk.

Level 3 - Routine autonomy:

- AI may act directly with concise verification.
- Applies to small docs updates, localized copy fixes, small bug fixes, and low-risk refactors.

AI must identify the autonomy level before non-trivial implementation.

## What AI Can Do Without Human Approval

AI may usually:

- Read project files and project map.
- Draft requirements, docs, tests, and implementation plans.
- Implement low-risk changes inside the current branch.
- Add or update documentation.
- Run local verification commands.
- Propose ADRs, RFCs, RAG strategy updates, risk entries, and release checklists.

## What Requires Human Approval

Human approval is required before:

- Production deploy.
- Secret changes.
- Auth or authorization changes.
- Payment, pricing, or legal changes.
- Storing or exposing sensitive personal data.
- Adding AI-generated content to user-facing production flows.
- Accepting high security or privacy risk.
- Introducing a major dependency, backend, database, or infrastructure change.
- Reversing an accepted architecture decision.

## Agent Instructions

For non-trivial work, AI must:

1. Read `AGENTS.md`.
2. Read `.ai/project-map/INDEX.md` and `.ai/project-map/modules.yaml`.
3. Read relevant `.ai/ai-sdlc` documents.
4. Read relevant accepted ADRs.
5. Apply `.ai/ai-sdlc/rag-strategy.md` source-priority rules when context retrieval matters.
6. Identify role reviews needed.
7. Identify gates that apply.
8. Identify artifacts to create or update.
9. Implement only after scope and risk are clear.
10. Verify according to risk.
11. Review the implementation diff or pull request.
12. Update project map and docs.
13. Report reviewer verdict, verification, and residual risk.

## Prompt Discipline

AI must not:

- Treat generated assumptions as confirmed facts.
- Invent product requirements.
- Invent APIs, packages, routes, or commands without checking the repo.
- Hide uncertainty.
- Skip human approval gates.
- Use broad searches when the project map points to the right module.
- Create worktrees unless explicitly requested.

AI should:

- State assumptions.
- Use project-specific sources of truth.
- Retrieve context in the order defined by `.ai/ai-sdlc/rag-strategy.md`.
- Treat accepted ADRs as constraints and proposed ADRs as discussion context.
- Prefer concrete artifacts over vague plans.
- Keep implementation scoped.
- Mark unknowns and follow-ups.

## AI Evaluation Criteria

Evaluate AI output on:

- Correctness: matches requirements and codebase behavior.
- Completeness: covers happy path, edge cases, verification, and docs.
- Maintainability: preserves ownership and avoids unnecessary complexity.
- Security: identifies sensitive data and attack paths.
- Testability: includes a realistic verification path.
- Traceability: connects decisions to artifacts.
- Reversibility: identifies rollback or mitigation for risky changes.
- Clarity: handoff is understandable to humans.

## AI Risk Register

Track risks when they are medium or high.

Common AI delivery risks:

- Hallucinated requirements.
- Overconfident technical assumptions.
- Missing edge cases.
- Security leakage through logs, prompts, or docs.
- Fragile tests.
- Overengineering.
- Under-documenting approval decisions.
- Changing unrelated files.

Use `templates/risk-register-entry.md`.

## AI Feature Requirements

If the product gains AI features, the feature must define:

- Use case and user value.
- Model/provider choice and rationale.
- Prompt or retrieval strategy.
- Data sources and privacy classification.
- Evaluation set.
- RAG strategy impact, source priority, and stale-context handling when retrieval is used.
- Success metrics.
- Safety tests.
- Cost and latency limits.
- Human fallback.
- Monitoring.
- Rollback or disable mechanism.

AI features cannot ship on "it seems good" alone. They require evals and risk review.

## Human-In-The-Loop Rules

Require human review when:

- The AI output can materially affect user decisions.
- The AI output may be unsafe, offensive, misleading, or legally sensitive.
- The model uses personal or private data.
- Content quality is domain-sensitive.
- The system lacks reliable automated evaluation.

## AI Development Done Criteria

AI-assisted work is done when:

- The autonomy level was appropriate.
- Human approval gates were respected.
- Required artifacts were created or updated.
- Pull request or implementation diff review was completed.
- Implementation is verified.
- Residual risks are stated.
- The final response is traceable to files and checks.
