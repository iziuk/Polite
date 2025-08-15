"use client";
import {useState} from "react";
import type {Phrase} from "@/types/phrase";
import {speak} from "@/lib/speech";
import {copyText} from "@/lib/clipboard";

export default function PhraseCard({phrase, large}: { phrase: Phrase; large: boolean }) {
  const [showReplies, setShowReplies] = useState(false);
  const baseTextClass = large ? "text-2xl" : "text-lg";
  const phoneticClass = large ? "text-xl" : "text-base";

  return (
    <div className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition bg-white">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm uppercase tracking-wide text-gray-500">UA → SK</div>
          <div className={`${baseTextClass} font-medium mt-1 text-gray-900`}>{phrase.sk}</div>
          <div className={`${phoneticClass} text-gray-700 italic mt-1`}>{phrase.phonetic_ua}</div>
          <div className="text-sm text-gray-500 mt-2">Українською: {phrase.ua}</div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => speak(phrase.sk)} className="rounded-xl border px-3 py-2 hover:bg-gray-50"
                  title="Озвучити словацькою">🔊 Озвучити
          </button>
          <button onClick={() => copyText(phrase.sk)} className="rounded-xl border px-3 py-2 hover:bg-gray-50"
                  title="Скопіювати словацький текст">📋 Копіювати
          </button>
        </div>
      </div>

      {phrase.expected_replies?.length ? (
        <div className="mt-2">
          <button onClick={() => setShowReplies((s) => !s)} className="rounded-xl border px-3 py-2 hover:bg-gray-50">
            {showReplies ? "Приховати відповіді" : "Можливі відповіді"}
          </button>
          {showReplies && (
            <div className="mt-3 grid gap-2">
              {phrase.expected_replies.map((r, idx) => (
                <div key={idx} className="rounded-xl bg-gray-50 px-3 py-2 flex items-center justify-between">
                  <div>
                    <div className={`${baseTextClass} text-gray-900`}>{r.sk}</div>
                    <div className="text-sm text-gray-500">UA: {r.ua}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => speak(r.sk)} className="rounded-lg border px-2 py-1 hover:bg-white">🔊
                    </button>
                    <button onClick={() => copyText(r.sk)} className="rounded-lg border px-2 py-1 hover:bg-white">📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {phrase.fallback ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => speak(phrase.fallback!.sk)} className="rounded-xl border px-3 py-2 hover:bg-gray-50"
                  title="Анти-ступор: озвучити прохання повторити повільніше/уточнити">🆘 Не зрозумів
          </button>
          <button onClick={() => copyText(phrase.fallback!.sk)}
                  className="rounded-xl border px-3 py-2 hover:bg-gray-50">📝 Текст 🆘
          </button>
        </div>
      ) : null}
    </div>
  );
}