import { type FC } from "react";
import { Text, View } from "react-native";

import type { IPack } from "@entities/phrase";

import { useTranslation } from "@shared/core/i18n";
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

export const PhraseToolbar: FC<IPhraseToolbarProps> = ({ activePackId, isLargeText, onChangePack, onChangeQuery, onToggleLargeText, packs, query }) => {
  const { t } = useTranslation();

  return (
    <View style={phraseToolbarStyles.toolbar}>
      <View style={phraseToolbarStyles.packButtons}>
        {packs.map((pack) => (
          <Button key={pack.id} onPress={() => onChangePack(pack.id)} variant={activePackId === pack.id ? "primary" : "secondary"}>
            {pack.emoji ?? "📦"} {pack.title}
          </Button>
        ))}
        <Button onPress={onToggleLargeText}>
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
          value={query}
        />
      </View>
    </View>
  );
};
