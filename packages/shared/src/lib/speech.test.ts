import { afterEach, describe, expect, it, vi } from "vitest";

import { speak } from "./speech";

class TestSpeechSynthesisUtterance {
  public rate = 1;

  public text: string;

  public voice?: SpeechSynthesisVoice;

  constructor(text: string) {
    this.text = text;
  }
}

const createVoice = (lang: string): SpeechSynthesisVoice => {
  const voice: SpeechSynthesisVoice = {
    default: false,
    lang,
    localService: true,
    name: lang,
    voiceURI: lang,
  };

  return voice;
};

describe("speak", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does nothing outside a browser window", () => {
    vi.stubGlobal("window", undefined);

    expect(() => speak("Dobrý deň")).not.toThrow();
  });

  it("does nothing when speech synthesis is unavailable", () => {
    vi.stubGlobal("window", {});

    expect(() => speak("Dobrý deň")).not.toThrow();
  });

  it("speaks with a Slovak voice when one is available", () => {
    const cancel = vi.fn();
    const speakMock = vi.fn();
    const slovakVoice = createVoice("sk-SK");

    vi.stubGlobal("SpeechSynthesisUtterance", TestSpeechSynthesisUtterance);
    vi.stubGlobal("window", {
      speechSynthesis: {
        cancel,
        getVoices: () => [createVoice("en-US"), slovakVoice],
        speak: speakMock,
      },
    });

    speak("Dobrý deň");

    const [[utterance]] = speakMock.mock.calls;

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(utterance.text).toBe("Dobrý deň");
    expect(utterance.rate).toBe(0.95);
    expect(utterance.voice).toBe(slovakVoice);
  });

  it("speaks without assigning a voice when no Slovak voice exists", () => {
    const speakMock = vi.fn();

    vi.stubGlobal("SpeechSynthesisUtterance", TestSpeechSynthesisUtterance);
    vi.stubGlobal("window", {
      speechSynthesis: {
        cancel: vi.fn(),
        getVoices: () => [createVoice("en-US")],
        speak: speakMock,
      },
    });

    speak("Dobrý deň");

    const [[utterance]] = speakMock.mock.calls;

    expect(utterance.voice).toBeUndefined();
  });
});
