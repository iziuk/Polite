# Security Review: Local Project Knowledge Retrieval

## Metadata

- Feature/change: Local project knowledge retrieval.
- Reviewer: AI Security / Privacy Reviewer.
- Risk level: Medium.
- Date: 2026-06-04.

## Checklist

| Check                           | Status | Notes                                                              |
| ------------------------------- | ------ | ------------------------------------------------------------------ |
| Auth impact reviewed            | Pass   | No auth changes.                                                   |
| Authorization impact reviewed   | Pass   | Local CLI only; no new user roles or permissions.                  |
| Input validation reviewed       | Pass   | Search query is local CLI input; index paths are allowlisted.      |
| Output handling reviewed        | Pass   | CLI prints excerpts, source paths, lines, authority metadata.      |
| Secrets reviewed                | Pass   | Denylist and secret-signal scan before indexing.                   |
| Logging reviewed                | Pass   | No secrets logged by design; command output is local.              |
| PII reviewed                    | Pass   | Indexed corpus should not contain sensitive personal data.         |
| Dependency risk reviewed        | Pass   | No new dependencies.                                               |
| Error handling reviewed         | Pass   | Index/search/eval commands exit nonzero on failures.               |
| Negative tests defined          | Pass   | Secret-signal refusal and eval misses fail commands.               |
| AI risks reviewed if applicable | Pass   | Retrieval output is context, not instruction or generated content. |

## Required Fixes

- None for the local repository tooling scope.

## Accepted Risks

- TF-IDF retrieval can miss semantic matches.
- Secret scanning is conservative but not exhaustive.
- Retrieved content still requires source-priority judgment by agents and maintainers.

## Approval

- Approved/rejected/conditional: Approved for local tooling.
- Approver: User request for execution in this thread.
- Conditions: New external providers, sensitive data, production use, or user-facing generated answers require a new ADR
  and human approval.
