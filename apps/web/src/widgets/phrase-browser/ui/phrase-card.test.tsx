import type { IPhrase } from "@entities/phrase";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PhraseCard } from "./phrase-card";

const browserMocks = vi.hoisted(() => ({
  copyText: vi.fn(),
  speak: vi.fn(),
}));

vi.mock("@shared/core/i18n", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@shared/lib/browser", () => ({
  copyText: browserMocks.copyText,
  speak: browserMocks.speak,
}));

const PHRASE_WITH_ACTIONS: IPhrase = {
  expected_replies: [
    {
      sk: "Kedy vám vyhovuje?",
      ua: "Коли вам зручно?",
    },
  ],
  fallback: {
    sk: "Môžete, prosím, pomalšie?",
    ua: "Можете, будь ласка, повільніше?",
  },
  id: "book-service",
  phonetic_ua: "Хцель би сом са об’єднаť на сервіс.",
  sk: "Chcel by som sa objednať na servis.",
  ua: "Хочу записатися на сервіс.",
};

const SIMPLE_PHRASE: IPhrase = {
  id: "simple",
  phonetic_ua: "Просім.",
  sk: "Prosím.",
  ua: "Будь ласка.",
};

describe("PhraseCard", () => {
  it("speaks, copies, toggles replies, and handles fallback actions", () => {
    render(<PhraseCard isLargeText phrase={PHRASE_WITH_ACTIONS} />);

    fireEvent.click(screen.getByTitle("widgets.phrase-browser.speak-title"));
    fireEvent.click(screen.getByTitle("widgets.phrase-browser.copy-title"));
    fireEvent.click(screen.getByRole("button", { name: "widgets.phrase-browser.replies-show-action" }));
    fireEvent.click(screen.getByLabelText("widgets.phrase-browser.speak-reply-aria-label"));
    fireEvent.click(screen.getByLabelText("widgets.phrase-browser.copy-reply-aria-label"));
    fireEvent.click(screen.getByTitle("widgets.phrase-browser.fallback-title"));
    fireEvent.click(screen.getByRole("button", { name: /widgets\.phrase-browser\.copy-fallback-action/ }));
    fireEvent.click(screen.getByRole("button", { name: "widgets.phrase-browser.replies-hide-action" }));

    expect(browserMocks.speak).toHaveBeenCalledWith("Chcel by som sa objednať na servis.");
    expect(browserMocks.speak).toHaveBeenCalledWith("Kedy vám vyhovuje?");
    expect(browserMocks.speak).toHaveBeenCalledWith("Môžete, prosím, pomalšie?");
    expect(browserMocks.copyText).toHaveBeenCalledWith("Chcel by som sa objednať na servis.");
    expect(browserMocks.copyText).toHaveBeenCalledWith("Kedy vám vyhovuje?");
    expect(browserMocks.copyText).toHaveBeenCalledWith("Môžete, prosím, pomalšie?");
    expect(screen.queryByText("Kedy vám vyhovuje?")).not.toBeInTheDocument();
  });

  it("renders a simple normal-text phrase without optional reply or fallback sections", () => {
    render(<PhraseCard isLargeText={false} phrase={SIMPLE_PHRASE} />);

    expect(screen.getByText("Prosím.")).toHaveClass("text-lg");
    expect(screen.queryByRole("button", { name: "widgets.phrase-browser.replies-show-action" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /widgets\.phrase-browser\.copy-fallback-action/ })).not.toBeInTheDocument();
  });
});
