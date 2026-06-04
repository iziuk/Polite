"use client";

import { useCallback } from "react";

import { translate, type TTranslationKey } from "./translation-map";

interface IUseTranslationResult {
  t: (key: TTranslationKey) => string;
}

export const useTranslation = (): IUseTranslationResult => {
  const t = useCallback((key: TTranslationKey): string => translate(key), []);

  return { t };
};
