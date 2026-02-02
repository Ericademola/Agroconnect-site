export const capitalizeFirstLetter = (word: unknown): string | undefined => {
  if (typeof word === "string" && word.length > 0) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return undefined;
};