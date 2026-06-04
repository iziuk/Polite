# ADR Index

This folder stores Polite Architecture Decision Records. Use `.ai/ai-sdlc/adr.md` for the operating policy and
`.ai/ai-sdlc/templates/adr.md` for the template.

## Active Decisions

| ADR                                                          | Status   | Decision                                                |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------- |
| [ADR-001](adr-001-npm-workspace-nextjs-web-app.md)           | Accepted | Use npm workspace monorepo with a Next.js web app.      |
| [ADR-002](adr-002-fsd-web-boundaries.md)                     | Accepted | Use Feature-Sliced Design boundaries for the web app.   |
| [ADR-003](adr-003-static-phrase-packs-mvp-data.md)           | Accepted | Use static phrase packs as the MVP data source.         |
| [ADR-004](adr-004-project-cartographer-navigation-memory.md) | Accepted | Use Project Cartographer as required navigation memory. |
| [ADR-005](adr-005-ai-sdlc-managed-team-operating-model.md)   | Accepted | Use AI SDLC managed fullstack team operating model.     |
| [ADR-006](adr-006-human-approval-gates.md)                   | Accepted | Require human approval gates for high-risk work.        |
| [ADR-007](adr-007-rag-ready-knowledge-retrieval-policy.md)   | Accepted | Adopt a RAG-ready knowledge retrieval policy.           |
| [ADR-008](adr-008-local-project-knowledge-retrieval.md)      | Accepted | Use local project knowledge retrieval.                  |

## Numbering Rules

- Use the next available number.
- Never renumber existing ADRs.
- Never delete accepted ADRs.
- Supersede an ADR with a new ADR when the decision changes.

## Status Legend

- Proposed: drafted but not accepted.
- Accepted: active project direction.
- Rejected: considered but not adopted.
- Superseded: replaced by a newer ADR.
- Deprecated: historical decision no longer recommended for new work.
