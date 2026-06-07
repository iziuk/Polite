import { describe, expect, it } from "vitest";

import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, SUPPORTED_LOCALES, isSupportedLocale } from "./locale";

describe("locale", () => {
  it("defines the default locale, locale cookie, and supported locales", () => {
    expect(DEFAULT_LOCALE).toBe("uk");
    expect(LOCALE_COOKIE_NAME).toBe("locale");
    expect(SUPPORTED_LOCALES).toEqual(["uk", "en"]);
  });

  it("narrows supported locale values", () => {
    expect(isSupportedLocale("uk")).toBe(true);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("sk")).toBe(false);
  });
});
