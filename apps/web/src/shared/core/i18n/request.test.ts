import { describe, expect, it, vi } from "vitest";

let requestFactory: (() => Promise<{ locale: string; messages: unknown }>) | undefined;

vi.mock("next-intl/server", () => ({
  getRequestConfig: (factory: () => Promise<{ locale: string; messages: unknown }>) => {
    requestFactory = factory;

    return { isRequestConfig: true };
  },
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

describe("i18n request config", () => {
  it("loads messages for a supported cookie locale", async () => {
    const { cookies } = await import("next/headers");
    const requestConfig = await import("./request");

    vi.mocked(cookies).mockResolvedValue({
      get: () => ({ value: "en" }),
    } as never);

    expect(requestConfig.default).toEqual({ isRequestConfig: true });
    if (requestFactory == null) {
      throw new Error("Expected request factory to be registered.");
    }

    await expect(requestFactory()).resolves.toMatchObject({
      locale: "en",
      messages: {
        widgets: {
          "phrase-browser": {
            "page-title": "Polite — phrase packs",
          },
        },
      },
    });
  });

  it("falls back to the default locale for missing or unsupported cookie values", async () => {
    const { cookies } = await import("next/headers");
    await import("./request");

    vi.mocked(cookies).mockResolvedValue({
      get: () => ({ value: "sk" }),
    } as never);

    if (requestFactory == null) {
      throw new Error("Expected request factory to be registered.");
    }

    await expect(requestFactory()).resolves.toMatchObject({ locale: "uk" });

    vi.mocked(cookies).mockResolvedValue({
      get: () => undefined,
    } as never);

    await expect(requestFactory()).resolves.toMatchObject({ locale: "uk" });
  });
});
