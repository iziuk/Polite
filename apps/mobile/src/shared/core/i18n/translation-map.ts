import enTranslations from "./translations/en.json";

export type TTranslationKey =
  | "app.metadata.description"
  | "app.metadata.open-graph-description"
  | "app.metadata.title"
  | "widgets.phrase-browser.anti-stupor-action"
  | "widgets.phrase-browser.copy-action"
  | "widgets.phrase-browser.copy-fallback-action"
  | "widgets.phrase-browser.copy-reply-aria-label"
  | "widgets.phrase-browser.copy-title"
  | "widgets.phrase-browser.direction-label"
  | "widgets.phrase-browser.empty-state"
  | "widgets.phrase-browser.fallback-title"
  | "widgets.phrase-browser.footer-next-step"
  | "widgets.phrase-browser.footer-tip-after"
  | "widgets.phrase-browser.footer-tip-before"
  | "widgets.phrase-browser.large-text-action"
  | "widgets.phrase-browser.normal-text-action"
  | "widgets.phrase-browser.page-description"
  | "widgets.phrase-browser.page-title"
  | "widgets.phrase-browser.replies-hide-action"
  | "widgets.phrase-browser.replies-show-action"
  | "widgets.phrase-browser.search-label"
  | "widgets.phrase-browser.search-placeholder"
  | "widgets.phrase-browser.speak-action"
  | "widgets.phrase-browser.speak-reply-aria-label"
  | "widgets.phrase-browser.speak-title"
  | "widgets.phrase-browser.ukrainian-label";

const TRANSLATIONS: Record<TTranslationKey, string> = {
  "app.metadata.description": enTranslations.app.metadata.description,
  "app.metadata.open-graph-description": enTranslations.app.metadata["open-graph-description"],
  "app.metadata.title": enTranslations.app.metadata.title,
  "widgets.phrase-browser.anti-stupor-action": enTranslations.widgets["phrase-browser"]["anti-stupor-action"],
  "widgets.phrase-browser.copy-action": enTranslations.widgets["phrase-browser"]["copy-action"],
  "widgets.phrase-browser.copy-fallback-action": enTranslations.widgets["phrase-browser"]["copy-fallback-action"],
  "widgets.phrase-browser.copy-reply-aria-label": enTranslations.widgets["phrase-browser"]["copy-reply-aria-label"],
  "widgets.phrase-browser.copy-title": enTranslations.widgets["phrase-browser"]["copy-title"],
  "widgets.phrase-browser.direction-label": enTranslations.widgets["phrase-browser"]["direction-label"],
  "widgets.phrase-browser.empty-state": enTranslations.widgets["phrase-browser"]["empty-state"],
  "widgets.phrase-browser.fallback-title": enTranslations.widgets["phrase-browser"]["fallback-title"],
  "widgets.phrase-browser.footer-next-step": enTranslations.widgets["phrase-browser"]["footer-next-step"],
  "widgets.phrase-browser.footer-tip-after": enTranslations.widgets["phrase-browser"]["footer-tip-after"],
  "widgets.phrase-browser.footer-tip-before": enTranslations.widgets["phrase-browser"]["footer-tip-before"],
  "widgets.phrase-browser.large-text-action": enTranslations.widgets["phrase-browser"]["large-text-action"],
  "widgets.phrase-browser.normal-text-action": enTranslations.widgets["phrase-browser"]["normal-text-action"],
  "widgets.phrase-browser.page-description": enTranslations.widgets["phrase-browser"]["page-description"],
  "widgets.phrase-browser.page-title": enTranslations.widgets["phrase-browser"]["page-title"],
  "widgets.phrase-browser.replies-hide-action": enTranslations.widgets["phrase-browser"]["replies-hide-action"],
  "widgets.phrase-browser.replies-show-action": enTranslations.widgets["phrase-browser"]["replies-show-action"],
  "widgets.phrase-browser.search-label": enTranslations.widgets["phrase-browser"]["search-label"],
  "widgets.phrase-browser.search-placeholder": enTranslations.widgets["phrase-browser"]["search-placeholder"],
  "widgets.phrase-browser.speak-action": enTranslations.widgets["phrase-browser"]["speak-action"],
  "widgets.phrase-browser.speak-reply-aria-label": enTranslations.widgets["phrase-browser"]["speak-reply-aria-label"],
  "widgets.phrase-browser.speak-title": enTranslations.widgets["phrase-browser"]["speak-title"],
  "widgets.phrase-browser.ukrainian-label": enTranslations.widgets["phrase-browser"]["ukrainian-label"],
};

export const translate = (key: TTranslationKey): string => TRANSLATIONS[key];
