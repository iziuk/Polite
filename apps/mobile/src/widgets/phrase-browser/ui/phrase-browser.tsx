import { filterPhrases } from "@polite/shared/lib";
import { type FC, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PHRASE_PACKS, type IPack } from "@entities/phrase";
import { useTranslation } from "@shared/core/i18n";

import { phraseBrowserStyles } from "./phrase-browser.styles";
import { PhraseCard } from "./phrase-card";
import { PhraseToolbar } from "./phrase-toolbar";

export const getPhrasePackById = (activePackId: string): IPack => PHRASE_PACKS.find((pack) => pack.id === activePackId) ?? PHRASE_PACKS[0];

export const PhraseBrowser: FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [isLargeText, setIsLargeText] = useState(false);
  const [activePackId, setActivePackId] = useState(PHRASE_PACKS[0].id);
  const currentPack = useMemo(() => getPhrasePackById(activePackId), [activePackId]);
  const filteredPhrases = useMemo(() => filterPhrases(currentPack.phrases, query), [currentPack.phrases, query]);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={phraseBrowserStyles.page} testID="phrase-browser-screen">
      <ScrollView keyboardShouldPersistTaps="handled" style={phraseBrowserStyles.scroll} contentContainerStyle={phraseBrowserStyles.content}>
        <View style={phraseBrowserStyles.header}>
          <Text style={phraseBrowserStyles.title}>{t("widgets.phrase-browser.page-title")}</Text>
          <Text style={phraseBrowserStyles.subtitle}>{t("widgets.phrase-browser.page-description")}</Text>
        </View>

        <PhraseToolbar
          activePackId={activePackId}
          isLargeText={isLargeText}
          onChangePack={setActivePackId}
          onChangeQuery={setQuery}
          onToggleLargeText={() => setIsLargeText((currentIsLargeText) => !currentIsLargeText)}
          packs={PHRASE_PACKS}
          query={query}
        />

        <View style={phraseBrowserStyles.packTitle} testID="phrase-browser-pack-title">
          <Text style={phraseBrowserStyles.packTitleEmoji}>{currentPack.emoji}</Text>
          <Text style={phraseBrowserStyles.packTitleText}>{currentPack.title}</Text>
        </View>

        <View style={phraseBrowserStyles.cardList} testID="phrase-card-list">
          {filteredPhrases.map((phrase) => (
            <PhraseCard isLargeText={isLargeText} key={phrase.id} phrase={phrase} />
          ))}
          {filteredPhrases.length === 0 ? <Text style={phraseBrowserStyles.emptyState}>{t("widgets.phrase-browser.empty-state")}</Text> : null}
        </View>

        <View style={phraseBrowserStyles.footer}>
          <Text style={phraseBrowserStyles.footerText}>
            {t("widgets.phrase-browser.footer-tip-before")}{" "}
            <Text style={phraseBrowserStyles.footerTextStrong}>🔊 {t("widgets.phrase-browser.speak-action")}</Text>{" "}
            {t("widgets.phrase-browser.footer-tip-after")}{" "}
            <Text style={phraseBrowserStyles.footerTextStrong}>🆘 {t("widgets.phrase-browser.anti-stupor-action")}</Text>.
          </Text>
          <Text style={phraseBrowserStyles.footerText}>{t("widgets.phrase-browser.footer-next-step")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
