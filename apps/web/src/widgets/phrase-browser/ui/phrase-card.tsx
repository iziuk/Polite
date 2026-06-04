"use client";

import type { IPhrase } from "@entities/phrase";

import { useState } from "react";

import { useTranslation } from "@shared/core/i18n";
import { copyText, speak } from "@shared/lib/browser";
import { classNames } from "@shared/lib/class-names";
import { Button } from "@shared/ui";

interface IPhraseCardProps {
  isLargeText: boolean;
  phrase: IPhrase;
}

export const PhraseCard = (({ isLargeText, phrase }: IPhraseCardProps): React.ReactElement => {
  const { t } = useTranslation();
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const baseTextClassName = isLargeText ? "text-2xl" : "text-lg";
  const phoneticClassName = isLargeText ? "text-xl" : "text-base";
  const expectedReplies = phrase.expected_replies ?? [];
  const fallbackPhrase = phrase.fallback;
  const hasExpectedReplies = expectedReplies.length > 0;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm uppercase tracking-wide text-gray-500">{t("widgets.phrase-browser.direction-label")}</div>
          <div className={classNames(baseTextClassName, "mt-1 font-medium text-gray-900")}>{phrase.sk}</div>
          <div className={classNames(phoneticClassName, "mt-1 italic text-gray-700")}>{phrase.phonetic_ua}</div>
          <div className="mt-2 text-sm text-gray-500">
            {t("widgets.phrase-browser.ukrainian-label")} {phrase.ua}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button onClick={() => speak(phrase.sk)} title={t("widgets.phrase-browser.speak-title")}>
            🔊 {t("widgets.phrase-browser.speak-action")}
          </Button>
          <Button onClick={() => copyText(phrase.sk)} title={t("widgets.phrase-browser.copy-title")}>
            📋 {t("widgets.phrase-browser.copy-action")}
          </Button>
        </div>
      </div>

      {hasExpectedReplies ? (
        <div className="mt-2">
          <Button onClick={() => setIsRepliesVisible((currentIsRepliesVisible) => !currentIsRepliesVisible)}>
            {isRepliesVisible ? t("widgets.phrase-browser.replies-hide-action") : t("widgets.phrase-browser.replies-show-action")}
          </Button>
          {isRepliesVisible ? (
            <div className="mt-3 grid gap-2">
              {expectedReplies.map((expectedReply) => (
                <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3 py-2" key={`${expectedReply.sk}-${expectedReply.ua}`}>
                  <div>
                    <div className={classNames(baseTextClassName, "text-gray-900")}>{expectedReply.sk}</div>
                    <div className="text-sm text-gray-500">
                      {t("widgets.phrase-browser.ukrainian-label")} {expectedReply.ua}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button aria-label={t("widgets.phrase-browser.speak-reply-aria-label")} onClick={() => speak(expectedReply.sk)} size="icon">
                      🔊
                    </Button>
                    <Button aria-label={t("widgets.phrase-browser.copy-reply-aria-label")} onClick={() => copyText(expectedReply.sk)} size="icon">
                      📋
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {fallbackPhrase ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={() => speak(fallbackPhrase.sk)} title={t("widgets.phrase-browser.fallback-title")}>
            🆘 {t("widgets.phrase-browser.anti-stupor-action")}
          </Button>
          <Button onClick={() => copyText(fallbackPhrase.sk)}>📝 {t("widgets.phrase-browser.copy-fallback-action")}</Button>
        </div>
      ) : null}
    </article>
  );
}) satisfies React.FC<IPhraseCardProps>;
