"use client";

import type { IPack } from "@entities/phrase";

import { useEffect, useState } from "react";

import { type TLocale, type TTranslationKey, getClientCookieLocale, isSupportedLocale, useTranslation } from "@shared/core/i18n";
import { Button, Select, TextInput } from "@shared/ui";

interface IPhraseToolbarProps {
  activePackId: string;
  isLargeText: boolean;
  onChangePack: (packId: string) => void;
  onChangeQuery: (query: string) => void;
  onToggleLargeText: () => void;
  packs: readonly IPack[];
  query: string;
}

const SEARCH_INPUT_ID = "phrase-search";
const LANGUAGE_SELECT_ID = "interface-language";
const LANGUAGE_OPTIONS: readonly { labelKey: TTranslationKey; locale: TLocale }[] = [
  { labelKey: "shared.i18n.locale-option-uk", locale: "uk" },
  { labelKey: "shared.i18n.locale-option-en", locale: "en" },
];

export const PhraseToolbar = (({
  activePackId,
  isLargeText,
  onChangePack,
  onChangeQuery,
  onToggleLargeText,
  packs,
  query,
}: IPhraseToolbarProps): React.ReactElement => {
  const { locale, setLocale, t } = useTranslation();
  const [selectedLocale, setSelectedLocale] = useState<TLocale>(locale);

  useEffect(() => {
    setSelectedLocale(getClientCookieLocale() ?? locale);
  }, [locale]);

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextLocale = event.target.value;

    if (isSupportedLocale(nextLocale)) {
      setSelectedLocale(nextLocale);
      setLocale(nextLocale);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {packs.map((pack) => (
          <Button key={pack.id} onClick={() => onChangePack(pack.id)} title={pack.title} variant={activePackId === pack.id ? "primary" : "secondary"}>
            <span className="mr-1">{pack.emoji ?? "📦"}</span>
            {pack.title}
          </Button>
        ))}
        <div className="flex-1" />
        <label className="flex flex-col gap-1 text-sm text-gray-500" htmlFor={LANGUAGE_SELECT_ID}>
          {t("shared.i18n.language-label")}
          <Select id={LANGUAGE_SELECT_ID} onChange={handleLocaleChange} value={selectedLocale}>
            {LANGUAGE_OPTIONS.map((languageOption) => (
              <option key={languageOption.locale} value={languageOption.locale}>
                {t(languageOption.labelKey)}
              </option>
            ))}
          </Select>
        </label>
        <Button onClick={onToggleLargeText}>
          {isLargeText ? t("widgets.phrase-browser.normal-text-action") : t("widgets.phrase-browser.large-text-action")}
        </Button>
      </div>

      <div>
        <label className="text-sm text-gray-500" htmlFor={SEARCH_INPUT_ID}>
          {t("widgets.phrase-browser.search-label")}
        </label>
        <TextInput
          id={SEARCH_INPUT_ID}
          onChange={(event) => onChangeQuery(event.target.value)}
          placeholder={t("widgets.phrase-browser.search-placeholder")}
          value={query}
        />
      </div>
    </div>
  );
}) satisfies React.FC<IPhraseToolbarProps>;
