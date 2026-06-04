# ADR-007: Adopt A RAG-Ready Knowledge Retrieval Policy

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `.ai/ai-sdlc/rag-strategy.md`, `.ai/ai-sdlc/ai-development-policy.md`, `.ai/project-map`

## Context

Polite has a growing documentation set for AI-assisted product and engineering work. AI agents need consistent rules for
retrieving context before implementation. The project may later introduce automated RAG, but there is no current vector
store or embedding pipeline.

## Decision Drivers

- Make AI answers and code changes grounded in project sources.
- Avoid stale or hallucinated context.
- Define authoritative source priority.
- Prepare documentation for future automated RAG without pretending it exists today.
- Protect secrets, private data, and sensitive prompts from accidental indexing or retrieval.

## Decision

Polite adopts `.ai/ai-sdlc/rag-strategy.md` as the project knowledge retrieval policy.

The current implementation is manual retrieval by AI agents using project-map guidance, ADRs, AI SDLC docs, source
files, and targeted searches. Future automated RAG requires a separate ADR, AI feature spec, security/privacy review,
evaluation plan, and human approval when high-risk sources or user-facing output are involved.

## Alternatives Considered

### No Retrieval Policy

Pros:

- No extra documentation.
- Agents can improvise quickly.

Cons:

- Inconsistent context gathering.
- Higher risk of stale or hallucinated answers.
- No source priority or conflict resolution.

### Implement Automated Vector RAG Immediately

Pros:

- Potentially faster retrieval for large documentation.
- Can support richer AI workflows later.

Cons:

- Premature for the current repository size.
- Requires provider, privacy, security, eval, cost, and operational decisions.
- Risk of indexing sensitive or stale content without governance.

## Consequences

Positive:

- AI agents have clear retrieval and source-priority rules.
- ADRs and project-map files become more useful.
- Future automated RAG has explicit prerequisites.

Negative or trade-offs:

- Documentation changes must consider retrieval impact.
- Manual retrieval still requires agent discipline.
- Automated RAG is intentionally deferred until justified.

## Security And Privacy Impact

Positive impact: the strategy explicitly denies secrets, tokens, sensitive personal data, private credentials, and
unapproved private prompts from future RAG indexing.

Future automated RAG introduces prompt injection, data leakage, access-control, provider, logging, and retention risks
that must be reviewed before implementation.

## Operational Impact

AI-assisted work should mention relevant sources in handoffs when the source matters. Future automated RAG would require
ingestion, re-indexing, monitoring, evals, and rollback procedures.

## Rollback Or Reversal

The project can stop using the RAG strategy only with a replacement knowledge-management policy and a new ADR.

## Follow-Ups

- Keep `.ai/ai-sdlc/rag-strategy.md` aligned with source-priority and AI risk rules.
- Add a future ADR before selecting an embedding provider, vector store, or retrieval pipeline.
