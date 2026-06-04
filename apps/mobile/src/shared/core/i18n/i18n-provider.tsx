import { createContext, type FC, type ReactNode, useCallback, useMemo, useState } from "react";

import { DEFAULT_LOCALE, type TLocale } from "./locale";
import { translate, type TTranslationKey } from "./translation-map";

interface ITranslationContextValue {
  locale: TLocale;
  setLocale: (locale: TLocale) => void;
  t: (key: TTranslationKey) => string;
}

interface ITranslationProviderProps {
  children: ReactNode;
}

export const TranslationContext = createContext<ITranslationContextValue | null>(null);

export const TranslationProvider: FC<ITranslationProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<TLocale>(DEFAULT_LOCALE);
  const t = useCallback((key: TTranslationKey): string => translate(key, locale), [locale]);
  const translationContextValue = useMemo<ITranslationContextValue>(() => ({ locale, setLocale, t }), [locale, t]);

  return <TranslationContext.Provider value={translationContextValue}>{children}</TranslationContext.Provider>;
};
