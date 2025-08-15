"use client";
import type {Pack} from "@/types/phrase";

export default function Toolbar({
                                  packs,
                                  activePackId,
                                  onChangePack,
                                  query,
                                  onChangeQuery,
                                  large,
                                  onToggleLarge,
                                }: {
  packs: Pack[];
  activePackId: string;
  onChangePack: (id: string) => void;
  query: string;
  onChangeQuery: (v: string) => void;
  large: boolean;
  onToggleLarge: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {packs.map((p) => (
          <button
            key={p.id}
            onClick={() => onChangePack(p.id)}
            className={`rounded-2xl border px-4 py-2 ${
              activePackId === p.id ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-gray-50"
            }`}
            title={p.title}
          >
            <span className="mr-1">{p.emoji ?? "📦"}</span>
            {p.title}
          </button>
        ))}
        <div className="flex-1"/>
        <button onClick={onToggleLarge} className="rounded-xl border px-4 py-2 hover:bg-gray-50">
          {large ? "Звичайний текст" : "Великий текст"}
        </button>
      </div>

      <div>
        <label className="text-sm text-gray-500">Пошук по українському або словацькому тексту</label>
        <input
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="Наприклад: діагностика, термін, рахунок, квиток"
          className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}