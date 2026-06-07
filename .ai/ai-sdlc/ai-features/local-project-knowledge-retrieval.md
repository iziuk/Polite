# AI Feature Specification: Local Project Knowledge Retrieval

## Metadata

- Feature: Local project knowledge retrieval.
- Owner: AI Architect.
- Model/provider: Local TF-IDF vectors with cosine similarity; no external AI provider.
- Risk level: Medium.
- Human approval required: Covered by user request on 2026-06-04 for local non-production retrieval.

## Use Case

AI agents and maintainers need a repeatable way to retrieve relevant project context from Polite documentation, ADRs,
project-map files, source files, package config, and phrase data before answering or implementing.

## User Value

- Faster task orientation.
- More consistent source grounding.
- Easier ADR and policy discovery.
- Lower chance of stale or hallucinated context.
- Evaluation baseline for future RAG changes.

## Data Sources

- `AGENTS.md`.
- `.ai/ai-sdlc/**/*.md`.
- `.ai/project-map/**/*.md`.
- `.ai/project-map/modules.yaml`.
- `.ai/project-knowledge/README.md`.
- `.ai/project-knowledge/eval-cases.json`.
- Root and app package/config files.
- `apps/web/src`.
- `packages/shared/src`.
- `packages/data`.

## Privacy Classification

- Current indexed corpus: internal project documentation, source, config, and static phrase data.
- Sensitive data: not expected.
- Generated index: local derived artifact, gitignored.

## Prompt Or Retrieval Strategy

The retrieval strategy is local and deterministic:

- Allowlist approved corpus paths.
- Deny secrets, environment files, dependency/cache/build output, generated indexes, lockfiles, keys, certificates, and logs.
- Scan file content for strong secret-like signals before indexing.
- Chunk markdown by headings and other files by line ranges.
- Store source metadata and authority levels.
- Build local TF-IDF vectors.
- Rank query matches by cosine similarity.

No generation prompt is used. Search results are context for an AI or human, not authoritative answers by themselves.

## Evaluation

- Eval dataset: `.ai/project-knowledge/eval-cases.json`.
- Quality metrics: expected-path recall in top 8 results.
- Safety tests: secret-like content refusal during index build; generated index ignored by git.
- Regression evals: `npm run knowledge:evaluate`.

## Failure Modes

- Retrieval misses relevant sources because TF-IDF is lexical.
- Search returns generic templates above more specific policy docs.
- Generated index becomes stale.
- Secret scanner can produce false positives or miss unknown secret formats.
- Users may treat retrieval output as final truth instead of context.

## Human Fallback

Humans and AI agents can still read source files directly with the project-map workflow. Accepted ADRs, `AGENTS.md`, and
source files remain higher authority than search results.

## Cost And Latency Limits

- Provider cost: zero.
- Network calls: none.
- Expected latency: index/search should run locally within seconds for current repository size.

## Monitoring

- Local command output reports file and chunk counts.
- Evaluation reports pass/fail case status.
- Generated index metadata includes generation timestamp and retrieval model.

## Rollback Or Disable Path

Remove npm knowledge scripts, `.ai/tools/project-knowledge`, `.ai/project-knowledge`, and the generated index.

## Approval

- Approver: User request in this thread.
- Status: Accepted for local repository tooling.
