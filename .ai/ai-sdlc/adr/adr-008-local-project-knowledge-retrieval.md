# ADR-008: Use Local Project Knowledge Retrieval

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `.ai/tools/project-knowledge`, `.ai/project-knowledge`, `.ai/ai-sdlc/rag-strategy.md`

## Context

Polite has a growing AI SDLC, ADR, project-map, source, and configuration knowledge base. The previous RAG strategy made
the project RAG-ready, but retrieval still depended on manual file reads and targeted search. The user asked to execute
the automated retrieval work without holding back resources.

The project needs a concrete retrieval mechanism while avoiding premature provider, embedding, vector database,
secrets, privacy, and production complexity.

## Decision Drivers

- Provide automated project-knowledge retrieval now.
- Avoid external AI providers and network calls.
- Avoid new dependencies.
- Keep sensitive data and secrets out of the index.
- Preserve source metadata and authority levels.
- Keep generated indexes reproducible and disposable.
- Allow future provider/vector database upgrades through a later ADR.

## Decision

Polite uses a local project-knowledge retrieval tool implemented with Node.js built-ins.

The tool:

- Builds a generated JSON index from allowlisted repository sources.
- Chunks markdown by semantic headings and non-markdown files by line ranges.
- Runs a conservative secret-signal scan before indexing files.
- Stores metadata such as source path, source type, owner role, authority level, module, risk level, and line range.
- Uses local TF-IDF vectors and cosine similarity for retrieval.
- Provides npm scripts for indexing, searching, and retrieval evaluation.
- Does not call an LLM, embedding provider, or vector database.

The generated index is ignored by git and should be regenerated after relevant documentation, source, config, or
project-map changes.

## Alternatives Considered

### External Embedding Provider And Vector Database

Pros:

- Stronger semantic retrieval.
- More scalable for large corpora.
- Closer to common production RAG patterns.

Cons:

- Requires provider selection, data-processing review, cost/latency budget, access control, logging policy, and
  production operations.
- Higher privacy and prompt-injection risk.
- Too heavy for the current local project-knowledge use case.

### Manual Retrieval Only

Pros:

- No tool implementation.
- No generated index.
- Lowest operational complexity.

Cons:

- Slower for growing documentation.
- Less repeatable.
- Harder to evaluate.
- Leaves RAG strategy as policy without executable support.

### New Search Dependency

Pros:

- Could provide better ranking or indexing features quickly.
- Less custom code.

Cons:

- Adds dependency review and maintenance surface.
- Not necessary for the first local retrieval version.
- May complicate repository setup.

## Consequences

Positive:

- AI agents can retrieve project context through repeatable commands.
- Retrieval is local, cheap, and does not expose private project context to third parties.
- Evaluation cases provide a regression baseline.
- The implementation fits current governance and source-priority rules.

Negative or trade-offs:

- TF-IDF is lexical and less semantic than embedding models.
- Generated indexes can become stale if not rebuilt.
- The tool is not a production RAG feature and does not generate answers.
- Secret scanning is conservative but not a substitute for full secret management.

## Security And Privacy Impact

No external provider receives project data. The index is local and gitignored.

Security controls:

- Allowlisted source paths.
- Denied environment, lockfile, dependency, cache, generated, key, certificate, and log paths.
- Secret-signal scan before indexing each file.
- Metadata marks source authority and risk level.
- Evaluation checks retrieval safety and expected source recall.

The tool must not index secrets, credentials, private prompts, sensitive personal data, or unapproved user documents.

## Operational Impact

Commands:

```bash
npm run knowledge:index
npm run knowledge:search -- "query"
npm run knowledge:evaluate
```

Generated artifact:

```text
.ai/project-knowledge/index.json
```

The generated index is not committed and should be rebuilt after relevant repository changes.

## Rollback Or Reversal

Rollback is simple:

- Remove `.ai/tools/project-knowledge`.
- Remove `.ai/project-knowledge`.
- Remove npm knowledge scripts.
- Remove generated `.ai/project-knowledge/index.json`.
- Supersede this ADR if a different retrieval architecture replaces it.

## Follow-Ups

- Expand eval cases when new documentation areas appear.
- Add parser-based code chunking if source-code retrieval becomes important.
- Create a new ADR before selecting any external embedding provider, vector database, or LLM generation pipeline.
