export interface IExpectedReply {
  sk: string;
  ua: string;
}

export interface IFallbackPhrase {
  sk: string;
  ua: string;
}

export interface IPhrase {
  id: string;
  ua: string;
  sk: string;
  phonetic_ua: string;
  audio?: string;
  expected_replies?: IExpectedReply[];
  fallback?: IFallbackPhrase;
}

export interface IPack {
  id: string;
  title: string;
  emoji?: string;
  phrases: IPhrase[];
}
