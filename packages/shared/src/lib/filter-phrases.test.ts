import type { IPhrase } from "../types";

import { describe, expect, it } from "vitest";

import { filterPhrases } from "./filter-phrases";

const PHRASES: readonly IPhrase[] = [
  {
    id: "diagnostics",
    phonetic_ua: "Даме діагностіку.",
    sk: "Dáme diagnostiku.",
    ua: "Зробимо діагностику.",
  },
  {
    id: "ticket",
    phonetic_ua: "Єден ліскок, просім.",
    sk: "Jeden lístok, prosím.",
    ua: "Один квиток, будь ласка.",
  },
];

describe("filterPhrases", () => {
  it("returns the original list for an empty or whitespace-only query", () => {
    expect(filterPhrases(PHRASES, "")).toBe(PHRASES);
    expect(filterPhrases(PHRASES, "   ")).toBe(PHRASES);
  });

  it("matches Ukrainian, Slovak, and phonetic text case-insensitively", () => {
    expect(filterPhrases(PHRASES, "ДІАГНОСТИКУ")).toEqual([PHRASES[0]]);
    expect(filterPhrases(PHRASES, "lístok")).toEqual([PHRASES[1]]);
    expect(filterPhrases(PHRASES, "ліскок")).toEqual([PHRASES[1]]);
  });

  it("returns an empty list when no phrase matches", () => {
    expect(filterPhrases(PHRASES, "missing phrase")).toEqual([]);
  });
});
