# Data Flow

Last verified: 2026-06-04

## Phrase Browser

```mermaid
flowchart TD
  Data["packages/data/*.json"] --> Entity["apps/web/src/entities/phrase"]
  Entity --> Widget["apps/web/src/widgets/phrase-browser"]
  I18n["apps/web/src/shared/core/i18n"] --> Widget
  Ui["apps/web/src/shared/ui"] --> Widget
  Widget --> Card["PhraseCard"]
  Card --> BrowserFacade["apps/web/src/shared/lib/browser"]
  BrowserFacade --> SharedHelpers["packages/shared/src/lib"]
  SharedHelpers --> Speech["Web Speech API"]
  SharedHelpers --> Clipboard["Clipboard API"]
```

## State Ownership

- `PhraseBrowser` owns selected pack, search query, and large text mode.
- `filterPhrases` is a pure local helper in the phrase browser widget.
- `PhraseCard` owns only per-card reply expansion state.
- Shared UI primitives are stateless wrappers around native elements.

## Copy And Content

- UI copy lives in `apps/web/src/shared/core/i18n/translations/en.json`.
- Phrase pack domain content stays in `packages/data/*.json`.
- Phrase interfaces are exported from `packages/shared/src/types` and re-exposed through the phrase entity public API.

## External APIs

- Web Speech API is guarded in `packages/shared/src/lib/speech.ts`.
- Clipboard API is guarded in `packages/shared/src/lib/clipboard.ts`.
- No backend API or TanStack Query usage exists yet.

## AI SDLC Delivery Flow

```mermaid
flowchart TD
  Request["User request"] --> Agents["AGENTS.md"]
  Agents --> Map["project-cartographer map read"]
  Agents --> OperatingModel[".ai/ai-sdlc operating model"]
  OperatingModel --> Coverage["coverage-matrix.md"]
  OperatingModel --> ADRs["ADR policy and accepted decision records"]
  OperatingModel --> Retrieval["RAG/source-priority strategy"]
  Coverage --> Artifacts["Product, BA, architecture, engineering, QA, DevOps, security, governance artifacts"]
  ADRs --> Artifacts
  Retrieval --> Artifacts
  Artifacts --> Roles["Role reviews: PO, BA, Architect, Dev, QA, DevOps, Security"]
  Roles --> Gates["Quality gates and human approval checks"]
  Gates --> Implementation["Scoped implementation"]
  Implementation --> Verification["Automated and manual verification"]
  Verification --> Docs["Docs, ADRs, release notes, and project-map updates"]
```

- Small low-risk fixes can use the lightweight path documented in `.ai/ai-sdlc/README.md`.
- Context retrieval follows `.ai/ai-sdlc/rag-strategy.md`; accepted ADRs in `.ai/ai-sdlc/adr/` constrain architecture
  decisions.
- High-risk work keeps the relevant role reviews, artifacts, gates, QA strategy, security review, release readiness,
  rollback plan, and human approvals explicit.
