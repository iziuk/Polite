## 2026-06-04

Changed files:

- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/routes.md
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> initial map
- modules.yaml -> initial module inventory
- routes.md -> initial route inventory
- data-flow.md -> initial phrase browser flow
- decisions.md -> initial architecture decisions

Notes:

- Full bootstrap because `.ai/project-map/INDEX.md` did not exist.

## 2026-06-04

Changed files:

- apps/web/src/app/page.tsx
- apps/web/src/app/layout.tsx
- apps/web/src/widgets/phrase-browser/\*\*
- apps/web/src/entities/phrase/\*\*
- apps/web/src/shared/\*\*
- packages/shared/src/\*\*
- apps/web/tsconfig.json
- apps/web/next.config.mjs
- apps/web/eslint.config.mjs
- apps/web/tailwind.config.js
- apps/web/postcss.config.mjs
- apps/web/package.json
- package.json
- turbo.json
- .gitignore

Updated map files:

- INDEX.md -> FSD architecture snapshot and lookup table
- modules.yaml -> new app/widget/entity/shared/config modules
- routes.md -> moved route files under `apps/web/src/app`
- data-flow.md -> phrase entity/widget/shared helper flow
- decisions.md -> FSD, public API, i18n, and React 19 typing decisions

Notes:

- Incremental update after adapting the MVP implementation toward `AGENTS.md` conventions.
- Verification passed with `npm run lint`, `npm run build`, and targeted Prettier check.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/\*\*
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> AI SDLC operating model lookup and main-flow note
- modules.yaml -> new ai-sdlc-operating-model entry
- data-flow.md -> AI SDLC delivery flow
- decisions.md -> managed AI fullstack team operating decision

Notes:

- Added project-level AI SDLC process, role playbooks, QA strategy, release guidance, security/risk guidance, and reusable templates.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- decisions.md -> Polite branch prefix and no-worktree convention

Notes:

- Added project convention to create normal work branches from `main` with the `polite/` prefix by default.
- Confirmed git worktrees should only be created on explicit user request.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/\*\*
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> expanded AI SDLC lookup table and main-flow coverage
- modules.yaml -> expanded ai-sdlc-operating-model key files and public API
- data-flow.md -> coverage matrix and artifact flow in AI SDLC delivery
- decisions.md -> comprehensive AI SDLC artifact and template convention

Notes:

- Expanded AI SDLC from a lightweight skeleton into a comprehensive managed fullstack team operating system.
- Added coverage matrix, product/business docs, business analysis docs, architecture docs, engineering docs, AI development policy, governance, responsibility matrix, expanded QA, DevOps, security/risk playbooks, and broad artifact templates.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/governance.md
- .ai/project-map/modules.yaml
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- modules.yaml -> ai-sdlc-operating-model public API includes commit message drafting convention
- decisions.md -> commit messages use the global draft-commit-message skill

Notes:

- Added project convention to always use `draft-commit-message` before drafting commit messages or preparing commits.
- routes.md, INDEX.md, and data-flow.md checked; no updates required for this convention-only change.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/README.md
- .ai/ai-sdlc/coverage-matrix.md
- .ai/ai-sdlc/workflow.md
- .ai/ai-sdlc/architecture.md
- .ai/ai-sdlc/adr.md
- .ai/ai-sdlc/adr/\*\*
- .ai/ai-sdlc/rag-strategy.md
- .ai/ai-sdlc/ai-development-policy.md
- .ai/ai-sdlc/governance.md
- .ai/ai-sdlc/quality-gates.md
- .ai/ai-sdlc/responsibility-matrix.md
- .ai/ai-sdlc/roles.md
- .ai/ai-sdlc/security-risk.md
- .ai/ai-sdlc/templates/rag-strategy.md
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> ADR and RAG lookup entries plus AI SDLC main-flow decision retrieval
- modules.yaml -> ai-sdlc-operating-model key files and public API for ADR/RAG
- data-flow.md -> AI SDLC delivery flow includes ADR records and RAG/source-priority policy
- decisions.md -> ADR operating policy and RAG-ready project knowledge strategy

Notes:

- Added full ADR operating policy, ADR index, seven baseline accepted ADRs, RAG/project knowledge strategy, and a RAG strategy template.
- Wired ADR/RAG responsibilities into AI SDLC README, coverage, workflow, quality gates, AI policy, governance, roles, responsibility matrix, architecture, and security/risk docs.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/README.md
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> known decision for automatic post-task push policy
- modules.yaml -> ai-sdlc-operating-model public API includes post-task push policy
- decisions.md -> post-task push convention

Notes:

- Added future instruction that completed and verified tasks should be committed and pushed automatically.
- If readiness, scope, verification, safety, approval, or repository state is uncertain, agents must ask before pushing.
- routes.md and data-flow.md checked; no route or data-flow changes required.

## 2026-06-04

Changed files:

- package.json
- .gitignore
- .ai/tools/project-knowledge/\*\*
- .ai/project-knowledge/README.md
- .ai/project-knowledge/eval-cases.json
- .ai/ai-sdlc/README.md
- .ai/ai-sdlc/coverage-matrix.md
- .ai/ai-sdlc/architecture.md
- .ai/ai-sdlc/rag-strategy.md
- .ai/ai-sdlc/adr.md
- .ai/ai-sdlc/adr/README.md
- .ai/ai-sdlc/adr/adr-008-local-project-knowledge-retrieval.md
- .ai/ai-sdlc/ai-features/local-project-knowledge-retrieval.md
- .ai/ai-sdlc/evaluations/local-project-knowledge-retrieval.md
- .ai/ai-sdlc/security/local-project-knowledge-retrieval-threat-model.md
- .ai/ai-sdlc/security/local-project-knowledge-retrieval-review.md
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> local project-knowledge retrieval lookup and known decision
- modules.yaml -> project-knowledge-retrieval module plus npm knowledge scripts
- data-flow.md -> local retrieval indexing/search/eval flow
- decisions.md -> local project knowledge retrieval decision

Notes:

- Implemented local project-knowledge retrieval with Node built-ins, allowlisted corpus, denylist, secret-signal scan,
  markdown/line chunking, TF-IDF vectors, cosine search, generated gitignored index, search CLI, and eval CLI.
- Added ADR-008, AI feature spec, evaluation plan, threat model, and security review.
- Verified local retrieval with `npm run knowledge:index`, `npm run knowledge:search`, and `npm run knowledge:evaluate`
  passing 6/6 seed cases.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- .ai/ai-sdlc/completeness-audit.md
- .ai/ai-sdlc/templates/team-completeness-audit.md
- .ai/project-knowledge/eval-cases.json
- .ai/ai-sdlc/README.md
- .ai/ai-sdlc/coverage-matrix.md
- .ai/ai-sdlc/governance.md
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> AI team completeness lookup and known decision
- modules.yaml -> ai-sdlc-operating-model key files and public API include completeness audit
- decisions.md -> fullstack team completeness verdict

Notes:

- Audited managed AI fullstack team completeness against owner/input/output/gate/evidence, RACI, artifacts, gates,
  Definition of Done, feature simulation, and red flags.
- Verdict: substantially complete operational baseline with no obvious ownerless lifecycle responsibility.
- Added reusable `team-completeness-audit.md` template for future audits.
- Added a project-knowledge retrieval eval case for the completeness audit.
- routes.md and data-flow.md checked; no route or flow changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/README.md
- .ai/ai-sdlc/governance.md
- .ai/project-knowledge/eval-cases.json
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> branch-per-task known decision
- modules.yaml -> ai-sdlc-operating-model public API includes branch-per-task policy
- data-flow.md -> AI SDLC delivery flow includes dedicated task branch
- decisions.md -> branch-per-task workflow convention

Notes:

- Documented that every new task starts on a new dedicated `polite/` branch.
- Existing branches are reused only for clear continuations, fixes, or follow-ups for the same task or PR.
- If task boundaries are unclear, agents must ask before branching, committing, or pushing.
- Added a project-knowledge retrieval eval case for the task branch policy.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- .ai/ai-sdlc/README.md
- .ai/ai-sdlc/coverage-matrix.md
- .ai/ai-sdlc/workflow.md
- .ai/ai-sdlc/ai-development-policy.md
- .ai/ai-sdlc/engineering.md
- .ai/ai-sdlc/roles.md
- .ai/ai-sdlc/responsibility-matrix.md
- .ai/ai-sdlc/quality-gates.md
- .ai/ai-sdlc/governance.md
- .ai/ai-sdlc/completeness-audit.md
- .ai/ai-sdlc/templates/pr-checklist.md
- .ai/ai-sdlc/templates/team-completeness-audit.md
- AGENTS.md
- .ai/project-knowledge/eval-cases.json
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> PR review lookup and known decision
- modules.yaml -> ai-sdlc-operating-model public API includes PR reviewer/gate; project-knowledge-retrieval checked
- data-flow.md -> AI SDLC delivery flow includes pull request review after automated verification
- decisions.md -> pull request review role decision

Notes:

- Added AI PR Reviewer as the explicit owner for pull request/code review.
- Added Pull Request Review Stage/Gate after automated verification and before manual QA/final handoff.
- Updated RACI, PR checklist, governance, and completeness audit coverage.
- Added a project-knowledge retrieval eval case for the PR review role/gate.
- routes.md checked; no route changes required.

## 2026-06-04

Changed files:

- AGENTS.md
- .ai/ai-sdlc/README.md
- .ai/ai-sdlc/coverage-matrix.md
- .ai/ai-sdlc/workflow.md
- .ai/ai-sdlc/ai-development-policy.md
- .ai/ai-sdlc/engineering.md
- .ai/ai-sdlc/roles.md
- .ai/ai-sdlc/responsibility-matrix.md
- .ai/ai-sdlc/quality-gates.md
- .ai/ai-sdlc/governance.md
- .ai/ai-sdlc/completeness-audit.md
- .ai/ai-sdlc/templates/pr-checklist.md
- .ai/ai-sdlc/templates/team-completeness-audit.md
- .ai/project-knowledge/eval-cases.json
- .ai/project-map/INDEX.md
- .ai/project-map/modules.yaml
- .ai/project-map/data-flow.md
- .ai/project-map/decisions.md
- .ai/project-map/update-log.md

Updated map files:

- INDEX.md -> pull request lifecycle lookup and known decision
- modules.yaml -> ai-sdlc-operating-model public API includes PR owner/reviewer lifecycle gates
- data-flow.md -> AI SDLC delivery flow includes PR create, review, and merge
- decisions.md -> pull request lifecycle decision

Notes:

- Added AI PR Owner as the explicit owner for pull request creation/update and merge.
- Split pull request lifecycle into creation, review, and merge workflow stages/gates.
- Updated RACI, governance, PR checklist, completeness audit, and retrieval evals for PR create/review/merge.
- routes.md checked; no route changes required.
