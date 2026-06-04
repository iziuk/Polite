# Role Responsibility Matrix

This matrix defines how the virtual fullstack team divides work. One AI agent may perform multiple roles, but the
responsibility still has to be covered.

Legend:

- R: Responsible for doing the work.
- A: Accountable for final quality or decision.
- C: Consulted before completion.
- I: Informed in handoff.

| Activity                | Product Owner | Business Analyst | Architect | FE Dev | BE Dev | QA Manual | QA Automation | DevOps/SRE | Security | Human                    |
| ----------------------- | ------------- | ---------------- | --------- | ------ | ------ | --------- | ------------- | ---------- | -------- | ------------------------ |
| Product vision          | A/R           | C                | I         | I      | I      | I         | I             | I          | C        | A                        |
| Prioritization          | A/R           | C                | C         | I      | I      | C         | C             | C          | C        | A                        |
| BRD                     | C             | A/R              | C         | I      | I      | C         | C             | I          | C        | A when business-critical |
| User stories            | C             | A/R              | C         | I      | I      | C         | C             | I          | C        | I                        |
| Acceptance criteria     | C             | A/R              | C         | C      | C      | C         | C             | I          | C        | I                        |
| Architecture design     | C             | C                | A/R       | C      | C      | I         | C             | C          | C        | A when major             |
| ADR                     | I             | C                | A/R       | C      | C      | I         | I             | C          | C        | A when accepted          |
| RAG strategy            | C             | C                | A/R       | C      | C      | C         | C             | C          | C        | A when high-risk         |
| RAG security review     | I             | I                | C         | C      | C      | I         | C             | C          | A/R      | A when sensitive         |
| Frontend implementation | I             | C                | C         | A/R    | I      | C         | C             | I          | C        | I                        |
| Backend implementation  | I             | C                | C         | I      | A/R    | C         | C             | C          | C        | I                        |
| Test plan               | C             | C                | C         | C      | C      | A/R       | R             | I          | C        | C for UAT                |
| Automation tests        | I             | C                | C         | C      | C      | C         | A/R           | C          | C        | I                        |
| Manual QA               | C             | C                | I         | C      | C      | A/R       | C             | I          | C        | C for UAT                |
| Security review         | C             | C                | C         | C      | C      | C         | C             | C          | A/R      | A for high risk          |
| Deployment plan         | I             | I                | C         | I      | C      | C         | C             | A/R        | C        | A for production         |
| Release approval        | A             | C                | C         | I      | I      | C         | C             | A/R        | C        | A                        |
| Incident response       | I             | I                | C         | C      | C      | C         | C             | A/R        | C        | A for major              |
| Postmortem              | C             | C                | C         | C      | C      | C         | C             | A/R        | C        | I                        |

## Role Escalation Rules

Escalate to Human Approver when:

- Accountable role finds unresolved business ambiguity.
- Architecture decision is expensive to reverse.
- Security reviewer rates risk high.
- DevOps/SRE needs production deploy or rollback approval.
- QA finds release-blocking defects.
- AI cannot verify critical behavior.

## Role Handoff Requirements

Product Owner to BA:

- Problem, target user, value, scope, success metric.

BA to Architect:

- User stories, business rules, acceptance criteria, edge cases.

Architect to Developers:

- Affected modules, boundaries, contracts, risks, ADR/RFC status.
- RAG/source-priority constraints when retrieval or AI context affects implementation.

Developers to QA:

- Changed behavior, files, known risk areas, verification already run.

QA to DevOps:

- Release confidence, blockers, smoke/regression status.

DevOps to Human:

- Release scope, checks, rollback, monitoring, approval request.
