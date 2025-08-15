export type ExpectedReply = { sk: string; ua: string };

export type Phrase = {
  id: string;
  ua: string;
  sk: string;
  phonetic_ua: string;
  audio?: string;
  expected_replies?: ExpectedReply[];
  fallback?: { sk: string; ua: string };
};

export type Pack = { id: string; title: string; emoji?: string; phrases: Phrase[] };