import * as Clipboard from "expo-clipboard";
import * as Speech from "expo-speech";

const SLOVAK_LANGUAGE_CODE = "sk-SK";

export const copyText = (text: string): void => {
  Clipboard.setStringAsync(text).catch((): void => undefined);
};

export const speak = (text: string): void => {
  void Speech.stop();
  Speech.speak(text, {
    language: SLOVAK_LANGUAGE_CODE,
    rate: 0.95,
  });
};
