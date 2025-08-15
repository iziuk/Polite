export function speak(text: string) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  const voices = synth.getVoices();
  const skVoice = voices.find((v) => /sk|slovak/i.test(v.lang));
  const utter = new SpeechSynthesisUtterance(text);
  if (skVoice) utter.voice = skVoice;
  utter.rate = 0.95;
  synth.cancel();
  synth.speak(utter);
}