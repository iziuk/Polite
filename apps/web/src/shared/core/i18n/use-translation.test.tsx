import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LOCALE_COOKIE_NAME } from "./locale";
import { getClientCookieLocale, getDocumentLocale, useTranslation } from "./use-translation";

const useLocale = vi.fn();
const useTranslations = vi.fn();

vi.mock("next-intl", () => ({
  useLocale: () => useLocale(),
  useTranslations: () => useTranslations(),
}));

describe("useTranslation", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    document.documentElement.lang = "";
    useLocale.mockReturnValue("uk");
    useTranslations.mockReturnValue((key: string) => `translated:${key}`);
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
  });

  it("returns a supported locale and translation function", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.locale).toBe("uk");
    expect(result.current.t("widgets.phrase-browser.copy-action")).toBe("translated:widgets.phrase-browser.copy-action");
  });

  it("uses a supported document locale when server-rendered html already changed language", () => {
    document.documentElement.lang = "en";
    useLocale.mockReturnValue("uk");

    const { result } = renderHook(() => useTranslation());

    expect(result.current.locale).toBe("en");
  });

  it("uses a supported locale cookie when persisted preference changed language", () => {
    document.cookie = `${LOCALE_COOKIE_NAME}=en; path=/`;
    useLocale.mockReturnValue("uk");

    const { result } = renderHook(() => useTranslation());

    expect(result.current.locale).toBe("en");
  });

  it("returns no client locale when document is unavailable", () => {
    vi.stubGlobal("document", undefined);

    expect(getClientCookieLocale()).toBeUndefined();
    expect(getDocumentLocale()).toBeUndefined();
  });

  it("falls back to the default locale when next-intl returns an unsupported value", () => {
    document.documentElement.lang = "sk";
    useLocale.mockReturnValue("sk");

    const { result } = renderHook(() => useTranslation());

    expect(result.current.locale).toBe("uk");
  });

  it("writes the locale cookie and reloads the page", () => {
    const reload = vi.fn();
    const originalLocation = window.location;

    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, reload },
    });

    const { result } = renderHook(() => useTranslation());

    result.current.setLocale("en");

    expect(document.cookie).toContain(`${LOCALE_COOKIE_NAME}=en`);
    expect(reload).toHaveBeenCalledTimes(1);

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });
});
