# Quality Gates

Quality gates are checkpoints that decide whether AI may proceed. They should be proportional to risk: lightweight for
small fixes, explicit for high-risk work.

## Gate Severity

Blocking gate:

- Work must stop until the issue is resolved or human approval is given.

Warning gate:

- Work may continue, but the risk must be stated in the final handoff.

Informational gate:

- Record the observation; no approval needed.

## Gate 1: Use-Case Gate

Purpose:

- Confirm the work has a clear reason.

Pass when:

- Problem or opportunity is clear.
- Target user or system owner is clear.
- Desired outcome is clear.
- Scope is bounded.

Blocking failures:

- No clear behavior to implement.
- Product direction changes without human approval.
- AI would need to invent core requirements.

## Gate 2: Product Value Gate

Purpose:

- Confirm the task is worth doing now.

Pass when:

- Work maps to MVP, beta, production, or scale strategy.
- Success metric or learning goal is known.
- Out-of-scope items are stated.
- Priority is reasonable for effort and risk.

Blocking failures:

- Work conflicts with product strategy.
- Business-critical change lacks human approval.
- Pricing, legal, or monetization change lacks human approval.

## Gate 3: Requirements Gate

Purpose:

- Ensure implementation and QA can verify the same behavior.

Pass when:

- Acceptance criteria are testable.
- Happy path is defined.
- Alternate and error paths are defined when relevant.
- Business rules are explicit.
- Domain terms are clear.

Blocking failures:

- Acceptance criteria are vague.
- Permission or business rule is ambiguous.
- Missing requirement changes architecture or QA scope.

## Gate 4: Architecture Gate

Purpose:

- Preserve maintainability and ownership boundaries.

Pass when:

- Affected modules are identified through the project map.
- FSD boundaries and public APIs are respected.
- New dependencies are reviewed.
- Contracts and data models exist when needed.
- ADR or RFC exists when triggered.
- Accepted ADRs and source-priority rules are checked when the change relies on prior decisions.

Blocking failures:

- Design violates FSD import rules.
- New backend, database, service, or AI integration lacks architecture artifact.
- Major decision lacks human approval.
- Data model or API contract is undefined.
- Automated RAG, embeddings, or retrieval architecture lacks ADR, eval plan, security/privacy review, or approval.

## Gate 5: Security And Privacy Gate

Purpose:

- Prevent unsafe implementation.

Pass when:

- Sensitive data impact is reviewed.
- Auth and authorization impact is reviewed.
- Secret handling is safe.
- User input and injection risks are reviewed.
- Logging does not expose sensitive data.
- High risks have mitigation or human approval.

Blocking failures:

- PII is introduced without privacy review.
- Secrets may be exposed.
- Auth or authorization behavior is ambiguous.
- High security risk lacks approval.

## Gate 6: AI Risk Gate

Purpose:

- Control risks from AI-assisted delivery and AI-enabled product features.

Pass when:

- AI assumptions are marked.
- AI-generated requirements are confirmed.
- AI feature has eval strategy when applicable.
- Prompt injection, data leakage, unsafe output, and fallback are reviewed when applicable.
- RAG/source retrieval follows `.ai/ai-sdlc/rag-strategy.md` when project knowledge, embeddings, or retrieved context are
  involved.

Blocking failures:

- AI-generated user-facing content would ship without review.
- AI feature lacks evals or safety checks.
- Sensitive data would be sent to an AI provider without approval.
- Retrieved context can override project instructions, leak secrets, or use stale/superseded sources without mitigation.

## Gate 7: Implementation Gate

Purpose:

- Confirm code changes are scoped and coherent.

Pass when:

- Implementation matches the accepted plan or records why it changed.
- Unrelated files are not modified.
- Public behavior remains stable unless intentionally changed.
- UI copy is localized.
- Mock data policy is followed.

Blocking failures:

- Implementation silently changes unrelated behavior.
- Work bypasses public APIs.
- User-facing strings are hardcoded.
- Mock data is scattered or unticketed.

## Gate 8: Verification Gate

Purpose:

- Confirm the change was checked appropriately.

Pass when:

- Automated checks match blast radius.
- Manual QA covers touched user flow when relevant.
- Known test gaps are documented.
- Flaky or failing tests are investigated.

Blocking failures:

- Critical flow is unverified.
- Build or lint failure is ignored.
- Release-critical manual QA is skipped without approval.

## Gate 9: Release Readiness Gate

Purpose:

- Ensure deployable changes can be shipped safely.

Pass when:

- Release scope is clear.
- Smoke checks are defined.
- Rollback path is known.
- Monitoring or post-release checks are defined.
- Production deploy has human approval.

Blocking failures:

- Production deploy lacks human approval.
- Rollback is unknown for high-risk release.
- Migration is irreversible and unapproved.
- Monitoring gap is unacceptable for the risk.

## Gate 10: Documentation Gate

Purpose:

- Keep the project navigable and auditable.

Pass when:

- Project map is updated according to trigger rules.
- ADR/RFC is updated when triggered.
- RAG strategy is updated when retrieval, indexing, source priority, freshness, or knowledge-governance rules change.
- QA, security, product, or release docs are updated when changed.
- Update log entry is appended.

Blocking failures:

- Changed architecture is not documented.
- Required project-map update is skipped.
- Accepted high risk is not recorded.

## Definition Of Ready Checklist

- Work type classified.
- Risk level classified.
- Required roles identified.
- Acceptance criteria present.
- Affected modules identified.
- Human approvals identified.
- Verification plan known.
- Required artifacts ready or intentionally scoped out.

## Definition Of Done Checklist

- Acceptance criteria satisfied.
- Code or docs changed only within scope.
- Automated checks run or gaps documented.
- Manual QA run or explicitly scoped out.
- Security/privacy/AI risk reviewed.
- Release readiness complete when applicable.
- Project map and docs updated.
- Final handoff includes residual risks.

## PR Checklist

- Summary explains user or system outcome.
- Requirements and acceptance criteria are linked or summarized.
- Affected modules are listed.
- Architecture impact is stated.
- Tests and verification commands are included.
- Manual QA result is included for UI/user-flow changes.
- Security/privacy impact is stated.
- AI risk impact is stated when applicable.
- ADR/RFC/docs/project-map updates are included when triggered.
- Release and rollback notes are included when production-impacting.

Use `templates/pr-checklist.md`.
