import type { Category, Item } from "../types/catalog";
import { fallbackCategories, fallbackItems } from "../data/fallbackCatalog";

type CatalogPayload = {
  categories: Category[];
  items: Item[];
};

export async function getCatalogData(): Promise<CatalogPayload> {
  try {
    const response = await fetch("/catalog.json", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load catalog.json: ${response.status}`);
    }

    const data = (await response.json()) as CatalogPayload;

    return {
      categories: data.categories ?? fallbackCategories,
      items: data.items ?? fallbackItems,
    };
  } catch (error) {
    console.error("Failed to load catalog data", error);

    return {
      categories: fallbackCategories,
      items: fallbackItems,
    };
  }
}