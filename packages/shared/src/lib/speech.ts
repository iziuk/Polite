export const speak = (text: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  const synth = window.speechSynthesis;

  if (!synth) {
    return;
  }

  const voices = synth.getVoices();
  const slovakVoice = voices.find((voice) => /sk|slovak/i.test(voice.lang));
  const utterance = new SpeechSynthesisUtterance(text);

  if (slovakVoice) {
    utterance.voice = slovakVoice;
  }

  utterance.rate = 0.95;
  synth.cancel();
  synth.speak(utterance);
};
