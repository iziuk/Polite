import { describe, expect, it } from "vitest";

import { getMessages, translate } from "./translation-map";

describe("translation map", () => {
  it("returns locale dictionaries", () => {
    expect(getMessages("uk").widgets["phrase-browser"]["page-title"]).toBe("Polite — розмовні пакети");
    expect(getMessages("en").widgets["phrase-browser"]["page-title"]).toBe("Polite — phrase packs");
  });

  it("translates known keys and falls back to the key for invalid paths", () => {
    expect(translate("widgets.phrase-browser.copy-action", "en")).toBe("Copy");
    expect(translate("widgets.phrase-browser.copy-action")).toBe("Копіювати");
    expect(translate("widgets.phrase-browser" as never, "en")).toBe("widgets.phrase-browser");
    expect(translate("widgets.phrase-browser.copy-action.too-deep" as never, "en")).toBe("widgets.phrase-browser.copy-action.too-deep");
    expect(translate("widgets.phrase-browser.missing" as never, "en")).toBe("widgets.phrase-browser.missing");
  });
});
