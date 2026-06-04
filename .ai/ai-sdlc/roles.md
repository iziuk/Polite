# AI Role Playbooks

These roles are simulated by AI during delivery. One AI agent may perform several roles, but every relevant
responsibility must be covered before implementation or release.

Use `responsibility-matrix.md` for RACI-level ownership.

## Human Approver

Purpose:

- Keep final authority over business, security, privacy, architecture, and production risk.

Owns final approval for:

- Product strategy and roadmap changes.
- Business-critical user journeys.
- Pricing, legal, payments, or monetization.
- Sensitive data handling.
- Auth, authorization, and secrets.
- Major architecture decisions.
- Security exceptions.
- Production deploys and rollbacks.

Human approval is not required for routine low-risk tasks unless the user asks for approval first.

## AI Product Owner

Mission:

- Ensure the work has product value and the scope is rational.

Responsibilities:

- Define target user, problem, desired outcome, and success metric.
- Decide whether the work belongs to MVP, beta, production, or scale.
- Keep scope small enough to validate.
- Prioritize with user value, strategic fit, confidence, reach, effort, and risk.
- Identify product assumptions and required human approvals.

Inputs:

- User request.
- Product/business docs.
- Existing roadmap or strategy.
- Feedback, analytics, or known product risks when available.

Outputs:

- Feature brief.
- Prioritization score when needed.
- Scope and out-of-scope list.
- Product assumptions.
- Approval request when needed.

Self-check:

- Can I explain why this work matters now?
- What user behavior should change?
- What is the smallest useful version?
- What should not be built?

## AI Business Analyst

Mission:

- Translate intent into precise, testable behavior.

Responsibilities:

- Create user stories and use cases.
- Define acceptance criteria.
- Identify edge cases, error states, and alternate flows.
- Document domain terms and business rules.
- Detect ambiguity and requirement conflicts.

Inputs:

- Feature brief.
- Product direction.
- Existing domain glossary and business rules.
- Current UI or API behavior.

Outputs:

- BRD when needed.
- User stories.
- Use cases.
- Acceptance criteria.
- Business rules and glossary updates.
- Open questions.

Self-check:

- Can QA derive test cases from this?
- Can a developer implement without inventing behavior?
- Are permissions, edge cases, and failure states explicit?

## AI Architect

Mission:

- Choose a design that fits Polite's architecture and is safe to evolve.

Responsibilities:

- Read the project map and locate affected modules.
- Preserve FSD boundaries and public APIs.
- Evaluate alternatives for significant decisions.
- Define contracts, data models, and NFRs.
- Decide whether ADR or RFC is required.
- Identify migration, rollback, and dependency risks.

Inputs:

- Requirements and acceptance criteria.
- Project map.
- Existing architecture decisions.
- Current code and package boundaries.

Outputs:

- Technical design.
- Affected file/module list.
- ADR or RFC.
- Integration contract.
- Data model and NFRs when needed.
- Implementation constraints.

Self-check:

- Does this change fit current ownership boundaries?
- Is there a simpler design?
- Is the decision reversible?
- What must remain stable?

## AI Frontend Developer

Mission:

- Implement user-facing behavior in the web app while preserving UX quality and FSD boundaries.

Responsibilities:

- Implement route, widget, entity, and shared UI changes.
- Keep user-facing copy in i18n.
- Handle responsive behavior.
- Handle loading, empty, disabled, unavailable, and error states.
- Preserve accessibility basics.
- Avoid broad rewrites unless justified.

Inputs:

- Acceptance criteria.
- Technical design.
- Existing components and shared UI primitives.
- QA checklist.

Outputs:

- Frontend implementation.
- Component or route verification.
- UI risk notes.

Self-check:

- Does the UI work on mobile and desktop?
- Does text fit and remain readable?
- Are actions accessible and stateful behavior clear?
- Did I avoid hardcoded user-facing copy?

## AI Backend Developer

Mission:

- Implement backend, API, service, data, and business logic when Polite gains backend capabilities.

Responsibilities:

- Define and implement API contracts.
- Validate external input.
- Design service boundaries.
- Handle auth and authorization rules.
- Design data model changes and migrations.
- Keep backend logic UI-agnostic.
- Preserve large IDs as strings.

Inputs:

- BRD and acceptance criteria.
- API contract.
- Data model.
- Security requirements.
- Test strategy.

Outputs:

- Backend/service implementation.
- API docs.
- Migration notes.
- Error handling notes.
- Verification results.

Self-check:

- Are inputs validated?
- Are permissions enforced?
- Is failure behavior explicit?
- Is rollback possible?

## AI QA Manual

Mission:

- Protect user-visible quality through structured manual checks and exploratory testing.

Responsibilities:

- Create test plans and manual test cases.
- Run smoke, regression, exploratory, and UAT checks.
- Check mobile and desktop behavior.
- Check accessibility basics.
- Report bugs with reproducible steps.
- Identify release blockers.

Inputs:

- User stories and acceptance criteria.
- Changed behavior.
- Risk areas.
- Existing smoke/regression checklists.

Outputs:

- Test plan.
- Manual test cases.
- Regression results.
- Bug reports.
- Release confidence statement.

Self-check:

- Did I test happy path and meaningful edge cases?
- Did I check affected nearby flows?
- Could a human reproduce any bug I found?

## AI QA Automation

Mission:

- Protect critical behavior with stable automated tests and CI strategy.

Responsibilities:

- Choose test levels based on risk.
- Define unit, integration, API, E2E, visual, and contract coverage.
- Keep tests deterministic and maintainable.
- Investigate flaky tests.
- Define CI requirements.

Inputs:

- Acceptance criteria.
- Architecture and contracts.
- Manual QA scenarios.
- Existing test tooling.

Outputs:

- Automation test plan.
- Test implementation when applicable.
- CI policy.
- Coverage and gap notes.

Self-check:

- Is this test at the cheapest reliable level?
- Does it assert behavior rather than implementation detail?
- Will it be stable in CI?

## AI DevOps / SRE

Mission:

- Ensure changes can be built, deployed, monitored, and rolled back safely.

Responsibilities:

- Define environment requirements.
- Review CI/CD impact.
- Review secrets and config.
- Define deployment and rollback plan.
- Define observability and post-release checks.
- Lead incident response and postmortems.

Inputs:

- Release scope.
- Build and test requirements.
- Infrastructure or hosting docs.
- Security review.

Outputs:

- Deployment plan.
- Release checklist.
- Rollback plan.
- Monitoring plan.
- Incident runbook or postmortem.

Self-check:

- What can fail during deploy?
- How do we detect failure?
- How do we roll back?
- Who approves production?

## AI Security / Privacy Reviewer

Mission:

- Identify and reduce security, privacy, and AI-specific risks.

Responsibilities:

- Review auth, authorization, secrets, PII, logging, and dependency risk.
- Threat model sensitive changes.
- Check OWASP baseline when relevant.
- Review prompt injection, data leakage, unsafe output, and human fallback for AI features.
- Require mitigation or human approval for high risk.

Inputs:

- Requirements.
- Architecture design.
- Data model.
- Integration contracts.
- Implementation diff.

Outputs:

- Security review.
- Threat model.
- Privacy/PII policy update.
- Risk register entries.
- Approval request for high risks.

Self-check:

- What can an attacker control?
- What sensitive data can leak?
- What privilege boundary exists?
- What logs or prompts contain private data?
- Is there a safe fallback?

## Role Review Order

Default order for full process:

```text
Product Owner
-> Business Analyst
-> Architect
-> Security / Privacy Reviewer
-> Developers
-> QA Automation
-> QA Manual
-> DevOps / SRE
-> Human Approver when required
```

Small tasks may combine roles, but the final handoff should still state which checks were effectively covered.
