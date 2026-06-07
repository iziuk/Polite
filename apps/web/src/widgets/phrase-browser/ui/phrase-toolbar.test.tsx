import type { IPack } from "@entities/phrase";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PhraseToolbar } from "./phrase-toolbar";

const i18nMocks = vi.hoisted(() => ({
  clientCookieLocale: undefined as "en" | "uk" | undefined,
  setLocale: vi.fn(),
  t: (key: string) => key,
}));

vi.mock("@shared/core/i18n", () => ({
  getClientCookieLocale: () => i18nMocks.clientCookieLocale,
  isSupportedLocale: (locale: string) => ["uk", "en"].includes(locale),
  useTranslation: () => ({
    locale: "uk",
    setLocale: i18nMocks.setLocale,
    t: i18nMocks.t,
  }),
}));

const PACKS: readonly IPack[] = [
  {
    id: "autoservice-sk",
    emoji: "🚗",
    phrases: [],
    title: "Автосервіс",
  },
  {
    id: "custom-pack",
    phrases: [],
    title: "Без іконки",
  },
];

describe("PhraseToolbar", () => {
  beforeEach(() => {
    i18nMocks.clientCookieLocale = undefined;
    i18nMocks.setLocale.mockClear();
  });

  it("changes pack, query, locale, and text size", () => {
    const handleChangePack = vi.fn();
    const handleChangeQuery = vi.fn();
    const handleToggleLargeText = vi.fn();

    render(
      <PhraseToolbar
        activePackId="autoservice-sk"
        isLargeText={false}
        onChangePack={handleChangePack}
        onChangeQuery={handleChangeQuery}
        onToggleLargeText={handleToggleLargeText}
        packs={PACKS}
        query=""
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Без іконки/ }));
    fireEvent.change(screen.getByLabelText("shared.i18n.language-label"), { target: { value: "en" } });
    fireEvent.change(screen.getByLabelText("widgets.phrase-browser.search-label"), { target: { value: "рахунок" } });
    fireEvent.click(screen.getByRole("button", { name: "widgets.phrase-browser.large-text-action" }));

    expect(handleChangePack).toHaveBeenCalledWith("custom-pack");
    expect(i18nMocks.setLocale).toHaveBeenCalledWith("en");
    expect(screen.getByLabelText("shared.i18n.language-label")).toHaveValue("en");
    expect(handleChangeQuery).toHaveBeenCalledWith("рахунок");
    expect(handleToggleLargeText).toHaveBeenCalledTimes(1);
  });

  it("syncs the selected locale from the client cookie after hydration", () => {
    i18nMocks.clientCookieLocale = "en";

    render(
      <PhraseToolbar
        activePackId="autoservice-sk"
        isLargeText={false}
        onChangePack={vi.fn()}
        onChangeQuery={vi.fn()}
        onToggleLargeText={vi.fn()}
        packs={PACKS}
        query=""
      />,
    );

    expect(screen.getByLabelText("shared.i18n.language-label")).toHaveValue("en");
  });

  it("ignores unsupported locale values and shows the normal text action when large text is enabled", () => {
    render(
      <PhraseToolbar
        activePackId="custom-pack"
        isLargeText
        onChangePack={vi.fn()}
        onChangeQuery={vi.fn()}
        onToggleLargeText={vi.fn()}
        packs={PACKS}
        query="term"
      />,
    );

    i18nMocks.setLocale.mockClear();
    fireEvent.change(screen.getByLabelText("shared.i18n.language-label"), { target: { value: "sk" } });

    expect(i18nMocks.setLocale).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "widgets.phrase-browser.normal-text-action" })).toBeInTheDocument();
  });
});
