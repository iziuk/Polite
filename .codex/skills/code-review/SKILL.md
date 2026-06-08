---
name: code-review
description: Review Polite pull requests or local diffs before merge, using the repository's FSD, Yarn 4, CI/CD, release, localization, QA, and AI SDLC rules. Use when asked to review code, prepare a PR review, validate a diff, or run the manual code-review step required by Polite CI/CD process.
---

# Code Review

Use this skill for manual, free PR review. It does not call an AI API from CI.

## Workflow

1. Read `AGENTS.md`, `.ai/project-map/INDEX.md`, `.ai/project-map/modules.yaml`, and relevant accepted ADRs.
2. Inspect the PR diff or local diff and identify in-scope and out-of-scope changes.
3. Read `references/polite-review-rules.md` for the detailed checklist.
4. Lead with findings, ordered by severity. Include file and line references.
5. If no issues are found, say that clearly and list any verification or residual test gaps.

## Review Priorities

- Blocker: behavior regression, broken build/test, unsafe release/deploy change, security/privacy issue, or architecture rule violation.
- Warning: maintainability, missing verification, incomplete docs, risky process gap, or likely future bug.
- Suggestion: optional simplification with a clear payoff.

## Output Shape

- Findings first.
- Open questions or assumptions second.
- Short summary and verification notes last.
- Do not bury a blocker in a general summary.
