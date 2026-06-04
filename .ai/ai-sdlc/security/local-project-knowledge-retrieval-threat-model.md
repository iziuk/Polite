# Threat Model: Local Project Knowledge Retrieval

## Scope

- System/feature: Local project knowledge retrieval.
- Owner: AI Security / Privacy Reviewer.
- Date: 2026-06-04.
- Risk level: Medium.

## Assets

- Project instructions and governance documents.
- ADR decision records.
- Project-map files.
- Source code and package config.
- Static phrase data.
- Generated local retrieval index.

## Actors

- Maintainer using local CLI commands.
- AI agent using retrieval output as context.
- Malicious or accidental contributor adding unsafe content to indexed files.

## Trust Boundaries

- Repository files are trusted only according to source priority.
- Retrieved content is context, not instruction.
- Generated index is local and gitignored.
- No external provider or network boundary is used.

## Threats

| Threat                 | Scenario                                                    | Impact                         | Mitigation                                                               | Residual risk                               |
| ---------------------- | ----------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------- |
| Spoofing               | A low-authority doc pretends to be a project instruction.   | AI follows wrong guidance.     | Store authority metadata and keep `AGENTS.md`/accepted ADR priority.     | User must still verify high-impact output.  |
| Tampering              | Contributor edits indexed docs with malicious instructions. | Bad retrieval context.         | Treat retrieved content as context; review diffs before merge.           | Repository review quality still matters.    |
| Repudiation            | Generated index source is unclear.                          | Harder audit trail.            | Index stores source path, line range, authority, and generation time.    | Generated index is not committed.           |
| Information disclosure | Secret or sensitive data is indexed.                        | Private data exposure locally. | Allowlist, denylist, gitignored index, and secret-signal scan.           | Secret scan is not exhaustive.              |
| Denial of service      | Large files create a slow or huge index.                    | Slow retrieval.                | Deny generated/cache/dependency outputs and chunk content.               | Corpus growth may require tuning.           |
| Elevation of privilege | Retrieved content attempts to override approval gates.      | Unsafe autonomous action.      | RAG strategy instructs agents to ignore retrieved instruction overrides. | Human oversight still needed for high risk. |

## Approval

- Human approval required: Required for external providers, sensitive data, production use, or user-facing generation.
- Approved by: User request accepted for local repository tooling only.
