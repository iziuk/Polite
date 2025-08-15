"use client";
import {useMemo, useState} from "react";
import Toolbar from "@/components/Toolbar";
import PhraseCard from "@/components/PhraseCard";
import type {Pack, Phrase} from "@/types/phrase";

import autoservice from "@/data/packs/autoservice-sk.json";
import market from "@/data/packs/market-sk.json";
import pharmacy from "@/data/packs/pharmacy-sk.json";
import transport from "@/data/packs/transport-sk.json";

const PACKS: Pack[] = [autoservice as Pack, market as Pack, pharmacy as Pack, transport as Pack];

export default function Page() {
  const [query, setQuery] = useState("");
  const [large, setLarge] = useState(false);
  const [activePackId, setActivePackId] = useState(PACKS[0].id);

  const currentPack = PACKS.find((p) => p.id === activePackId)!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = currentPack.phrases;
    if (!q) return list;
    return list.filter((p: Phrase) => [p.ua, p.sk, p.phonetic_ua].some((t) => t.toLowerCase().includes(q)));
  }, [query, activePackId]);

  return (
    <main className="px-4 py-6 sm:py-10 mx-auto max-w-3xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Polite — розмовні пакети</h1>
        <p className="text-gray-600 mt-1">Швидкі фрази з фонетикою, варіантами відповідей та «анти‑ступор» кнопкою.
          Пакети: автосервіс, ринок, аптека, транспорт.</p>
      </header>

      <Toolbar
        packs={PACKS}
        activePackId={activePackId}
        onChangePack={setActivePackId}
        query={query}
        onChangeQuery={setQuery}
        large={large}
        onToggleLarge={() => setLarge((v) => !v)}
      />

      <h2 className="mt-6 text-xl font-semibold flex items-center gap-2">
        <span>{currentPack.emoji}</span>
        <span>{currentPack.title}</span>
      </h2>

      <section className="mt-4 grid gap-4">
        {filtered.map((ph) => (
          <PhraseCard key={ph.id} phrase={ph} large={large}/>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-12">Нічого не знайдено за запитом.</div>
        )}
      </section>

      <footer className="mt-10 text-sm text-gray-500">
        <div>
          Порада: натисни <span className="font-medium">🔊 Озвучити</span> — якщо відповідь швидка і незрозуміла, одразу
          ж тисни
          <span className="font-medium"> 🆘 Не зрозумів</span>.
        </div>
        <div className="mt-2">Далі винесемо офлайн (Next‑PWA) і простий CMS (Supabase) для редагування паків.</div>
      </footer>
    </main>
  );
}