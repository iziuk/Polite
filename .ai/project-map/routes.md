# Routes

Last verified: 2026-06-04

## Web App

| Route                   | File                                    | Notes                                                                               |
| ----------------------- | --------------------------------------- | ----------------------------------------------------------------------------------- |
| `/`                     | `apps/web/src/app/page.tsx`             | Static phrase browser page that renders `PhraseBrowser` from the widget public API. |
| `/manifest.webmanifest` | `apps/web/src/app/manifest.webmanifest` | PWA manifest route served by the Next app directory.                                |

## Routing Notes

- The app currently has a single public UI route.
- `apps/web/next.config.mjs` enables typed routes, security headers, and the `next-intl` plugin.
- Localization is cookie-based and does not add locale-prefixed routes.
- No redirects or route constants are defined yet.
