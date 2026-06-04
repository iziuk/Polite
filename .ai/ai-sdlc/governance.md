# Delivery Governance

Governance keeps AI-assisted delivery auditable without turning the project into paperwork theater. Use the smallest
artifact that preserves decision quality, traceability, and release safety.

## Governance Principles

- Artifacts exist to improve decisions, not to decorate the repo.
- High-risk work needs explicit evidence.
- Low-risk work uses lightweight checklists.
- Human approvals are recorded when required.
- Decisions are reversible when possible.
- Process should protect focus and quality.

## Artifact Ownership

| Artifact              | Owner role                | Human approval required when                              |
| --------------------- | ------------------------- | --------------------------------------------------------- |
| Product vision        | AI Product Owner          | Product direction changes                                 |
| Persona               | AI Product Owner          | New user segment changes roadmap                          |
| BRD                   | AI Business Analyst       | Business-critical workflow changes                        |
| User story            | AI Business Analyst       | Scope or priority is ambiguous                            |
| Architecture overview | AI Architect              | Platform or system boundary changes                       |
| ADR                   | AI Architect              | Decision is accepted or reversed                          |
| RAG strategy          | AI Architect / Security   | Automated RAG, sensitive data, or production AI retrieval |
| RFC                   | AI Architect              | Multiple stakeholders or high uncertainty                 |
| Test plan             | AI QA Manual / Automation | Release-critical flow                                     |
| Release checklist     | AI DevOps / SRE           | Production deploy                                         |
| Threat model          | AI Security Reviewer      | Medium or high security risk                              |
| Risk register item    | Owning role               | High risk is accepted                                     |
| Postmortem            | AI DevOps / SRE           | Major incident                                            |

## Change Management

Use a change request when work affects:

- Product scope.
- Architecture boundaries.
- Public API contracts.
- Data model.
- Security posture.
- Deployment or infrastructure.
- Release readiness.

Use `templates/change-request.md`.

## RFC Policy

Use an RFC when:

- There are multiple viable approaches.
- The decision affects future work.
- Several roles need to review the trade-off.
- The risk is too large for an inline implementation note.

An RFC can lead to an ADR after the decision is accepted.

Use `templates/rfc.md`.

## Decision Log

Use ADRs for architecture decisions and update `.ai/project-map/decisions.md` for project-map relevant conventions.

Decision records should include:

- Context.
- Decision.
- Alternatives.
- Consequences.
- Status.
- Follow-ups.

Use `.ai/ai-sdlc/adr.md` for the ADR operating policy and `.ai/ai-sdlc/adr/` for accepted decision records.

## Knowledge Governance

Use `.ai/ai-sdlc/rag-strategy.md` for source priority, project knowledge retrieval, stale-context handling, citation
rules, and future automated RAG requirements.

Update the RAG strategy when work changes:

- Which documents are authoritative.
- Retrieval order or source priority.
- Knowledge-base inclusion or exclusion rules.
- Documentation freshness expectations.
- Citation or handoff requirements.
- Prompt-injection, privacy, or indexing controls.
- Automated RAG architecture, provider, embeddings, or vector-store rules.

## Documentation Lifecycle

When a task changes behavior, architecture, QA strategy, release process, or security posture:

1. Update the source artifact.
2. Update the project map if the map's trigger rules apply.
3. Append to `.ai/project-map/update-log.md`.
4. Mention changed docs in the final handoff.

Do not rewrite unrelated map sections.

## Audit Trail

For high-risk tasks, final handoff should include:

- Branch.
- Scope.
- Changed files.
- Verification commands.
- Manual QA performed or skipped.
- Human approvals received or required.
- Residual risks.
- Follow-ups.

## Commit Message Governance

Before drafting any commit message or preparing a commit, use the global `draft-commit-message` skill.

Required behavior:

- Inspect current git state.
- Distinguish in-scope, out-of-scope, and unclear changes.
- Use the repository's Conventional Commit rules.
- Avoid scopes unless the user explicitly requests one.
- Keep the summary imperative and concise.
- Do not include generated-by footers.

## Postmortems

Use postmortems for:

- Production incidents.
- Major regressions.
- Security or privacy issues.
- Repeated flaky tests blocking release.
- Significant AI failure during delivery.

Postmortems must focus on system improvements, not blame.

Use `templates/postmortem.md`.

## Governance Done Criteria

Governance is satisfied when:

- Required artifacts exist.
- Approval gates are respected.
- Decisions and risks are traceable.
- The process used was proportional to risk.
