import { type FC, useState } from "react";
import { Text, View } from "react-native";

import type { IPhrase } from "@entities/phrase";

import { useTranslation } from "@shared/core/i18n";
import { copyText, speak } from "@shared/lib/native";
import { Button } from "@shared/ui";

import { phraseCardStyles } from "./phrase-card.styles";

interface IPhraseCardProps {
  isLargeText: boolean;
  phrase: IPhrase;
}

export const PhraseCard: FC<IPhraseCardProps> = ({ isLargeText, phrase }) => {
  const { t } = useTranslation();
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const expectedReplies = phrase.expected_replies ?? [];
  const fallbackPhrase = phrase.fallback;
  const hasExpectedReplies = expectedReplies.length > 0;
  const phraseTextStyle = isLargeText ? phraseCardStyles.phraseLarge : phraseCardStyles.phraseNormal;
  const phoneticTextStyle = isLargeText ? phraseCardStyles.phoneticLarge : phraseCardStyles.phoneticNormal;

  return (
    <View style={phraseCardStyles.card}>
      <View style={phraseCardStyles.header}>
        <View style={phraseCardStyles.body}>
          <Text style={phraseCardStyles.direction}>{t("widgets.phrase-browser.direction-label")}</Text>
          <Text style={[phraseCardStyles.phrase, phraseTextStyle]}>{phrase.sk}</Text>
          <Text style={[phraseCardStyles.phonetic, phoneticTextStyle]}>{phrase.phonetic_ua}</Text>
          <Text style={phraseCardStyles.translation}>
            {t("widgets.phrase-browser.ukrainian-label")} {phrase.ua}
          </Text>
        </View>

        <View style={phraseCardStyles.actionRow}>
          <Button onPress={() => speak(phrase.sk)} variant="primary">
            🔊 {t("widgets.phrase-browser.speak-action")}
          </Button>
          <Button onPress={() => copyText(phrase.sk)}>📋 {t("widgets.phrase-browser.copy-action")}</Button>
        </View>
      </View>

      {hasExpectedReplies ? (
        <View>
          <Button style={phraseCardStyles.replyToggle} onPress={() => setIsRepliesVisible((currentIsRepliesVisible) => !currentIsRepliesVisible)}>
            {isRepliesVisible ? t("widgets.phrase-browser.replies-hide-action") : t("widgets.phrase-browser.replies-show-action")}
          </Button>
          {isRepliesVisible ? (
            <View style={phraseCardStyles.replies}>
              {expectedReplies.map((expectedReply) => (
                <View style={phraseCardStyles.replyCard} key={`${expectedReply.sk}-${expectedReply.ua}`}>
                  <View style={phraseCardStyles.replyTextBlock}>
                    <Text style={[phraseCardStyles.phrase, phraseTextStyle]}>{expectedReply.sk}</Text>
                    <Text style={phraseCardStyles.translation}>
                      {t("widgets.phrase-browser.ukrainian-label")} {expectedReply.ua}
                    </Text>
                  </View>
                  <View style={phraseCardStyles.replyCopyRow}>
                    <Button accessibilityLabel={t("widgets.phrase-browser.speak-reply-aria-label")} onPress={() => speak(expectedReply.sk)} size="icon">
                      🔊
                    </Button>
                    <Button accessibilityLabel={t("widgets.phrase-browser.copy-reply-aria-label")} onPress={() => copyText(expectedReply.sk)} size="icon">
                      📋
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      {fallbackPhrase ? (
        <View style={phraseCardStyles.fallbackRow}>
          <Button onPress={() => speak(fallbackPhrase.sk)} variant="ghost">
            🆘 {t("widgets.phrase-browser.anti-stupor-action")}
          </Button>
          <Button onPress={() => copyText(fallbackPhrase.sk)}>📝 {t("widgets.phrase-browser.copy-fallback-action")}</Button>
        </View>
      ) : null}
    </View>
  );
};
