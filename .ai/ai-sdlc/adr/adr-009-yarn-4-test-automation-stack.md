# ADR-009: Use Yarn 4 And The Web/RN Test Automation Stack

Status: Accepted

Date: 2026-06-08

Owner: AI Architect / AI QA Automation

Related work: `package.json`, `.yarnrc.yml`, `vitest.config.ts`, `playwright.config.ts`, `apps/mobile/jest.config.js`, `apps/mobile/eas.json`

## Context

Polite now has web, shared package, and Expo/RN mobile code that must share domain helpers while keeping platform test
runners aligned with each runtime. The previous npm workspace baseline in ADR-001 did not define the package-manager
upgrade path, coverage policy, or native E2E approach.

## Decision Drivers

- Use one package manager with reproducible installs across the monorepo.
- Keep compatibility with existing Node-style tooling and Expo by using `node_modules`.
- Test pure shared logic once and reuse it from web and mobile.
- Use browser E2E for the Next.js app and true native E2E for React Native.
- Make coverage expectations explicit and reviewable.
- Avoid treating E2E journey pass/fail as line coverage.

## Decision

Polite uses Yarn 4 as the monorepo package manager with `nodeLinker: node-modules`.

Automated tests use:

- Vitest with React Testing Library for web/shared unit and component tests.
- Jest with `jest-expo` and React Native Testing Library for Expo/RN unit and component tests.
- Playwright for Next.js web E2E across Chromium, Firefox, and WebKit.
- Maestro for native React Native E2E on iOS simulator and Android emulator, with EAS Workflow definitions for hosted
  simulator/APK builds.

Vitest and Jest enforce 100% statement, branch, function, and line thresholds for covered source. Exclusions are limited
to barrels, type-only files, framework/generated artifacts, static translation data, configs, and test files. E2E remains
journey coverage and is evaluated as pass/fail.

## Alternatives Considered

### Stay On npm

Pros:

- No migration cost.
- Existing lockfile and scripts already worked for basic build/lint.

Cons:

- Does not match the requested project package-manager direction.
- Leaves the test automation baseline undefined.
- Keeps package-manager decision split from new workspace/test conventions.

### Yarn 4 Plug'n'Play

Pros:

- Stricter dependency resolution.
- Smaller installs in some projects.

Cons:

- Higher compatibility risk with Expo, React Native, Next.js, and E2E tooling.
- More resolver configuration would be needed for little MVP benefit.

### Detox For RN E2E

Pros:

- Established native mobile E2E framework.
- Fine-grained native app control.

Cons:

- More setup overhead for Expo projects.
- Expo EAS Workflows provide first-class Maestro examples and simpler simulator/APK execution.

## Consequences

Positive:

- Install, build, lint, typecheck, coverage, and E2E commands are explicit from the root.
- Shared phrase filtering lives in `packages/shared` and is tested once for both platforms.
- Web and native E2E cover their real runtimes.
- Coverage gaps fail locally and in CI once wired.

Negative or trade-offs:

- 100% thresholds require intentional exclusions and can increase maintenance cost.
- Playwright browser binaries and Maestro/simulators are environment dependencies outside ordinary package install.
- EAS hosted mobile E2E requires Expo/EAS project setup and token configuration before CI automation can run.

## Security And Privacy Impact

No sensitive data, auth, secrets, payments, or production data are introduced. Test flows use static phrase data and local
application state. EAS tokens, if added later, must be configured as secrets and never committed.

## Operational Impact

Root verification baseline becomes:

```bash
corepack yarn install --immutable
yarn lint
yarn typecheck
yarn test:coverage
yarn test:e2e:web
yarn build
yarn format:check
```

Mobile E2E additionally requires:

```bash
yarn test:e2e:mobile
```

This command needs Maestro plus a running compatible simulator/emulator or EAS Workflow execution.

## Rollback Or Reversal

Rollback would restore npm scripts/lockfile, remove `.yarnrc.yml`, replace Yarn commands in docs, and revise the test
configs. Replacing Maestro or Playwright would require a new ADR because it changes QA automation and CI expectations.

## Follow-Ups

- Configure hosted EAS mobile E2E after Expo/EAS project credentials are available.
- Add CI jobs that run the Yarn baseline checks and browser/mobile E2E in suitable environments.
- Revisit coverage exclusions whenever generated or framework files change.
