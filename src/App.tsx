import { useEffect, useMemo, useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";
import FiltersPage from "./pages/FiltersPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";

import { getCatalogData } from "./services/catalog";
import type { ActiveFilters, Category, Item } from "./types/catalog";

type Screen =
  | { name: "home" }
  | { name: "category"; categoryId: string }
  | { name: "item"; itemId: string }
  | { name: "filters"; categoryId: string }
  | { name: "about" }
  | { name: "contacts" };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await getCatalogData();
        setCategories(data.categories);
        setItems(data.items);
      } catch (error) {
        console.error("Failed to load catalog", error);
      } finally {
        setIsLoadingCatalog(false);
      }
    }

    void loadCatalog();
  }, []);

  const currentCategory =
    screen.name === "category" || screen.name === "filters"
      ? categories.find((category) => category.id === screen.categoryId) ?? null
      : null;

  const currentItem =
    screen.name === "item"
      ? items.find((item) => item.id === screen.itemId) ?? null
      : null;

  const filteredItems = useMemo(() => {
    if (screen.name !== "category") return [];

    const categoryItems = items.filter(
      (item) => item.categoryId === screen.categoryId
    );

    return categoryItems.filter((item) => {
      return Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;
        return item.attrs?.[key] === value;
      });
    });
  }, [screen, items, activeFilters]);

  if (isLoadingCatalog) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-md py-10 text-sm text-slate-500">
          Загрузка каталога…
        </div>
      </div>
    );
  }

  if (screen.name === "home") {
    return (
      <HomePage
        categories={categories}
        onOpenCategory={(categoryId) => setScreen({ name: "category", categoryId })}
        onOpenAbout={() => setScreen({ name: "about" })}
        onOpenContacts={() => setScreen({ name: "contacts" })}
      />
    );
  }

  if (screen.name === "category") {
    if (!currentCategory) {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="mx-auto max-w-md py-10 text-sm text-slate-500">
            Категория не найдена.
          </div>
        </div>
      );
    }

    return (
      <CategoryPage
        category={currentCategory}
        items={filteredItems}
        activeFilters={activeFilters}
        onBack={() => setScreen({ name: "home" })}
        onOpenItem={(itemId) => setScreen({ name: "item", itemId })}
        onOpenFilters={() =>
          setScreen({ name: "filters", categoryId: screen.categoryId })
        }
      />
    );
  }

  if (screen.name === "filters") {
    if (!currentCategory) {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="mx-auto max-w-md py-10 text-sm text-slate-500">
            Категория не найдена.
          </div>
        </div>
      );
    }

    return (
      <FiltersPage
        category={currentCategory}
        items={items.filter((item) => item.categoryId === screen.categoryId)}
        activeFilters={activeFilters}
        onBack={() => setScreen({ name: "category", categoryId: screen.categoryId })}
        onApply={(filters) => {
          setActiveFilters(filters);
          setScreen({ name: "category", categoryId: screen.categoryId });
        }}
        onReset={() => setActiveFilters({})}
      />
    );
  }

  if (screen.name === "item") {
    if (!currentItem) {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="mx-auto max-w-md py-10 text-sm text-slate-500">
            Модель не найдена.
          </div>
        </div>
      );
    }

    return (
      <ItemPage
        item={currentItem}
        onBack={() =>
          setScreen({ name: "category", categoryId: currentItem.categoryId })
        }
      />
    );
  }

  if (screen.name === "about") {
    return <AboutPage onBack={() => setScreen({ name: "home" })} />;
  }

  if (screen.name === "contacts") {
    return <ContactsPage onBack={() => setScreen({ name: "home" })} />;
  }

  return null;
}