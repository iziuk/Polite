export const copyText = (text: string): void => {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return;
  }

  navigator.clipboard.writeText(text).catch((): void => undefined);
};
