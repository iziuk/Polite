import { DEFAULT_LOCALE, type TLocale } from "./locale";
import enTranslations from "./translations/en.json";
import ukTranslations from "./translations/uk.json";

type TTranslationDictionary = typeof ukTranslations;
type TTranslationLeafKey<TTranslations, TPrefix extends string = ""> = {
  [TKey in keyof TTranslations & string]: TTranslations[TKey] extends string
    ? `${TPrefix}${TKey}`
    : TTranslations[TKey] extends Record<string, unknown>
      ? TTranslationLeafKey<TTranslations[TKey], `${TPrefix}${TKey}.`>
      : never;
}[keyof TTranslations & string];

export type TTranslationKey = TTranslationLeafKey<TTranslationDictionary>;

const TRANSLATIONS = {
  en: enTranslations,
  uk: ukTranslations,
} satisfies Record<TLocale, TTranslationDictionary>;

const isTranslationRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const resolveTranslation = (translations: TTranslationDictionary, key: TTranslationKey): string => {
  const keySegments = key.split(".");
  let currentValue: unknown = translations;

  for (const keySegment of keySegments) {
    if (!isTranslationRecord(currentValue)) {
      return key;
    }

    currentValue = currentValue[keySegment];
  }

  return typeof currentValue === "string" ? currentValue : key;
};

export const getMessages = (locale: TLocale): TTranslationDictionary => TRANSLATIONS[locale];
export const translate = (key: TTranslationKey, locale: TLocale = DEFAULT_LOCALE): string => resolveTranslation(TRANSLATIONS[locale], key);
