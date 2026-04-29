import type { Item } from "../types/catalog";

export function applyCategoryFilters(
  itemsList: Item[],
  activeFilters: Record<string, string>,
): Item[] {
  return itemsList.filter((item) => {
    return Object.entries(activeFilters).every(([key, value]) => {
      return item.attrs[key] === value;
    });
  });
}