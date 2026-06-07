import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PhraseBrowser } from "./phrase-browser";

vi.mock("@shared/core/i18n", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@shared/lib/browser", () => ({
  copyText: vi.fn(),
  speak: vi.fn(),
}));

vi.mock("./phrase-toolbar", () => ({
  PhraseToolbar: ({
    onChangePack,
    onChangeQuery,
    onToggleLargeText,
  }: {
    onChangePack: (packId: string) => void;
    onChangeQuery: (query: string) => void;
    onToggleLargeText: () => void;
  }) => (
    <div>
      <button onClick={() => onChangePack("market-sk")} type="button">
        Market
      </button>
      <button onClick={() => onChangePack("missing-pack")} type="button">
        Missing pack
      </button>
      <button onClick={() => onChangeQuery("діагностика")} type="button">
        Search diagnostics
      </button>
      <button onClick={() => onChangeQuery("zz-no-results")} type="button">
        Search missing
      </button>
      <button onClick={onToggleLargeText} type="button">
        Toggle large text
      </button>
    </div>
  ),
}));

describe("PhraseBrowser", () => {
  it("renders packs, filters phrases, toggles large text, and falls back from an invalid pack", () => {
    render(<PhraseBrowser />);

    expect(screen.getByRole("heading", { name: "widgets.phrase-browser.page-title" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Автосервіс/ })).toBeInTheDocument();
    expect(screen.getByText("Chcel by som sa objednať na servis.")).toHaveClass("text-lg");

    fireEvent.click(screen.getByRole("button", { name: "Market" }));
    expect(screen.getByRole("heading", { name: /Ринок \/ магазин/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Missing pack" }));
    expect(screen.getByRole("heading", { name: /Автосервіс/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Search diagnostics" }));
    expect(screen.getByText("Koľko stojí diagnostika?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Toggle large text" }));
    expect(screen.getByText("Koľko stojí diagnostika?")).toHaveClass("text-2xl");

    fireEvent.click(screen.getByRole("button", { name: "Search missing" }));
    expect(screen.getByText("widgets.phrase-browser.empty-state")).toBeInTheDocument();
    expect(screen.getByText("widgets.phrase-browser.footer-next-step")).toBeInTheDocument();
  });
});
