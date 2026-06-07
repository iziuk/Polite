import { describe, expect, it, jest } from "@jest/globals";

import { copyText, speak } from "./actions";

const mockSetStringAsync = jest.fn();
const mockSpeechStop = jest.fn();
const mockSpeechSpeak = jest.fn();

jest.mock("expo-clipboard", () => ({
  setStringAsync: (text: string) => mockSetStringAsync(text),
}));

jest.mock("expo-speech", () => ({
  speak: (text: string, options: unknown) => mockSpeechSpeak(text, options),
  stop: () => mockSpeechStop(),
}));

describe("mobile native actions", () => {
  it("copies text and swallows rejected clipboard writes", async () => {
    mockSetStringAsync.mockResolvedValueOnce(undefined as never);

    copyText("Dobrý deň");
    await Promise.resolve();

    expect(mockSetStringAsync).toHaveBeenCalledWith("Dobrý deň");

    mockSetStringAsync.mockRejectedValueOnce(new Error("denied") as never);

    expect(() => copyText("Prosím")).not.toThrow();
    await Promise.resolve();

    expect(mockSetStringAsync).toHaveBeenCalledWith("Prosím");
  });

  it("stops current speech and speaks Slovak text", () => {
    speak("Dobrý deň");

    expect(mockSpeechStop).toHaveBeenCalledTimes(1);
    expect(mockSpeechSpeak).toHaveBeenCalledWith("Dobrý deň", {
      language: "sk-SK",
      rate: 0.95,
    });
  });
});
