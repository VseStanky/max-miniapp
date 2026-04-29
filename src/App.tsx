import { useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryFiltersPage from "./pages/CategoryFiltersPage";
import ModelsPage from "./pages/ModelsPage";
import ModelPage from "./pages/ModelPage";
import LeadPage from "./pages/LeadPage";

type Screen =
  | { name: "home" }
  | { name: "categories" }
  | { name: "filters"; categoryId: string }
  | { name: "models"; categoryId: string }
  | { name: "model"; categoryId: string; itemId: string }
  | { name: "lead"; categoryId?: string; itemId?: string };

type Category = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  itemsCount: number;
};

type Item = {
  id: string;
  categoryId: string;
  name: string;
  priceFrom: string;
  specsList: string[];
  attrs: Record<string, string>;
  url?: string;
};

const categories: Category[] = [
  {
    id: "laser",
    emoji: "🔥",
    name: "Лазерные станки с ЧПУ",
    description: "Станки для резки листового металла с ЧПУ.",
    itemsCount: 3,
  },
  {
    id: "press",
    emoji: "🛠️",
    name: "Листогибочные пресса с ЧПУ",
    description: "Оборудование для точной гибки металла.",
    itemsCount: 2,
  },
  {
    id: "turning",
    emoji: "⚙️",
    name: "Токарные станки с ЧПУ",
    description: "Токарная обработка деталей различной сложности.",
    itemsCount: 2,
  },
];

const items: Item[] = [
  {
    id: "lf3015gar-12kw",
    categoryId: "laser",
    name: "G.Weike LF3015GAR-12kW",
    priceFrom: "от 12 500 000 ₽",
    specsList: [
      "Рабочее поле 1500×3000",
      "Мощность источника 12 000 Вт",
      "Закрытый тип",
    ],
    attrs: {
      "Тип станка": "Закрытый тип",
      "Рабочая зона (X, Y)": "1500x3000",
      "Мощность источника": "12 000",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "lf3015e-3kw",
    categoryId: "laser",
    name: "G.Weike LF3015E-3kW",
    priceFrom: "от 4 900 000 ₽",
    specsList: [
      "Рабочее поле 1500×3000",
      "Мощность источника 3000 Вт",
      "Открытый тип",
    ],
    attrs: {
      "Тип станка": "Открытый тип",
      "Рабочая зона (X, Y)": "1500x3000",
      "Мощность источника": "3 000",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "lf4020gar-6kw",
    categoryId: "laser",
    name: "G.Weike LF4020GAR-6kW",
    priceFrom: "от 8 700 000 ₽",
    specsList: [
      "Рабочее поле 2000×4000",
      "Мощность источника 6000 Вт",
      "Закрытый тип",
    ],
    attrs: {
      "Тип станка": "Закрытый тип",
      "Рабочая зона (X, Y)": "2000x4000",
      "Мощность источника": "6 000",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "press-100t",
    categoryId: "press",
    name: "Листогибочный пресс PBH 100T3200",
    priceFrom: "от 3 200 000 ₽",
    specsList: ["Усилие 100 т", "Длина гиба 3200 мм"],
    attrs: {
      "Усилие (т)": "100",
      "Длина гиба, мм": "3200",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "press-160t",
    categoryId: "press",
    name: "Листогибочный пресс PBH 160T4000",
    priceFrom: "от 5 400 000 ₽",
    specsList: ["Усилие 160 т", "Длина гиба 4000 мм"],
    attrs: {
      "Усилие (т)": "160",
      "Длина гиба, мм": "4000",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "turn-500",
    categoryId: "turning",
    name: "Токарный станок CK6150",
    priceFrom: "от 2 800 000 ₽",
    specsList: ["Диаметр обработки 500 мм", "ЧПУ Siemens"],
    attrs: {
      "Диаметр обработки": "500",
      "Система ЧПУ": "Siemens",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "turn-630",
    categoryId: "turning",
    name: "Токарный станок CK6163",
    priceFrom: "от 3 600 000 ₽",
    specsList: ["Диаметр обработки 630 мм", "ЧПУ Fanuc"],
    attrs: {
      "Диаметр обработки": "630",
      "Система ЧПУ": "Fanuc",
    },
    url: "https://vsestanky.ru",
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  const selectedCategory =
    "categoryId" in screen
      ? categories.find((c) => c.id === screen.categoryId) ?? null
      : null;

  const selectedItem =
    "itemId" in screen
      ? items.find((i) => i.id === screen.itemId) ?? null
      : null;

  const categoryItems = useMemo(() => {
    if (!selectedCategory) return [];
    return items.filter((item) => item.categoryId === selectedCategory.id);
  }, [selectedCategory]);

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
        itemsCount={categoryItems.length}
        onBack={() => setScreen({ name: "categories" })}
        onOpenModels={() =>
          setScreen({ name: "models", categoryId: selectedCategory.id })
        }
        onOpenLead={() =>
          setScreen({ name: "lead", categoryId: selectedCategory.id })
        }
      />
    );
  }

  if (screen.name === "models" && selectedCategory) {
    return (
      <ModelsPage
        category={selectedCategory}
        items={categoryItems}
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