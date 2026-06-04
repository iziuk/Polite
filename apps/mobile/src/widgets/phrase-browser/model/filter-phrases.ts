import type { IPhrase } from "@entities/phrase";

export const filterPhrases = (phrases: readonly IPhrase[], query: string): readonly IPhrase[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return phrases;
  }

  return phrases.filter((phrase) => [phrase.ua, phrase.sk, phrase.phonetic_ua].some((phraseText) => phraseText.toLowerCase().includes(normalizedQuery)));
};
