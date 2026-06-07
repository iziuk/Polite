import type { IPack } from "@entities/phrase";

import { type FC } from "react";
import { Text, View } from "react-native";

import { type TLocale, type TTranslationKey, useTranslation } from "@shared/core/i18n";
import { Button, TextInput } from "@shared/ui";

import { phraseToolbarStyles } from "./phrase-toolbar.styles";

interface IPhraseToolbarProps {
  activePackId: string;
  isLargeText: boolean;
  onChangePack: (packId: string) => void;
  onChangeQuery: (query: string) => void;
  onToggleLargeText: () => void;
  packs: readonly IPack[];
  query: string;
}

const LANGUAGE_OPTIONS: readonly { labelKey: TTranslationKey; locale: TLocale }[] = [
  { labelKey: "shared.i18n.locale-option-uk", locale: "uk" },
  { labelKey: "shared.i18n.locale-option-en", locale: "en" },
];

export const PhraseToolbar: FC<IPhraseToolbarProps> = ({ activePackId, isLargeText, onChangePack, onChangeQuery, onToggleLargeText, packs, query }) => {
  const { locale, setLocale, t } = useTranslation();

  const handleLocaleChange = (nextLocale: TLocale): void => {
    setLocale(nextLocale);
  };

  return (
    <View style={phraseToolbarStyles.toolbar}>
      <View style={phraseToolbarStyles.packButtons}>
        {packs.map((pack) => (
          <Button
            key={pack.id}
            onPress={() => onChangePack(pack.id)}
            testID={`phrase-pack-${pack.id}`}
            variant={activePackId === pack.id ? "primary" : "secondary"}>
            {pack.emoji ?? "📦"} {pack.title}
          </Button>
        ))}
        <View style={phraseToolbarStyles.languageGroup}>
          <Text style={phraseToolbarStyles.languageLabel}>{t("shared.i18n.language-label")}</Text>
          <View style={phraseToolbarStyles.languageButtons}>
            {LANGUAGE_OPTIONS.map((languageOption) => (
              <Button
                accessibilityLabel={t(languageOption.labelKey)}
                key={languageOption.locale}
                onPress={() => handleLocaleChange(languageOption.locale)}
                testID={`language-${languageOption.locale}`}
                variant={locale === languageOption.locale ? "primary" : "secondary"}>
                {t(languageOption.labelKey)}
              </Button>
            ))}
          </View>
        </View>
        <Button onPress={onToggleLargeText} testID="large-text-toggle">
          {isLargeText ? t("widgets.phrase-browser.normal-text-action") : t("widgets.phrase-browser.large-text-action")}
        </Button>
      </View>

      <View style={phraseToolbarStyles.searchGroup}>
        <Text style={phraseToolbarStyles.searchLabel}>{t("widgets.phrase-browser.search-label")}</Text>
        <TextInput
          accessibilityLabel={t("widgets.phrase-browser.search-label")}
          onChangeText={onChangeQuery}
          placeholder={t("widgets.phrase-browser.search-placeholder")}
          returnKeyType="search"
          testID="phrase-search-input"
          value={query}
        />
      </View>
    </View>
  );
};
