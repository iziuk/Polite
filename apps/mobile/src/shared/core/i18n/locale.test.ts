import { describe, expect, it } from "@jest/globals";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from "./locale";

describe("mobile locale", () => {
  it("defines supported locales", () => {
    expect(DEFAULT_LOCALE).toBe("uk");
    expect(SUPPORTED_LOCALES).toEqual(["uk", "en"]);
    expect(isSupportedLocale("uk")).toBe(true);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("sk")).toBe(false);
  });
});
