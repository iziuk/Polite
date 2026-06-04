# Polite

## Stack

- Next.js 16 · React 19 · TypeScript (strict) · Feature-Sliced Design (FSD) · TanStack Query
- ESLint 9 (flat config) · Prettier · yarn

## Project Cartographer

Before implementing any task in this project, use the global `project-cartographer` skill.

Read these project-map files first:

```text
.ai/project-map/INDEX.md
.ai/project-map/modules.yaml
```

Use the map's `paths` and `key_files` to navigate directly to relevant modules. Avoid broad repository searches when the
map already points to the right area.

After implementation, follow the skill's incremental update workflow: inspect changed files, update only affected
project-map sections, and append a concise entry to `.ai/project-map/update-log.md`.

## AI SDLC Managed Fullstack Team

For non-trivial product, engineering, QA, DevOps, security, or release work, use the operating model in
`.ai/ai-sdlc/README.md`.

Before implementation, right-size the workflow:

- Small, low-risk fixes may use the lightweight path from `.ai/ai-sdlc/README.md`.
- For non-trivial work, check `.ai/ai-sdlc/coverage-matrix.md` first and identify which documentation areas apply.
- New features, architecture changes, integrations, sensitive data, auth, infrastructure, or release work must pass the
  relevant stages in `.ai/ai-sdlc/workflow.md` and `.ai/ai-sdlc/quality-gates.md`.
- Simulate the needed role reviews from `.ai/ai-sdlc/roles.md`: Product Owner, Business Analyst, Architect, Developer,
  PR Reviewer, QA Manual, QA Automation, DevOps/SRE, and Security/Privacy Reviewer.
- For architecture decisions, use `.ai/ai-sdlc/adr.md` and accepted records in `.ai/ai-sdlc/adr/`; create or update an
  ADR when the ADR policy triggers, and treat accepted ADRs as constraints.
- For AI context retrieval, project knowledge management, or future RAG work, use `.ai/ai-sdlc/rag-strategy.md`. Current
  project posture is RAG-ready manual retrieval; automated RAG requires ADR, eval, security/privacy, rollback, and human
  approval gates when applicable.
- Use `.ai/ai-sdlc/qa-manual.md` and `.ai/ai-sdlc/qa-automation.md` to choose manual and automated verification.
- Use `.ai/ai-sdlc/templates/` for required artifacts such as feature briefs, BRDs, ADRs, RFCs, test plans, release
  checklists, threat models, privacy policies, incident runbooks, and postmortems.
- Require human approval for gates listed in `.ai/ai-sdlc/README.md`, especially production deploys, sensitive data,
  auth, payments, security exceptions, and major architecture decisions.

## Git Branches

Every new task must start on a new dedicated branch. Do not continue unrelated new work on an existing task branch.

For this project, create new work branches from `main` with the `polite/` prefix by default, for example
`polite/ai-sdlc-fullstack-team`, unless the user explicitly requests another prefix.

Use the current branch only when the request is clearly a continuation of the same task or PR. If it is unclear whether
the request is a new task or a continuation, ask the user before branching, committing, or pushing.

Do not create git worktrees unless the user explicitly asks for a worktree.

## Post-Task Push Policy

After a task is completed and verified, commit and push the finished changes without waiting for an extra instruction.
If readiness, scope, verification, safety, approval, or repository state is uncertain, do not push silently; stop and ask
the user before pushing.

## Commit Message Drafting

Always use the global `draft-commit-message` skill before drafting commit messages or preparing commits. Inspect the
current git state with that skill's workflow, separate in-scope and out-of-scope changes, and draft a Conventional Commit
message without scopes unless the user explicitly requests otherwise.

## Architecture — Feature-Sliced Design

This project follows Feature-Sliced Design. All code lives under `src/` in FSD layers.

### Layers (top → bottom)

| Layer      | Can import from                            |
| ---------- | ------------------------------------------ |
| `app`      | pages, widgets, features, entities, shared |
| `pages`    | widgets, features, entities, shared        |
| `widgets`  | features, entities, shared                 |
| `features` | entities, shared                           |
| `entities` | shared                                     |
| `shared`   | shared only                                |

**Importing from a higher layer is forbidden.** This is enforced by `eslint-plugin-boundaries`.

### Path aliases

Always use FSD path aliases — never relative paths that cross layer boundaries:

```ts
// ✅ Correct — importing through public API
import { Button } from "@shared/ui";
import { useAuth } from "@features/auth";

// ❌ Wrong — bypasses public API
import { useAuth } from "@features/auth/hooks";
```

Available aliases: `@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`

### Public API rule

Import from a module's public API (`index.ts`), never from internal files:

```ts
// ✅ Correct
import { formatDate } from "@shared/lib/date";

// ❌ Wrong — bypasses public API
import { formatDate } from "@shared/lib/date/utils/formatDate";
```

Exception: `**/next/**` deep imports are allowed.

### Cross-slice isolation

A slice may not import from a sibling slice at the same layer:

```ts
// ❌ Wrong — cross-slice import within the same layer
import { PaymentForm } from "@features/payment"; // inside @features/auth
import { ProductCard } from "@entities/product"; // inside @entities/user
```

Exception: `shared` has no slices and is exempt from this rule.

### Within-slice segment imports

Inside a slice, cross-segment imports must use relative paths, not layer aliases:

```ts
// ✅ Correct — relative path inside the slice
import { selectUser } from "../model/selectors";

// ❌ Wrong — alias bypasses slice boundary
import { selectUser } from "@features/auth/model/selectors";
```

Segment dependency direction within a slice (no upward imports):

| Segment  | Can import from                 |
| -------- | ------------------------------- |
| `ui`     | `model`, `api`, `lib`, `config` |
| `model`  | `api`, `lib`, `config`          |
| `api`    | `lib`, `config`                 |
| `lib`    | `config`                        |
| `config` | —                               |

### `shared` layer structure

`shared` contains only segments (`ui`, `api`, `lib`, `config`, `types`) — no business slices. External consumers import
through segment public API (max 3 segments):

```ts
// ✅ Correct — segment public API
import { Button } from "@shared/ui";
import { apiClient } from "@shared/core/api";

// ❌ Wrong — too deep into segment internals
import { Button } from "@shared/ui/button/button";
import type { IMfaOption } from "@shared/core/api/auth";
```

### FSD import depth

Import depth for FSD aliases depends on the layer:

- **Sliced layers** (`@app`, `@pages`, `@widgets`, `@features`, `@entities`) — import only from the **slice root** (
  public API). Maximum depth: **2 segments** (`@layer/slice`).
- **`@shared`** — no slices, divided into segments. Import through **segment public API**. Maximum depth: **3 segments
  ** (`@shared/segment/sub-segment`).

```ts
// ✅ Correct
import { LoginForm } from "@widgets/auth";
import { useAuth } from "@features/auth";
import { apiClient } from "@shared/core/api";
import { Button } from "@shared/ui";

// ❌ Wrong — too deep
import { LoginForm } from "@widgets/auth/login-form/ui/login-form";
import { useAuth } from "@features/auth/hooks";
import type { IMfaOption } from "@shared/core/api/auth";
```

---

## Engineering Principles

### Healthy refactoring

- Refactoring must preserve behavior unless the task explicitly asks for a behavior change.
- Do not make changes for their own sake. Each refactor must remove real duplication, reduce meaningful complexity,
  improve ownership boundaries, or fix a concrete runtime/build/test issue.
- Prefer small cohesive moves over broad rewrites. Keep public props, hook return shapes, API contracts, route behavior,
  and user-visible flows stable.
- Split large files by responsibility, not by arbitrary line count. Good extraction targets are pure helpers,
  DTO/view-model mappers, focused hooks, constants, and isolated UI state handlers.
- Do not create a giant controller hook that only moves a large component body elsewhere. Hooks should own a coherent
  concern such as filters, calendar state, header menu state, or form flow.
- Keep TODO/mock/demo code centralized and ticketed; remove or narrow it when the real API/store contract lands.

### SOLID / DRY / KISS

- Single Responsibility: keep API transport, server-state hooks, DTO mappers, UI state, and rendering separate where
  that separation reduces complexity.
- Dependency Inversion: reusable API services and reusable pure helpers belong in `polite-ts-lib`; `polite-web` wires
  runtime dependencies and owns UI-specific mapping/rendering.
- Open/Closed: when conditional rendering or behavior branches grow repeatedly, prefer a registry/strategy table over
  extending a long branching function.
- DRY: check for duplicated hooks, request patterns, styled blocks, DTO/types/constants, mock/demo flows, repeated JSX
  structures, and copied helper functions before adding new code.
- KISS: choose the simplest local abstraction that solves the current problem. Do not introduce a pattern, provider,
  store, or package unless it has a clear maintenance payoff.

### Reusable code ownership

- Reusable backend API endpoints, DTOs, service implementations, and API context contracts live in
  `polite-ts-lib/src/shared/core/*`.
- Reusable pure helpers that can be shared by web and mobile live in `polite-ts-lib/src/shared/lib/*` and are consumed
  through `@polite/ts-lib/shared`.
- `polite-web/src/shared/lib` may keep compatibility barrels/wrappers for existing imports, but new cross-platform
  helper implementation should start in `polite-ts-lib`.
- Keep UI/framework-specific helpers in `polite-web`: React hooks, DOM logic, Next.js routing, MUI styling, view-model
  mapping, shell behavior, and component layout helpers.
- Services in `polite-ts-lib` must stay UI-agnostic and must not create browser/mobile singletons. Consumers provide
  `ApiClient`, token/runtime config, and `IpoliteApiContext`.
- Keep backend identifiers that can exceed `Number.MAX_SAFE_INTEGER` as strings end-to-end. Never coerce 64-bit API ids
  with `Number()`.

### State management

- Server state belongs in TanStack Query. Do not reintroduce duplicated `useState + useEffect + AbortController` request
  loops for reusable API data.
- `polite-web` owns the app-level QueryClient, query defaults, feature hooks, error normalization, and DTO-to-view-model
  mapping.
- Do not add Redux, MobX, or Zustand by default. Consider Zustand only when cross-view client UI state becomes too broad
  for local state/context.
- Client UI state should stay as local component state, focused hooks, reducers/state machines for complex transitions,
  or scoped context when shared by a composed area.

### Patterns

- Use patterns only when they clarify ownership or reduce complexity. Do not add factories, strategies, reducers, or
  providers as ceremony.
- Preferred existing patterns: Adapter (`@shared/ui` over MUI), Facade/Public API (FSD barrels), Service (
  `polite-ts-lib` API services), Mapper (DTO to UI/domain model), Context (app shell state), Reducer/state machine (
  multi-step auth/MFA flows).
- For complex UI workflows, prefer a focused reducer/state machine over scattered booleans when transitions become hard
  to reason about.

---

## TypeScript

TypeScript is in **strict mode**. Key rules:

- **No `any`** — use `unknown`, generics, or proper types. `no-explicit-any` is an error.
- **No unused variables** — prefix intentionally unused vars with `_` (e.g., `_unused`, `_err`). `...rest` siblings are
  allowed.
- **No floating Promises** — every Promise must be `await`ed, `.then()`ed, or `.catch()`ed. Critical for Server Actions.
- **No variable shadowing** — no reusing names in inner/outer scope.
- **Define before use** — no forward references.
- **No empty interfaces** — extending a single interface is the exception.
- **No duplicate class members.**
- **No `this` outside class methods** or known contexts.
- **No functions defined inside loops** that reference loop variables.
- **All source files must be `.ts` / `.tsx`** — `allowJs` is false.
- Each file must be independently transpilable (`isolatedModules: true`).

### Unsafe `any` usage (currently warn, will become error)

These are warnings today — write new code as if they are errors:

- `no-unsafe-member-access` — don't access properties on `any`
- `no-unsafe-assignment` — don't assign `any` to a typed variable
- `no-unsafe-argument` — don't pass `any` as a typed parameter
- `no-unsafe-call` — don't call `any` as a function
- `no-unsafe-return` — don't return `any` from a typed function
- `no-misused-promises` — don't use async functions where sync is expected
- `unbound-method` — don't lose `this` binding on class methods
- `restrict-template-expressions` — only strings in template literals
- `restrict-plus-operands` — `+` only with compatible types
- `no-unnecessary-type-assertion` — don't add redundant `as Type`
- `no-useless-constructor` — don't write constructors that only call `super()`
- `explicit-module-boundary-types` — exported functions should have explicit return types
- `explicit-member-accessibility` — class members should have `public`/`private`/`protected`

---

## Formatting (Prettier)

Prettier is the **single source of truth** for formatting. Never use ESLint for formatting concerns.

| Setting           | Value                                         |
| ----------------- | --------------------------------------------- |
| `printWidth`      | 160                                           |
| `tabWidth`        | 2 (spaces, no tabs)                           |
| `semi`            | always                                        |
| `quotes`          | double quotes (`"`)                           |
| `trailingComma`   | all positions                                 |
| `bracketSpacing`  | `{ foo }` not `{foo}`                         |
| `bracketSameLine` | JSX closing bracket on same line as last prop |
| `arrowParens`     | always — `(x) => x`                           |
| `endOfLine`       | `lf` (Unix)                                   |

---

## General JavaScript / TypeScript Rules

### Mock data

- Mock data must be centralized in a clearly named constant, not inlined in JSX or scattered across handlers.
- Mock constants must use the `MOCK_` prefix, for example `MOCK_PROFILE_USER`, `MOCK_USER_PROFILE_DATA`, or
  `MOCK_NAVIGATION`.
- Every mock constant that stands in for a future API/store value must have a ticketed TODO immediately above it:

  ```ts
  // TODO(CA-610): Replace with user profile API data when the endpoint is available.
  const MOCK_USER_PROFILE_DATA = { ... };
  ```

- Do not add TODO comments at every usage site. Mark the mock source once and pass values through props, state, or model
  APIs.
- When the API/store contract becomes available, search for `MOCK_` and `TODO(<ticket>)` and replace the mock source
  with real data.

### Localization

- All user-facing UI copy must be defined in `src/shared/core/i18n/translations/en.json` and rendered through
  `useTranslation()` / `t(...)`.
- This applies to JSX text, button labels, form labels, placeholders, helper text, empty/error/success states, dialog
  copy, tooltips, `title`, `aria-label`, and static navigation labels owned by local UI config.
- Add keys under the matching FSD namespace (`app`, `widgets`, `features`, `entities`, `shared`) and keep key names
  kebab-case.
- Do not hardcode English UI strings in components or UI config objects. Exceptions are non-copy values such as ids,
  enum values, route segments, CSS/data-test values, brand/product names, and backend/API data.
- Mock or demo domain data that stands in for future API data (member names, event titles, tag labels, facility names)
  stays centralized as mock data with the required TODO; do not move backend-owned data into localization unless it is
  static UI copy.
- During reviews or audits, explicitly check JSX text nodes, string props (`label`, `placeholder`, `aria-label`,
  `title`, `helperText`, `tooltip`), and local option/config arrays for untranslated UI copy.

### Enforced (error)

- **`eqeqeq`** — always `===` / `!==`. Exception: `== null` for null/undefined checks.
- **`no-var`** — use `const` / `let`.
- **`prefer-const`** — use `const` when never reassigned.
- **`prefer-template`** — template literals over string concatenation.
- **`no-eval`, `no-implied-eval`, `no-new-func`** — no dynamic code execution.
- **`no-throw-literal`** — only throw `Error` objects.
- **`no-return-await`** — redundant in async functions.
- **`no-await-in-loop`** — use `Promise.all` instead of sequential awaits in loops.
- **`default-case`** — require `default` in switch (or `// no default` comment).
- **`no-constructor-return`** — constructors must not return values.
- **`no-promise-executor-return`** — don't return values from `new Promise((resolve) => ...)`.
- **`prefer-arrow-callback`** — arrow functions for callbacks.
- **`object-shorthand`** — `{ name }` not `{ name: name }`.
- **`no-useless-rename`** — don't rename imports/exports to the same name.
- **`curly`** — braces required for multi-line `if`/`else`/`for`/`while`.
- **`quotes`** — double quotes (single allowed only to avoid escaping).
- **`no-multiple-empty-lines`** — max 1 empty line between code, 0 at start of file.

### Warnings

- **`no-console`** — remove `console.log` before committing.
- **`newline-before-return`** — empty line before `return` statements.
- **`prefer-destructuring`** — prefer `const { x } = obj` over `const x = obj.x`.

### Explicitly allowed

These patterns are permitted and will NOT trigger warnings:

- Parameter reassignment (`no-param-reassign` off)
- `++` / `--` operators
- Nested ternaries
- `else` after `return`
- `for...in` / `for...of` loops
- Implicit `undefined` returns
- `parseInt` without radix

---

## Import Rules

### Import order (enforced)

Imports must follow this group order with blank lines between groups and alphabetical sorting within each group:

```ts
// 1. Type imports
import type { Props } from "...";

// 2. External packages
import React from "react";

// 3. Node built-ins
import path from "node:path";

// 4. Internal (aliases)
import { Button } from "@shared/ui";

// 5. Parent
import { utils } from "../utils";

// 6. Sibling
import { helper } from "./helper";

// 7. Index
import { config } from ".";
```

### File extensions in imports

Never include file extensions — **except** for image assets (`.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.ico`):

```ts
// ✅
import { Button } from "@shared/ui/button";
import Logo from "@shared/assets/logo.svg";
import Hero from "@shared/assets/hero.png";

// ❌
import { Button } from "@shared/ui/Button.tsx";
import Logo from "@shared/assets/logo"; // missing extension on image
```

### Other import rules

- **`import/first`** (error) — all imports at top of file.
- **`import/newline-after-import`** (error) — blank line after last import.
- **`import/export`** (error) — no duplicate or ambiguous exports.
- **`import/no-mutable-exports`** (error) — only export `const`, functions, classes.
- **`no-duplicate-imports`** (error) — one import statement per module. When importing both types and values from the
  same module, use inline `type` modifier instead of a separate `import type` statement:

  ```ts
  // ✅ Correct
  import { type FC, useState } from "react";

  // ❌ Wrong — two statements for the same module
  import type { FC } from "react";
  import { useState } from "react";
  ```

- **`unused-imports/no-unused-imports`** (error) — unused imports are auto-removed.
- **`import/no-cycle`** (warn) — circular dependencies.
- **`import/no-unused-modules`** (warn) — exports not imported anywhere.

---

## Naming Conventions

### File names — kebab-case only

```
✅ user-profile.tsx
✅ use-auth.ts
✅ user-profile.test.tsx
✅ button.stories.tsx
✅ header.module.css

❌ UserProfile.tsx
❌ useAuth.ts
❌ user_profile.tsx
```

Middle extensions (`.test`, `.stories`, `.module`) are allowed. Next.js special files (`page.tsx`, `layout.tsx`,
`loading.tsx`, `error.tsx`, `not-found.tsx`) are already kebab-case.

### Variables

| Type                          | Format                        | Example                                |
| ----------------------------- | ----------------------------- | -------------------------------------- |
| General variable              | camelCase or UPPER_CASE       | `userName`, `MAX_RETRIES`              |
| Function / component variable | camelCase or PascalCase       | `handleClick`, `App`, `UserCard`       |
| Function declaration          | camelCase or PascalCase       | `getUser()`, `UserCard()`              |
| Primitive (string, number)    | strictCamelCase or UPPER_CASE | `baseUrl`, `API_URL`                   |
| Boolean                       | StrictPascalCase with prefix  | `isActive`, `hasPermission`, `canEdit` |

**Boolean prefixes (required):** `is`, `should`, `has`, `can`, `did`, `will`

```ts
// ✅
const isVisible = true;
const hasAccess = false;
const MAX_RETRIES = 3;
const App = () => <div / >;

// ❌
const visible = true;       // missing boolean prefix
const Count = 5;             // PascalCase for primitive
```

### Class members

| Type                    | Format                      | Example                       |
| ----------------------- | --------------------------- | ----------------------------- |
| Public property         | camelCase or PascalCase     | `userName`, `ApiClient`       |
| Public boolean          | prefix `is`/`has`/`can`/... | `isLoading`, `hasError`       |
| Private property/method | leading `_` required        | `_apiClient`, `_fetchUsers()` |
| Private boolean         | `_` + prefix                | `_isVisible`, `_hasCache`     |

### Types, interfaces, enums

| Type        | Format                     | Example                           |
| ----------- | -------------------------- | --------------------------------- |
| Interface   | PascalCase with `I` prefix | `IUserProfile`, `IRequestConfig`  |
| Type alias  | PascalCase with `T` prefix | `TButtonVariant`, `TThemeMode`    |
| Enum name   | PascalCase                 | `UserRole`, `HttpStatus`          |
| Enum member | unrestricted               | `ACTIVE`, `InProgress`, `pending` |

### Parameters and properties

| Type               | Format                               | Example                           |
| ------------------ | ------------------------------------ | --------------------------------- |
| Function parameter | camelCase                            | `userName`, `callback`, `options` |
| Object property    | camelCase, PascalCase, or UPPER_CASE | `apiUrl`, `BaseComponent`         |
| Quoted property    | unrestricted                         | `"Content-Type"`, `"x-api-key"`   |

Callback parameters must use descriptive camelCase names. Do not use one-letter or vague two-letter names such as `c`,
`i`, `x`, `j`, `k`, `el`, or `e` in `.map`, `.filter`, `.find`, `.sort`, event handlers, or render callbacks. Prefer
names like `component`, `item`, `option`, `event`, `layoutItem`, `currentComponent`, and `nextComponent`.

### Imports

No naming restriction — import names follow the original export name from the source module.

---

## React Rules

### Component declaration style

Always declare React components as arrow functions assigned to a `const` with an explicit `FC` type — never as function
declarations:

```tsx
// ✅ Correct
import {type FC} from "react";

export const HomePage: FC = () => { ...
};
export const UserCard: FC<IUserCardProps> = ({name}) => { ...
};

// ❌ Wrong
export function HomePage(): JSX.Element { ...
}

export function UserCard({name}: IUserCardProps): JSX.Element { ...
}
```

**Exception:** Next.js special files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`)
require or conventionally use `export default function` — this is allowed only in those files.

### JSX

- JSX is only allowed in `.tsx` files (error).
- **No `={true}` for boolean props** — write `<Modal visible />` not `<Modal visible={true} />` (error).
- **No useless fragments** — `<>{expr}</>` is fine, empty `<></>` is not (error).
- **No unstable nested components** — define components outside render to prevent remounting (error).
- **No inline context values** — memoize context values to avoid consumer re-renders (warn).
- Prop spreading (`{...props}`) is allowed.
- PropTypes are not required (TypeScript handles this).

### Component file structure

- Keep components split by file.
- Never implement one component inline inside another component file.
- If a UI part is a component or likely to become reusable, place it in its own file.
- Keep component folders structured for future implementation and maintenance.
- Keep styled primitives in adjacent `*.styles.ts` sidecar files. Component `.tsx` files should import styled primitives
  and stay focused on behavior and markup.

### Hooks

- **Rules of Hooks** (error) — hooks must be called at top level, never in conditions/loops.
- **`exhaustive-deps` is OFF** — dependency arrays are managed manually (team decision).

---

## MUI

### Design System Adapter Pattern

`@shared/ui` is the **single source of truth** for all UI components. Every MUI component used across the app must live
there as a named wrapper — this isolates the rest of the codebase from MUI internals and makes future theming,
customization, or library replacement a one-file change.

**Workflow:** need a component → check `@shared/ui` → if missing, add a wrapper there first → import from `@shared/ui`.

Every component directory inside `@shared/ui` must have an `index.ts` that re-exports the component. This is what makes
`import { Button } from "@shared/ui/button"` resolve correctly and keeps the public API intact:

```ts
// src/shared/ui/button/index.ts
export { Button } from "./button";
```

```tsx
// ✅ Correct — always go through @shared/ui
import { Button, Input, Checkbox, Select, Typography, Paper } from "@shared/ui";

// ❌ Wrong — bypasses the design system adapter layer
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
```

**Exception — layout primitives:** `Box`, `Stack`, `Grid2` are structural utilities without design semantics. They may
be imported directly from `@mui/material` when used for layout only (no visual styling).

**Exception — icons:** MUI icons from `@mui/icons-material` may be imported directly without a `@shared/ui` wrapper.

```tsx
// ✅ Acceptable — pure layout
import { Box, Stack } from "@mui/material";

<Box display="flex" gap={2}>
  <Stack spacing={1}>{children}</Stack>
</Box>;

// ❌ Wrong — visual component used directly instead of shared wrapper
import { Paper, Typography } from "@mui/material";
```

### Import style

Always import from the barrel — never from individual module paths:

```ts
// ✅ Correct
import { Box, Stack } from "@mui/material";

// ❌ Wrong
import Box from "@mui/material/Box";
```

### MUI default component overrides → `theme.ts` only

All visual styling of default MUI components must be defined in `src/shared/config/theme.ts` via
`components[MuiXxx].styleOverrides` — **never** inside `@shared/ui` component files using `styled()`.

`@shared/ui` wrappers for default MUI components remain simple passthroughs:

```tsx
// ✅ Correct — wrapper is a passthrough; styling lives in theme.ts
export const MenuItem: FC<MenuItemProps> = (props) => <MuiMenuItem {...props} />;

// ❌ Wrong — visual styling should not live in the wrapper file
const StyledMenuItem = styled(MuiMenuItem)({ height: 40, borderRadius: 8 });
export const MenuItem: FC<MenuItemProps> = (props) => <StyledMenuItem {...props} />;
```

All sizing, colors, states (hover, focus, error, disabled), shadows, border-radius go into `theme.ts`:

```ts
// src/shared/config/theme.ts
MuiMenuItem: {
  styleOverrides: {
    root: {
      height: 40,
        borderRadius
    :
      8,
        "&:hover"
    :
      {
        backgroundColor: colors.greenYellow[10]
      }
    ,
    }
  ,
  }
,
}
,
```

Do not declare `styled()` in component files. File-specific styled primitives live in adjacent `*.styles.ts` sidecar
files, and every `*.styles.ts` file must start with `"use client";` because MUI `styled()` is client-only in the Next.js
RSC graph. Component `.tsx` files import the named primitives from that sidecar. Reusable styled primitives go into
`@shared/ui`. Default MUI visual component overrides still live in `theme.ts`.

---

### Styling with `styled`

Use `styled` from `@mui/material` for all component styling — never use the `sx` prop inline. Define named styled
components in adjacent `*.styles.ts` files and export them.

```tsx
"use client";

// ✅ Correct — alert-label.styles.ts
import {styled} from "@mui/material";

import {Typography} from "@shared/ui";

export const AlertTitle = styled(Typography)({
  fontWeight: 700,
});

// ✅ Correct — alert-label.tsx
import {AlertTitle} from "./alert-label.styles";

<AlertTitle variant="h4">Hello</AlertTitle>;

// ✅ For native HTML elements
export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

// ✅ With theme access
export const NavItem = styled(Typography)(({theme}) => ({
  "&:hover": {color: theme.palette.primary.main},
}));

// ✅ With dynamic props (use shouldForwardProp to avoid DOM leaks)
export const OptionButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({isActive}) => ({
  opacity: isActive ? 1 : 0.5,
}));

// ❌ Wrong — sx inline style
<Typography sx={{fontWeight: 700}}>

  // ❌ Wrong — standalone MUI system prop
  <Typography fontWeight={700}>
```

**Key rules:**

- Convert MUI spacing tokens to pixel values: `gap: 3` → `gap: 24`, `p: 2` → `padding: 16`, `py: 4` →
  `paddingTop: 32, paddingBottom: 32`
- Convert MUI shorthand props: `bgcolor` → `backgroundColor`, `borderColor: "divider"` → use theme callback
- For theme-aware values (palette, spacing function), use the `({ theme }) => ({})` callback form
- Dynamic styled props must use normal camelCase names with `shouldForwardProp`; never prefix styled props with a dollar
  sign.
- Never create styled components in `.tsx` component files, component functions, hooks, callbacks, conditions, or render
  branches
- File-specific styled primitives live in adjacent `*.styles.ts` sidecar files; every `*.styles.ts` starts with
  `"use client";`; reusable styled primitives go into `@shared/ui`

---

## Accessibility

Most `jsx-a11y` rules are currently disabled. The following remain active:

- **`anchor-is-valid`** (warn) — `<a>` elements should have valid `href`. Next.js `<Link>` handles this.
- **Use `<Link>` for internal navigation** — never use `<a href="...">` for in-app routes. Raw `<a>` triggers full page
  reload and bypasses client-side routing and prefetching. Exception: external URLs and file downloads.

---

## Commit Messages

- Use only Conventional Commit format without scope.
- Do not add scopes like `feat(check-in)`. Use `feat:` instead.
- Start with a short imperative summary, no more than 50 characters.
- Leave an empty line after the summary, then add a concise body.
- Use bullet points for multiple changes.
- Keep every line at or below 100 characters.
- Avoid overly verbose descriptions and useless details.
- Do not add ads or tool footers like "Generated with Claude Code" or similar.

---

## Commands

```bash
# Lint
yarn eslint .

# Lint with auto-fix
yarn eslint . --fix

# Check formatting
yarn prettier --check .

# Format all files
yarn prettier --write .

# Run tests
yarn run test

# Check test coverage
yarn run test:coverage
```

---

## Project map

Before any implementation, read `.ai/project-map/INDEX.md` and `.ai/project-map/modules.yaml` to locate relevant
modules. Use `key_files` and `paths` to navigate directly — avoid broad `rg` or `find` searches when the map already
points to the right place.

After implementation, follow the `project-cartographer` skill's incremental update workflow:

```bash
git diff --name-only HEAD~1
git status --short
```

Check **all five map files** and update every one that is affected by the changes — not just `modules.yaml`. See the
skill for the trigger rules per file. Always append an entry to `.ai/project-map/update-log.md` last.
