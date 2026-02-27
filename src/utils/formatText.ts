export const capitalizeFirstLetter = (word: unknown): string | undefined => {
  if (typeof word === "string" && word.length > 0) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
  }
  return undefined;
};

export const formatWithAnd = (items: string[]) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(" & ");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
};

export function joinCapitalizedItems(arr: string[], delimiter = ", ") {
  // Filter items starting with a capital letter
  const capitalizedItems = arr.filter((item) => /^[A-Z]/.test(item));

  // Transform each item: capitalize first letter, lowercase the rest
  const formattedItems = capitalizedItems.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
  );

  // Join with chosen delimiter
  return formattedItems.join(delimiter);
}
