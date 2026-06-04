"use client";

import { useMemo, useState } from "react";

import { PHRASE_PACKS, type IPhrase } from "@entities/phrase";

import { useTranslation } from "@shared/core/i18n";

import { PhraseCard } from "./phrase-card";
import { PhraseToolbar } from "./phrase-toolbar";

const filterPhrases = (phrases: readonly IPhrase[], query: string): readonly IPhrase[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return phrases;
  }

  return phrases.filter((phrase) => [phrase.ua, phrase.sk, phrase.phonetic_ua].some((phraseText) => phraseText.toLowerCase().includes(normalizedQuery)));
};

export const PhraseBrowser = ((): React.ReactElement => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [isLargeText, setIsLargeText] = useState(false);
  const [activePackId, setActivePackId] = useState(PHRASE_PACKS[0].id);
  const currentPack = useMemo(() => PHRASE_PACKS.find((pack) => pack.id === activePackId) ?? PHRASE_PACKS[0], [activePackId]);
  const filteredPhrases = useMemo(() => filterPhrases(currentPack.phrases, query), [currentPack.phrases, query]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("widgets.phrase-browser.page-title")}</h1>
        <p className="mt-1 text-gray-600">{t("widgets.phrase-browser.page-description")}</p>
      </header>

      <PhraseToolbar
        activePackId={activePackId}
        isLargeText={isLargeText}
        onChangePack={setActivePackId}
        onChangeQuery={setQuery}
        onToggleLargeText={() => setIsLargeText((currentIsLargeText) => !currentIsLargeText)}
        packs={PHRASE_PACKS}
        query={query}
      />

      <h2 className="mt-6 flex items-center gap-2 text-xl font-semibold">
        <span>{currentPack.emoji}</span>
        <span>{currentPack.title}</span>
      </h2>

      <section className="mt-4 grid gap-4">
        {filteredPhrases.map((phrase) => (
          <PhraseCard isLargeText={isLargeText} key={phrase.id} phrase={phrase} />
        ))}
        {filteredPhrases.length === 0 ? <div className="py-12 text-center text-gray-500">{t("widgets.phrase-browser.empty-state")}</div> : null}
      </section>

      <footer className="mt-10 text-sm text-gray-500">
        <div>
          {t("widgets.phrase-browser.footer-tip-before")} <span className="font-medium">🔊 {t("widgets.phrase-browser.speak-action")}</span>{" "}
          {t("widgets.phrase-browser.footer-tip-after")} <span className="font-medium">🆘 {t("widgets.phrase-browser.anti-stupor-action")}</span>.
        </div>
        <div className="mt-2">{t("widgets.phrase-browser.footer-next-step")}</div>
      </footer>
    </main>
  );
}) satisfies React.FC;
