import { describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { TranslationProvider } from "@shared/core/i18n";

import { getPhrasePackById, PhraseBrowser } from "./phrase-browser";

describe("mobile PhraseBrowser", () => {
  it("renders, switches packs, searches, shows empty state, and toggles large text", async () => {
    await render(
      <TranslationProvider>
        <PhraseBrowser />
      </TranslationProvider>,
    );

    expect(screen.getByText("Polite — розмовні пакети")).toBeTruthy();
    expect(screen.getByText("Автосервіс (SK ↔ UA)")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("phrase-pack-market-sk"));
    expect(screen.getByText("Ринок / магазин (SK ↔ UA)")).toBeTruthy();
    expect(getPhrasePackById("missing-pack").title).toBe("Автосервіс (SK ↔ UA)");

    await fireEvent.press(screen.getByTestId("phrase-pack-autoservice-sk"));
    await fireEvent.changeText(screen.getByTestId("phrase-search-input"), "діагностика");
    expect(screen.getByText("Koľko stojí diagnostika?")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("large-text-toggle"));
    expect(screen.getByText("Звичайний текст")).toBeTruthy();

    await fireEvent.changeText(screen.getByTestId("phrase-search-input"), "zz-no-results");
    expect(screen.getByText("Нічого не знайдено за запитом.")).toBeTruthy();
    expect(screen.getByText("Далі винесемо офлайн (Next-PWA) і простий CMS (Supabase) для редагування паків.")).toBeTruthy();
  });
});
