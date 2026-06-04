# Project Knowledge Retrieval

Polite has a local project-knowledge retrieval tool for AI-assisted work. It builds a generated JSON index from approved
repository sources and searches it with local TF-IDF vectors and cosine similarity.

This is automated retrieval, not an LLM generation pipeline. It does not call an external model provider, embedding API,
or vector database.

## Commands

Build the local index:

```bash
npm run knowledge:index
```

Search the index:

```bash
npm run knowledge:search -- "ADR RAG approval gates"
```

Run retrieval evaluation cases:

```bash
npm run knowledge:evaluate
```

## Generated Files

The generated index is written to:

```text
.ai/project-knowledge/index.json
```

The index is gitignored because it is derived from repository sources and should be regenerated after documentation,
source, or config changes.

## Indexed Sources

The allowlist includes:

- `AGENTS.md`.
- `.ai/ai-sdlc/**/*.md`.
- `.ai/project-map/**/*.md` and `.ai/project-map/modules.yaml`.
- Selected package and app config files.
- `apps/web/src`.
- `packages/shared/src`.
- `packages/data`.

The tool denies known generated, dependency, secret, cache, lockfile, and environment paths. It also runs a conservative
secret-signal scan before indexing each allowed file.

## Usage Rules

- Use retrieval results as context, not automatic truth.
- Treat accepted ADRs and `AGENTS.md` as higher authority than ordinary docs.
- Verify important behavior in source files before implementing.
- Rebuild the index after relevant docs, code, config, or project-map changes.
- Do not add secrets, credentials, private prompts, or sensitive personal data to indexed sources.
