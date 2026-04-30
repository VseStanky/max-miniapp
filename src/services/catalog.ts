import type { Category, Item } from "../types/catalog";
import { fallbackCategories, fallbackItems } from "../data/fallbackCatalog";

type CatalogPayload = {
  categories: Category[];
  items: Item[];
};

export async function getCatalogData(): Promise<CatalogPayload> {
  try {
    return {
      categories: fallbackCategories,
      items: fallbackItems,
    };
  } catch (error) {
    console.error("Failed to load catalog data", error);

    return {
      categories: fallbackCategories,
      items: fallbackItems,
    };
  }
}