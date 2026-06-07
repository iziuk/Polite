import { afterEach, describe, expect, it, vi } from "vitest";

import { copyText } from "./clipboard";

describe("copyText", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("writes text to the browser clipboard when available", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal("navigator", { clipboard: { writeText } });

    copyText("Dobrý deň");

    expect(writeText).toHaveBeenCalledWith("Dobrý deň");
  });

  it("does nothing outside a browser-like clipboard environment", () => {
    vi.stubGlobal("navigator", undefined);

    expect(() => copyText("Dobrý deň")).not.toThrow();

    vi.stubGlobal("navigator", {});

    expect(() => copyText("Dobrý deň")).not.toThrow();
  });

  it("swallows clipboard write rejections", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));

    vi.stubGlobal("navigator", { clipboard: { writeText } });

    copyText("Dobrý deň");
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith("Dobrý deň");
  });
});
