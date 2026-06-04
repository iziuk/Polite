import type { TLocale } from "./locale";
import type { TTranslationKey } from "./translation-map";

import { useContext } from "react";

import { TranslationContext } from "./i18n-provider";

interface IUseTranslationResult {
  locale: TLocale;
  setLocale: (locale: TLocale) => void;
  t: (key: TTranslationKey) => string;
}

export const useTranslation = (): IUseTranslationResult => {
  const translationContext = useContext(TranslationContext);

  if (translationContext == null) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }

  return translationContext;
};
