export const DEFAULT_LOCALE = "uk";
export const SUPPORTED_LOCALES = ["uk", "en"] as const;

const SUPPORTED_LOCALE_VALUES: readonly string[] = SUPPORTED_LOCALES;

export type TLocale = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (locale: string): locale is TLocale => SUPPORTED_LOCALE_VALUES.includes(locale);
