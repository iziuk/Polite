# Architectural Decisions

Last verified: 2026-06-04

## Static Phrase Packs For MVP

Phrase packs live in `packages/data/*.json` and are imported at build time through the phrase entity. This keeps the first version offline-friendly and simple.

## FSD In The Web App

The web app now uses FSD layers under `apps/web/src`. Route files stay in `src/app`, composed UI lives in `src/widgets`, phrase domain access lives in `src/entities`, and reusable app utilities live in `src/shared`.

## Public APIs And Aliases

Cross-layer imports use `@widgets`, `@entities`, and `@shared` aliases. Shared package internals are exposed through barrels in `packages/shared/src`.

## UI Copy Ownership

User-facing UI copy is centralized in `apps/web/src/shared/core/i18n/translations/en.json` and accessed through `translate` or `useTranslation`.

## React 19 Component Typing

Reusable components are const arrow functions checked with `satisfies React.FC`. Their concrete return type stays `React.ReactElement` to remain compatible with Next.js 15 generated route checks.
