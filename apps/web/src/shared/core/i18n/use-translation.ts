"use client";

import type { TTranslationKey } from "./translation-map";

import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";

import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, type TLocale, isSupportedLocale } from "./locale";

interface IUseTranslationResult {
  locale: TLocale;
  setLocale: (locale: TLocale) => void;
  t: (key: TTranslationKey) => string;
}

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const getClientCookieLocale = (): TLocale | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const localeCookiePrefix = `${LOCALE_COOKIE_NAME}=`;
  const localeCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(localeCookiePrefix))
    ?.slice(localeCookiePrefix.length);

  return localeCookie != null && isSupportedLocale(localeCookie) ? localeCookie : undefined;
};

export const getDocumentLocale = (): TLocale | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const documentLocale = document.documentElement.lang;

  return isSupportedLocale(documentLocale) ? documentLocale : undefined;
};

export const useTranslation = (): IUseTranslationResult => {
  const currentLocale = useLocale();
  const nextIntlTranslate = useTranslations();
  const locale = getClientCookieLocale() ?? getDocumentLocale() ?? (isSupportedLocale(currentLocale) ? currentLocale : DEFAULT_LOCALE);

  const setLocale = useCallback((nextLocale: TLocale): void => {
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
    window.location.reload();
  }, []);

  const t = useCallback((key: TTranslationKey): string => nextIntlTranslate(key), [nextIntlTranslate]);

  return { locale, setLocale, t };
};
