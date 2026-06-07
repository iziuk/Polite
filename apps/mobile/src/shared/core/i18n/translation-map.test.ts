import { describe, expect, it } from "@jest/globals";

import { getMessages, translate } from "./translation-map";

describe("mobile translation map", () => {
  it("returns translations by locale", () => {
    expect(getMessages("uk").widgets["phrase-browser"]["page-title"]).toBe("Polite — розмовні пакети");
    expect(getMessages("en").widgets["phrase-browser"]["page-title"]).toBe("Polite — phrase packs");
    expect(translate("widgets.phrase-browser.copy-action", "en")).toBe("Copy");
    expect(translate("widgets.phrase-browser.copy-action")).toBe("Копіювати");
  });

  it("falls back to the key when the path does not resolve to a string", () => {
    expect(translate("widgets.phrase-browser" as never, "en")).toBe("widgets.phrase-browser");
    expect(translate("widgets.phrase-browser.copy-action.too-deep" as never, "en")).toBe("widgets.phrase-browser.copy-action.too-deep");
    expect(translate("widgets.phrase-browser.missing" as never, "en")).toBe("widgets.phrase-browser.missing");
  });
});
