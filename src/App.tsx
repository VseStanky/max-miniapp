// C:\projects\max-miniapp\src\App.tsx

import { useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
};

type Product = {
  id: string;
  categoryId: string;
  name: string;
  price?: string;
  description?: string;
};

const categories: Category[] = [
  {
    id: "laser",
    name: "Лазерные станки с ЧПУ",
    emoji: "🔥",
    description: "Станки для лазерной резки металла.",
  },
  {
    id: "press",
    name: "Листогибочные пресса с ЧПУ",
    emoji: "🛠️",
    description: "Оборудование для гибки листового металла.",
  },
  {
    id: "lathe",
    name: "Токарные станки с ЧПУ",
    emoji: "⚙️",
    description: "Токарные станки для серийного и единичного производства.",
  },
  {
    id: "milling",
    name: "Фрезерные станки с ЧПУ",
    emoji: "🧩",
    description: "Фрезерная обработка металла и сложных деталей.",
  },
  {
    id: "edm",
    name: "Электроэрозионные станки с ЧПУ",
    emoji: "⚡",
    description: "Электроэрозионная обработка деталей.",
  },
  {
    id: "band",
    name: "Ленточнопильные станки",
    emoji: "🔩",
    description: "Ленточнопильные решения для металла.",
  },
  {
    id: "welding",
    name: "Аппараты лазерной сварки",
    emoji: "✨",
    description: "Оборудование для лазерной сварки и очистки.",
  },
];

const products: Product[] = [
  {
    id: "laser-1",
    categoryId: "laser",
    name: "LaserCut 3015 1500W",
    price: "от 1 950 000 ₽",
    description: "Рабочее поле 3000x1500, источник 1500W.",
  },
  {
    id: "laser-2",
    categoryId: "laser",
    name: "LaserCut 3015 3000W",
    price: "от 2 600 000 ₽",
    description: "Для более производительной резки листового металла.",
  },
  {
    id: "laser-3",
    categoryId: "laser",
    name: "LaserTube 6020",
    price: "по запросу",
    description: "Комплекс для резки труб и профиля.",
  },
  {
    id: "press-1",
    categoryId: "press",
    name: "PressMaster 100T",
    price: "от 3 100 000 ₽",
    description: "Листогибочный пресс 100 тонн.",
  },
  {
    id: "press-2",
    categoryId: "press",
    name: "PressMaster 160T",
    price: "от 3 950 000 ₽",
    description: "Для более толстого металла и длинных деталей.",
  },
  {
    id: "lathe-1",
    categoryId: "lathe",
    name: "TurnPro CK6140",
    price: "от 2 200 000 ₽",
    description: "Универсальный токарный станок с ЧПУ.",
  },
  {
    id: "lathe-2",
    categoryId: "lathe",
    name: "TurnPro CK6150",
    price: "от 2 850 000 ₽",
    description: "Повышенная жёсткость и производительность.",
  },
  {
    id: "milling-1",
    categoryId: "milling",
    name: "MillCenter VMC850",
    price: "от 3 400 000 ₽",
    description: "Вертикальный обрабатывающий центр.",
  },
  {
    id: "edm-1",
    categoryId: "edm",
    name: "EDM Start 400",
    price: "по запросу",
    description: "Электроэрозионный проволочно-вырезной станок.",
  },
  {
    id: "band-1",
    categoryId: "band",
    name: "BandSaw 500",
    price: "от 890 000 ₽",
    description: "Полуавтоматический ленточнопильный станок.",
  },
  {
    id: "welding-1",
    categoryId: "welding",
    name: "LaserWeld 1500",
    price: "от 420 000 ₽",
    description: "Ручная лазерная сварка 1500W.",
  },
];

type Screen =
  | { name: "home" }
  | { name: "category"; categoryId: string }
  | { name: "product"; productId: string };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  const currentCategory =
    screen.name === "category"
      ? categories.find((c) => c.id === screen.categoryId) ?? null
      : screen.name === "product"
      ? categories.find(
          (c) =>
            c.id === products.find((p) => p.id === screen.productId)?.categoryId
        ) ?? null
      : null;

  const currentProducts = useMemo(() => {
    if (screen.name !== "category") return [];
    return products.filter((p) => p.categoryId === screen.categoryId);
  }, [screen]);

  const currentProduct =
    screen.name === "product"
      ? products.find((p) => p.id === screen.productId) ?? null
      : null;

  if (screen.name === "home") {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-md space-y-4 py-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">ВсеСтанки</div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Каталог оборудования
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Выберите категорию оборудования, чтобы посмотреть доступные
              модели.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => {
              const count = products.filter(
                (p) => p.categoryId === category.id
              ).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setScreen({ name: "category", categoryId: category.id })
                  }
                  className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xl">{category.emoji ?? "📦"}</div>
                      <h2 className="mt-2 text-base font-semibold text-slate-900">
                        {category.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {category.description}
                      </p>
                    </div>

                    <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {count}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen.name === "category") {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-md space-y-4 py-4">
          <button
            type="button"
            onClick={() => setScreen({ name: "home" })}
            className="text-sm font-medium text-slate-600"
          >
            ← Назад
          </button>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Категория</div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {currentCategory?.name ?? "Без названия"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {currentCategory?.description ?? ""}
            </p>
          </div>

          <div className="space-y-3">
            {currentProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() =>
                  setScreen({ name: "product", productId: product.id })
                }
                className="block w-full rounded-2xl bg-white p-5 text-left shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
              >
                <div className="text-base font-semibold text-slate-900">
                  {product.name}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {product.price ?? "по запросу"}
                </div>
                <div className="mt-3 text-sm leading-6 text-slate-600">
                  {product.description ?? ""}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // screen.name === "product"
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button
          type="button"
          onClick={() =>
            currentCategory
              ? setScreen({ name: "category", categoryId: currentCategory.id })
              : setScreen({ name: "home" })
          }
          className="text-sm font-medium text-slate-600"
        >
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Оборудование</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {currentProduct?.name ?? "Товар"}
          </h1>
          <div className="mt-3 text-sm font-medium text-slate-700">
            {currentProduct?.price ?? "по запросу"}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {currentProduct?.description ?? ""}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-base font-semibold text-slate-900">
            Оставить заявку
          </div>

          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
            <textarea
              placeholder="Комментарий"
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
            <button
              type="button"
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.99]"
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;