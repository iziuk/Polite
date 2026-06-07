# Automation Test Plan: Yarn 4 Coverage And Web/RN E2E

## Metadata

- Feature/system: Package manager migration, shared coverage, web E2E, and native mobile E2E.
- Owner: AI QA Automation / AI DevOps.
- Test framework: Vitest, Jest with `jest-expo`, Playwright, Maestro.
- CI target: Root Yarn checks plus EAS Workflows for hosted native E2E after Expo/EAS credentials are configured.

## Goals

- Keep shared phrase logic covered once in `packages/shared`.
- Verify web and mobile component behavior at 100% covered-source thresholds.
- Exercise the main Next.js phrase-browser journey in real browsers.
- Exercise the main Expo/RN phrase-browser journey on iOS and Android native runtimes.
- Keep generated/config/type-only exclusions explicit.

## Test Levels

| Level        | Scope                                                | Tool                        | Owner            |
| ------------ | ---------------------------------------------------- | --------------------------- | ---------------- |
| Unit         | Shared helpers, i18n fallback, native action facades | Vitest, Jest                | AI QA Automation |
| Integration  | Web and mobile phrase browser components             | React Testing Library, RNTL | AI QA Automation |
| E2E          | Web phrase-browser journey                           | Playwright                  | AI QA Automation |
| E2E          | Native iOS/Android phrase-browser journeys           | Maestro, EAS Workflows      | AI QA Automation |
| API/contract | Not applicable; no backend API exists                | Not applicable              | AI Architect     |
| Visual       | Not applicable for this MVP change                   | Not applicable              | AI QA Manual     |

## Scenarios

- Web: open `/`, switch packs, search hit/no-result, toggle large text, tap copy/speech, switch UI language.
- Mobile native: launch app, verify title, switch all packs, search hit/no-result, toggle large text, open/close replies,
  switch UI language, tap speak/copy/fallback actions.
- Shared: phrase filtering trims empty queries and matches Ukrainian, Slovak, and phonetic text.
- Platform helpers: copy/speech facades cover success and unavailable-platform paths.

## Test Data

- Static phrase packs from `packages/data`.
- Deterministic test phrases for focused shared helper tests.
- No production data, secrets, or external API data.

## CI Policy

- GitHub Actions runs `corepack yarn install --immutable`, `yarn lint`, `yarn typecheck`, `yarn test:coverage`,
  `yarn build`, `yarn format:check`, and `yarn test:e2e:web`.
- Web E2E installs Playwright browsers in CI before running the critical browser journey.
- Native mobile E2E should run through Maestro locally or EAS Workflows after Expo/EAS project credentials are available.

## Flaky Test Risk

- Prefer stable `testID` and accessibility selectors for mobile.
- Avoid sleeps and production data.
- Investigate browser or simulator flakes before rerunning repeatedly.
- Quarantine only with a tracked owner and follow-up.

## Coverage Gaps

- E2E is journey pass/fail and not included in line coverage.
- Exclusions are limited to barrels, type-only files, framework/generated files, static translation data, configs, and
  tests.
- Native E2E cannot be fully verified without Maestro plus a local simulator/emulator or EAS credentials.
