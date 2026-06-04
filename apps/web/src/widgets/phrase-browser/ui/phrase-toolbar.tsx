"use client";

import type { IPack } from "@entities/phrase";

import { useTranslation } from "@shared/core/i18n";
import { Button, TextInput } from "@shared/ui";

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

export const PhraseToolbar = (({
  activePackId,
  isLargeText,
  onChangePack,
  onChangeQuery,
  onToggleLargeText,
  packs,
  query,
}: IPhraseToolbarProps): React.ReactElement => {
  const { t } = useTranslation();

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
