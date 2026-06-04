# Security, Privacy, And AI Risk

Security review should be proportional to risk. Low-risk documentation changes need a quick check; auth, privacy,
infrastructure, production, and AI-enabled features need explicit review and human approval.

## Security Goals

- Prevent unauthorized access.
- Protect sensitive and personal data.
- Avoid leaking secrets.
- Validate untrusted input.
- Keep logs safe.
- Preserve secure defaults.
- Make high-risk decisions explicit and approved.

## Risk Levels

Low:

- Local docs, copy, or small refactors with no sensitive behavior.

Medium:

- User-flow changes.
- Public API changes.
- Data processing.
- New dependency.
- New user input.
- Logging changes.

High:

- Auth or authorization.
- Payments.
- Secrets.
- Infrastructure.
- Production deploy.
- Sensitive personal data.
- AI features affecting user decisions.
- Legal, financial, medical, or safety-sensitive content.

High risk requires mitigation or human approval.

## Security Requirements

Define security requirements before high-risk implementation.

Categories:

- Authentication.
- Authorization.
- Session handling.
- Input validation.
- Output encoding.
- Rate limiting.
- Encryption.
- Secret handling.
- Audit logging.
- Error handling.
- Dependency security.

Use `templates/security-requirements.md`.

## Threat Model

Create a threat model when work introduces:

- User accounts.
- Sensitive data.
- Public APIs.
- File upload.
- Admin or privileged functions.
- External integrations.
- AI prompt or retrieval pipelines.
- Embedding stores, vector databases, or automated RAG indexes.

Threat model questions:

- What assets need protection?
- Who are the actors?
- What can an attacker control?
- What trust boundaries exist?
- What can be spoofed, tampered, leaked, denied, or escalated?
- What mitigations exist?
- What residual risks need approval?

Use `templates/threat-model.md`.

## OWASP Baseline

For web/API work, review:

- Broken access control.
- Cryptographic failures.
- Injection.
- Insecure design.
- Security misconfiguration.
- Vulnerable dependencies.
- Authentication failures.
- Software and data integrity failures.
- Logging and monitoring failures.
- Server-side request forgery when applicable.

Use `templates/owasp-checklist.md`.

## Access Control Matrix

Before roles or permissions are added:

- Define actors.
- Define resources.
- Define allowed actions.
- Define ownership rules.
- Define admin or support capabilities.
- Define denied cases.
- Test unauthorized and forbidden paths.

Use `templates/access-control-matrix.md`.

## Privacy And PII Policy

Before handling personal data:

- Define data categories.
- Define purpose.
- Minimize collection.
- Define retention.
- Define access.
- Define deletion/export needs when applicable.
- Avoid sensitive logs.
- Confirm human approval.

Use `templates/privacy-pii-policy.md`.

## Secure Coding Guidelines

Input:

- Validate all external input.
- Treat route params, query params, request bodies, headers, cookies, file data, and AI outputs as untrusted.

Output:

- Avoid exposing internals.
- Escape or encode where relevant.
- Localize user-facing errors.

Secrets:

- Use environment variables or secret stores.
- Never commit or log secrets.
- Rotate after exposure.

Logging:

- Log enough for debugging.
- Do not log secrets, tokens, private prompts, or sensitive PII.

Dependencies:

- Add dependencies only after review.
- Watch for maintenance, license, and security risk.

## AI-Specific Risks

For AI-enabled features, review:

- Prompt injection.
- Instruction override.
- Data leakage through prompts, logs, embeddings, or retrieved context.
- Indexing secrets, sensitive personal data, or private prompts.
- Retrieving stale, superseded, or untrusted context.
- Retrieved content overriding project instructions or human approval gates.
- Hallucinated or unsupported output.
- Unsafe or biased output.
- Cost spikes.
- Latency.
- Model/provider dependency.
- Missing human fallback.
- Missing evals.

AI feature release requirements:

- Defined use case.
- Data classification.
- Evals.
- Red-team or safety tests.
- Human fallback for risky outcomes.
- Monitoring.
- Disable or rollback path.

Use `.ai/ai-sdlc/rag-strategy.md` for source priority, denied sources, prompt-injection controls, future RAG metadata,
and retrieval evaluation rules.

## Security Review Checklist

Before release of sensitive work:

- Risk level assigned.
- Threat model complete when required.
- Access control reviewed.
- PII reviewed.
- Secrets reviewed.
- Logging reviewed.
- Error handling reviewed.
- Dependencies reviewed.
- Tests include negative cases.
- Human approval captured when high risk.

Use `templates/security-review-checklist.md`.

## Risk Register

Track risks that are:

- Medium or high.
- Accepted instead of fully mitigated.
- Likely to recur.
- Dependent on human follow-up.

Use `templates/risk-register-entry.md`.

## Security Done Criteria

Security review is done when:

- Relevant checklist is complete.
- Required mitigations are implemented or tracked.
- High risks are approved by a human.
- Residual risk is documented in the final handoff.
