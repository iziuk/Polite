import type { IPack } from "@entities/phrase";

import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { TranslationProvider } from "@shared/core/i18n";

import { PhraseToolbar } from "./phrase-toolbar";

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

describe("mobile PhraseToolbar", () => {
  it("changes pack, language, query, and text size", async () => {
    const handleChangePack = jest.fn();
    const handleChangeQuery = jest.fn();
    const handleToggleLargeText = jest.fn();

    await render(
      <TranslationProvider>
        <PhraseToolbar
          activePackId="autoservice-sk"
          isLargeText={false}
          onChangePack={handleChangePack}
          onChangeQuery={handleChangeQuery}
          onToggleLargeText={handleToggleLargeText}
          packs={PACKS}
          query=""
        />
      </TranslationProvider>,
    );

    await fireEvent.press(screen.getByTestId("phrase-pack-custom-pack"));
    await fireEvent.press(screen.getByTestId("language-en"));
    await fireEvent.changeText(screen.getByTestId("phrase-search-input"), "diagnostics");
    await fireEvent.press(screen.getByTestId("large-text-toggle"));

    expect(handleChangePack).toHaveBeenCalledWith("custom-pack");
    expect(screen.getByText("Interface language")).toBeTruthy();
    expect(handleChangeQuery).toHaveBeenCalledWith("diagnostics");
    expect(handleToggleLargeText).toHaveBeenCalledTimes(1);
  });

  it("renders the normal text action when large text is enabled", async () => {
    await render(
      <TranslationProvider>
        <PhraseToolbar
          activePackId="custom-pack"
          isLargeText
          onChangePack={jest.fn()}
          onChangeQuery={jest.fn()}
          onToggleLargeText={jest.fn()}
          packs={PACKS}
          query="diagnostics"
        />
      </TranslationProvider>,
    );

    expect(screen.getByText("Звичайний текст")).toBeTruthy();
  });
});
