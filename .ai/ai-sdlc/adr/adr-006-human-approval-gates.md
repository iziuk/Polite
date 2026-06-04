# ADR-006: Require Human Approval Gates For High-Risk Work

Status: Accepted

Date: 2026-06-04

Owner: AI Architect

Related work: `.ai/ai-sdlc/quality-gates.md`, `.ai/ai-sdlc/ai-development-policy.md`, `.ai/ai-sdlc/governance.md`

## Context

AI can help move quickly, but some decisions should not be made autonomously. The project needs clear approval gates for
production, sensitive data, security, architecture, legal/business, and AI-generated user-facing outcomes.

## Decision Drivers

- Keep human authority over high-impact decisions.
- Prevent AI from silently accepting risky trade-offs.
- Make approval requirements discoverable before implementation.
- Create an audit trail for accepted risks.

## Decision

Human approval is required before:

- Production deploys.
- Secret changes.
- Auth or authorization changes.
- Payment, pricing, legal, or monetization changes.
- Storing, exposing, or transmitting sensitive personal data.
- Accepting high security, privacy, compliance, product, or operational risk.
- Accepting or reversing major architecture decisions.
- Introducing backend, database, infrastructure, deployment, or major dependency changes.
- Shipping AI-generated user-facing content.
- Implementing AI provider, model, RAG, embedding, or prompt architecture decisions that affect users, sensitive data, or
  production workflows.

## Alternatives Considered

### Full AI Autonomy

Pros:

- Faster execution.
- Fewer interruptions.

Cons:

- Unsafe for high-risk decisions.
- Weak accountability.
- More likely to ship unapproved product or security changes.

### Human Approval For Everything

Pros:

- Maximum control.
- Simple rule.

Cons:

- Too slow for routine work.
- Reduces the value of AI-assisted delivery.

## Consequences

Positive:

- Risk ownership is explicit.
- AI can still act autonomously for low-risk work.
- High-risk work gets human accountability.

Negative or trade-offs:

- Some work pauses until approval is available.
- Agents must identify approval gates early.

## Security And Privacy Impact

Positive impact: sensitive work cannot proceed without review and approval.

## Operational Impact

Release and production-impacting work must include approval status in final handoffs.

## Rollback Or Reversal

Weakening approval gates requires a new ADR and human approval.

## Follow-Ups

- Record accepted high risks in risk register entries.
- Keep approval gates aligned across README, quality gates, AI policy, and governance docs.
