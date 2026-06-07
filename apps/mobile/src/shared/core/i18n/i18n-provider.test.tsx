import type { FC } from "react";

import { describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { Button } from "@shared/ui";

import { TranslationProvider } from "./i18n-provider";
import { useTranslation } from "./use-translation";

const TranslationConsumer: FC = () => {
  const { locale, setLocale, t } = useTranslation();

  return (
    <>
      <Text>{locale}</Text>
      <Text>{t("widgets.phrase-browser.copy-action")}</Text>
      <Button onPress={() => setLocale("en")} testID="set-en">
        Set English
      </Button>
    </>
  );
};

describe("TranslationProvider", () => {
  it("provides locale state and translation helpers", async () => {
    await render(
      <TranslationProvider>
        <TranslationConsumer />
      </TranslationProvider>,
    );

    expect(screen.getByText("uk")).toBeTruthy();
    expect(screen.getByText("Копіювати")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("set-en"));

    expect(screen.getByText("en")).toBeTruthy();
    expect(screen.getByText("Copy")).toBeTruthy();
  });

  it("throws when useTranslation is used outside the provider", async () => {
    await expect(render(<TranslationConsumer />)).rejects.toThrow("useTranslation must be used within TranslationProvider");
  });
});
