import type { IPhrase } from "@entities/phrase";

import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { TranslationProvider } from "@shared/core/i18n";

import { PhraseCard } from "./phrase-card";

const mockCopyText = jest.fn();
const mockSpeak = jest.fn();

jest.mock("@shared/lib/native", () => ({
  copyText: (text: string) => mockCopyText(text),
  speak: (text: string) => mockSpeak(text),
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

describe("mobile PhraseCard", () => {
  it("speaks, copies, toggles replies, and handles fallback actions", async () => {
    await render(
      <TranslationProvider>
        <PhraseCard isLargeText phrase={PHRASE_WITH_ACTIONS} />
      </TranslationProvider>,
    );

    await fireEvent.press(screen.getByTestId("phrase-speak-book-service"));
    await fireEvent.press(screen.getByTestId("phrase-copy-book-service"));
    await fireEvent.press(screen.getByTestId("phrase-replies-toggle-book-service"));
    await fireEvent.press(screen.getByTestId("phrase-reply-speak-book-service-0"));
    await fireEvent.press(screen.getByTestId("phrase-reply-copy-book-service-0"));
    await fireEvent.press(screen.getByTestId("phrase-fallback-speak-book-service"));
    await fireEvent.press(screen.getByTestId("phrase-fallback-copy-book-service"));
    await fireEvent.press(screen.getByTestId("phrase-replies-toggle-book-service"));

    expect(mockSpeak).toHaveBeenCalledWith("Chcel by som sa objednať na servis.");
    expect(mockSpeak).toHaveBeenCalledWith("Kedy vám vyhovuje?");
    expect(mockSpeak).toHaveBeenCalledWith("Môžete, prosím, pomalšie?");
    expect(mockCopyText).toHaveBeenCalledWith("Chcel by som sa objednať na servis.");
    expect(mockCopyText).toHaveBeenCalledWith("Kedy vám vyhovuje?");
    expect(mockCopyText).toHaveBeenCalledWith("Môžete, prosím, pomalšie?");
    expect(screen.queryByTestId("phrase-reply-book-service-0")).toBeNull();
  });

  it("renders a simple normal-text phrase without optional sections", async () => {
    await render(
      <TranslationProvider>
        <PhraseCard isLargeText={false} phrase={SIMPLE_PHRASE} />
      </TranslationProvider>,
    );

    expect(screen.getByText("Prosím.")).toBeTruthy();
    expect(screen.queryByTestId("phrase-replies-toggle-simple")).toBeNull();
    expect(screen.queryByTestId("phrase-fallback-copy-simple")).toBeNull();
  });
});
