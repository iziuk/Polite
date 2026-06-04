# AI SDLC Coverage Matrix

This matrix maps the required virtual fullstack team documentation to concrete Polite files. If a future requirement is
not represented here, add the artifact before relying on AI to execute that work autonomously.

## Coverage Status

| Area                    | Required artifacts                                                                                                                 | Primary files                                                                                                                                                                                                                                                          | Coverage |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Product / business      | Product vision, ICP, personas, business goals, strategy, roadmap, North Star metric, KPI, prioritization                           | `product-business.md`, `templates/product-vision.md`, `templates/persona.md`, `templates/roadmap.md`, `templates/prioritization-score.md`                                                                                                                              | Covered  |
| Business analysis       | BRD, user stories, use cases, acceptance criteria, user flows, glossary, business rules, policies                                  | `business-analysis.md`, `templates/business-requirements.md`, `templates/user-story.md`, `templates/use-case.md`, `templates/domain-glossary.md`, `templates/business-rules.md`                                                                                        | Covered  |
| Architecture            | System overview, C4 diagrams, ADR policy and records, constraints, integrations, data model, NFR                                   | `architecture.md`, `adr.md`, `adr/`, `templates/architecture-overview.md`, `templates/c4-diagram.md`, `templates/adr.md`, `templates/integration-contract.md`, `templates/data-model.md`, `templates/non-functional-requirements.md`                                   | Covered  |
| Engineering             | Principles, coding standards, frontend, backend, database, API, errors, dependencies                                               | `engineering.md`, `AGENTS.md`, `templates/api-specification.md`, `templates/dependency-review.md`                                                                                                                                                                      | Covered  |
| AI SDLC                 | AI development policy, role playbooks, agent instructions, workflow, PR review, risk register, eval criteria, human approval gates | `ai-development-policy.md`, `workflow.md`, `roles.md`, `quality-gates.md`, `security-risk.md`, `templates/risk-register-entry.md`                                                                                                                                      | Covered  |
| Team completeness       | Stage owner/input/output/gate/evidence audit, RACI completeness, red-flag check, feature simulation                                | `completeness-audit.md`, `responsibility-matrix.md`, `quality-gates.md`, `workflow.md`, `templates/team-completeness-audit.md`                                                                                                                                         | Covered  |
| Knowledge / RAG         | Source priority, local retrieval, RAG strategy, freshness, citations, indexing policy, evals, prompt-injection rules               | `rag-strategy.md`, `adr.md`, `adr/`, `ai-features/`, `evaluations/`, `security/`, `.ai/project-knowledge/`, `.ai/tools/project-knowledge/`, `templates/rag-strategy.md`, `templates/ai-feature-spec.md`, `templates/evaluation-plan.md`, `templates/threat-model.md`   | Covered  |
| Manual QA               | Test strategy, test plan, manual cases, exploratory charter, regression, smoke, bug report, UAT                                    | `qa-manual.md`, `templates/test-plan.md`, `templates/manual-test-case.md`, `templates/exploratory-charter.md`, `templates/regression-checklist.md`, `templates/uat-checklist.md`, `templates/bug-report.md`                                                            | Covered  |
| Automation QA           | Automation strategy, test pyramid, E2E scenarios, API tests, test data, CI policy, flaky tests, coverage expectations              | `qa-automation.md`, `templates/automation-test-plan.md`, `templates/e2e-scenario.md`, `templates/api-test-specification.md`, `templates/ci-test-policy.md`                                                                                                             | Covered  |
| DevOps / platform       | Environments, deployment, CI/CD, IaC, secrets, observability, incident response, backup/recovery                                   | `devops-release.md`, `templates/environment-doc.md`, `templates/deployment-guide.md`, `templates/cicd-pipeline.md`, `templates/secrets-management-policy.md`, `templates/observability-guide.md`, `templates/incident-runbook.md`, `templates/backup-recovery-plan.md` | Covered  |
| Security                | Requirements, threat model, OWASP checklist, access control, privacy/PII, secure coding, security review                           | `security-risk.md`, `templates/security-requirements.md`, `templates/threat-model.md`, `templates/owasp-checklist.md`, `templates/access-control-matrix.md`, `templates/privacy-pii-policy.md`, `templates/security-review-checklist.md`                               | Covered  |
| Code review / PR review | PR reviewer role, PR review workflow stage, PR review gate, RACI ownership, reviewer checklist                                     | `roles.md`, `workflow.md`, `quality-gates.md`, `responsibility-matrix.md`, `templates/pr-checklist.md`                                                                                                                                                                 | Covered  |
| Delivery / process      | Definition of Ready, Definition of Done, PR checklist, release checklist, change management, RFC, postmortem                       | `workflow.md`, `quality-gates.md`, `governance.md`, `templates/pr-checklist.md`, `templates/release-checklist.md`, `templates/change-request.md`, `templates/rfc.md`, `templates/postmortem.md`                                                                        | Covered  |
| Role matrix             | AI Product Owner, BA, Architect, Frontend, Backend, PR Reviewer, QA Manual, QA Automation, DevOps, Security, Human Approver        | `roles.md`, `responsibility-matrix.md`                                                                                                                                                                                                                                 | Covered  |

## Operating Rule

For any non-trivial task, AI must identify which row or rows apply before implementation. If the relevant row is not
covered by an artifact, the first deliverable is to create or update the missing artifact.

## Maturity Levels

Level 0 - Missing:

- No artifact exists.
- AI must not proceed without creating a minimum version or asking for human direction.

Level 1 - Template:

- A template exists, but project-specific details are incomplete.
- AI may draft the missing details and ask for approval when the details affect business, security, or production.

Level 2 - Project baseline:

- A Polite-specific baseline exists.
- AI may use it as the default source of truth.

Level 3 - Operational:

- The artifact is used during delivery, reviewed, and updated after changes.
- AI may enforce it as a gate.

The files added in this directory establish Level 1 to Level 2 coverage. Future product discovery, backend, AI feature,
and production infrastructure work should progressively promote the relevant artifacts to Level 3.
