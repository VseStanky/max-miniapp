import { useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryFiltersPage from "./pages/CategoryFiltersPage";
import ModelsPage from "./pages/ModelsPage";
import ModelPage from "./pages/ModelPage";
import LeadPage from "./pages/LeadPage";
import FacetValuesPage from "./pages/FacetValuesPage";
import { categories, items } from "./data/catalog";
import { facetsByCategory } from "./data/facets";
import { applyCategoryFilters } from "./utils/catalog";
import type { ActiveFilters } from "./types/catalog";

type Screen =
  | { name: "home" }
  | { name: "categories" }
  | { name: "filters"; categoryId: string }
  | { name: "facet"; categoryId: string; facetKey: string }
  | { name: "models"; categoryId: string }
  | { name: "model"; categoryId: string; itemId: string }
  | { name: "lead"; categoryId?: string; itemId?: string };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const selectedCategory =
    "categoryId" in screen
      ? categories.find((c) => c.id === screen.categoryId) ?? null
      : null;

  const selectedItem =
    "itemId" in screen
      ? items.find((i) => i.id === screen.itemId) ?? null
      : null;

  const selectedFacets = selectedCategory
    ? facetsByCategory[selectedCategory.id] ?? []
    : [];

  const currentCategoryFilters =
    selectedCategory ? activeFilters[selectedCategory.id] ?? {} : {};

  const rawCategoryItems = useMemo(() => {
    if (!selectedCategory) return [];
    return items.filter((item) => item.categoryId === selectedCategory.id);
  }, [selectedCategory]);

  const filteredCategoryItems = useMemo(() => {
    if (!selectedCategory) return [];
    return applyCategoryFilters(rawCategoryItems, currentCategoryFilters);
  }, [selectedCategory, rawCategoryItems, currentCategoryFilters]);

  const selectedFacet =
    screen.name === "facet" && selectedCategory
      ? selectedFacets.find((facet) => facet.key === screen.facetKey) ?? null
      : null;

  const setFacetValue = (categoryId: string, facetKey: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] ?? {}),
        [facetKey]: value,
      },
    }));
  };

  const clearFacetValue = (categoryId: string, facetKey: string) => {
    setActiveFilters((prev) => {
      const nextCategoryFilters = { ...(prev[categoryId] ?? {}) };
      delete nextCategoryFilters[facetKey];

      return {
        ...prev,
        [categoryId]: nextCategoryFilters,
      };
    });
  };

  const clearAllFilters = (categoryId: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [categoryId]: {},
    }));
  };

  if (screen.name === "home") {
    return (
      <HomePage
        onOpenCatalog={() => setScreen({ name: "categories" })}
        onOpenLead={() => setScreen({ name: "lead" })}
        onOpenAbout={() => alert("Раздел 'О компании' сделаем следующим шагом")}
        onOpenContacts={() => alert("Раздел 'Контакты' сделаем следующим шагом")}
      />
    );
  }

  if (screen.name === "categories") {
    return (
      <CategoriesPage
        categories={categories}
        onBack={() => setScreen({ name: "home" })}
        onOpenCategory={(categoryId) => setScreen({ name: "filters", categoryId })}
      />
    );
  }

  if (screen.name === "filters" && selectedCategory) {
    return (
      <CategoryFiltersPage
        category={selectedCategory}
        facets={selectedFacets}
        activeFilters={currentCategoryFilters}
        totalCount={rawCategoryItems.length}
        filteredCount={filteredCategoryItems.length}
        onBack={() => setScreen({ name: "categories" })}
        onOpenFacet={(facetKey) =>
          setScreen({ name: "facet", categoryId: selectedCategory.id, facetKey })
        }
        onOpenModels={() =>
          setScreen({ name: "models", categoryId: selectedCategory.id })
        }
        onOpenLead={() =>
          setScreen({ name: "lead", categoryId: selectedCategory.id })
        }
        onResetAll={() => clearAllFilters(selectedCategory.id)}
      />
    );
  }

  if (screen.name === "facet" && selectedCategory && selectedFacet) {
    return (
      <FacetValuesPage
        facet={selectedFacet}
        activeValue={currentCategoryFilters[selectedFacet.key]}
        onBack={() => setScreen({ name: "filters", categoryId: selectedCategory.id })}
        onSelectValue={(value) => {
          setFacetValue(selectedCategory.id, selectedFacet.key, value);
          setScreen({ name: "filters", categoryId: selectedCategory.id });
        }}
        onClearValue={() => {
          clearFacetValue(selectedCategory.id, selectedFacet.key);
          setScreen({ name: "filters", categoryId: selectedCategory.id });
        }}
      />
    );
  }

  if (screen.name === "models" && selectedCategory) {
    return (
      <ModelsPage
        category={selectedCategory}
        items={filteredCategoryItems}
        totalCount={rawCategoryItems.length}
        onBack={() => setScreen({ name: "filters", categoryId: selectedCategory.id })}
        onOpenItem={(itemId) =>
          setScreen({ name: "model", categoryId: selectedCategory.id, itemId })
        }
        onOpenLead={() =>
          setScreen({ name: "lead", categoryId: selectedCategory.id })
        }
      />
    );
  }

  if (screen.name === "model" && selectedCategory && selectedItem) {
    return (
      <ModelPage
        category={selectedCategory}
        item={selectedItem}
        onBack={() => setScreen({ name: "models", categoryId: selectedCategory.id })}
        onHome={() => setScreen({ name: "home" })}
        onOpenLead={() =>
          setScreen({
            name: "lead",
            categoryId: selectedCategory.id,
            itemId: selectedItem.id,
          })
        }
      />
    );
  }

  if (screen.name === "lead") {
    return (
      <LeadPage
        category={selectedCategory}
        item={selectedItem}
        onBack={() =>
          screen.itemId && screen.categoryId
            ? setScreen({
                name: "model",
                categoryId: screen.categoryId,
                itemId: screen.itemId,
              })
            : screen.categoryId
            ? setScreen({ name: "filters", categoryId: screen.categoryId })
            : setScreen({ name: "home" })
        }
        onDone={() => setScreen({ name: "home" })}
      />
    );
  }

  return null;
}