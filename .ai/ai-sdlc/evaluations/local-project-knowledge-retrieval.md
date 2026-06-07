# Evaluation Plan: Local Project Knowledge Retrieval

## Scope

- Feature/model/prompt: Local TF-IDF project knowledge retrieval.
- Owner: AI Architect / AI QA Automation.
- Date: 2026-06-04.

## Metrics

| Metric       | Target                           | Measurement                                      |
| ------------ | -------------------------------- | ------------------------------------------------ |
| Correctness  | 100% seed case pass rate         | `npm run knowledge:evaluate` expected-path hits. |
| Groundedness | Results include source paths     | CLI output includes path, line, authority.       |
| Safety       | No denied generated index in git | `git status --ignored .ai/project-knowledge`.    |
| Latency      | Local commands finish in seconds | Manual command timing in verification.           |
| Cost         | Zero provider cost               | No network/API provider used.                    |

## Dataset

Seed cases live in:

```text
.ai/project-knowledge/eval-cases.json
```

Current coverage:

- ADR/RAG policy retrieval.
- ADR storage retrieval.
- Post-task push policy retrieval.
- FSD boundary retrieval.
- Static phrase-pack data-source retrieval.
- Local project-knowledge retrieval implementation retrieval.

## Test Cases

Run:

```bash
npm run knowledge:index
npm run knowledge:search -- "automated RAG approval gates" --limit 5
npm run knowledge:evaluate
```

## Regression Policy

Run `npm run knowledge:evaluate` after:

- ADR or RAG strategy changes.
- Project-map structure changes.
- Indexing allowlist or denylist changes.
- Retrieval algorithm changes.
- Major documentation additions.

Add eval cases when new authoritative documentation areas are created.

## Human Review

Human review is required if retrieval starts indexing sensitive sources, user documents, private prompts, external
providers, or production data.

## Release Criteria

- Index command succeeds.
- Search command returns source paths and authority metadata.
- Evaluation passes all seed cases.
- Generated index remains gitignored.
- Security review has no blocking findings.
