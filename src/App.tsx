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
  specs?: string[];
};

const categories: Category[] = [
  {
    id: "laser",
    name: "Лазерные станки с ЧПУ",
    emoji: "🔥",
    description: "Резка листового металла, труб и профиля с высокой точностью.",
  },
  {
    id: "press",
    name: "Листогибочные прессы",
    emoji: "🛠️",
    description: "Гибка листового металла для серийного и индивидуального производства.",
  },
  {
    id: "lathe",
    name: "Токарные станки с ЧПУ",
    emoji: "⚙️",
    description: "Для обработки валов, втулок, фланцев и других деталей вращения.",
  },
  {
    id: "milling",
    name: "Фрезерные станки с ЧПУ",
    emoji: "🧩",
    description: "Фрезерная обработка деталей сложной геометрии и корпусных изделий.",
  },
  {
    id: "edm",
    name: "Электроэрозионные станки",
    emoji: "⚡",
    description: "Проволочно-вырезная и электроэрозионная обработка металла.",
  },
  {
    id: "band",
    name: "Ленточнопильные станки",
    emoji: "🔩",
    description: "Надёжные решения для резки металлического проката и заготовок.",
  },
  {
    id: "welding",
    name: "Лазерная сварка и очистка",
    emoji: "✨",
    description: "Компактные и мощные аппараты для сварки, очистки и подготовки поверхности.",
  },
];

const products: Product[] = [
  {
    id: "laser-1",
    categoryId: "laser",
    name: "LaserCut 3015 1500W",
    price: "от 1 950 000 ₽",
    description: "Станок лазерной резки с рабочим полем 3000×1500 мм для стабильной ежедневной нагрузки.",
    specs: ["Поле: 3000×1500 мм", "Источник: 1500W", "Материалы: черный металл, нержавейка, алюминий"],
  },
  {
    id: "laser-2",
    categoryId: "laser",
    name: "LaserCut 3015 3000W",
    price: "от 2 600 000 ₽",
    description: "Более производительное решение для предприятий с повышенными объёмами раскроя.",
    specs: ["Поле: 3000×1500 мм", "Источник: 3000W", "Высокая скорость резки"],
  },
  {
    id: "press-1",
    categoryId: "press",
    name: "PressMaster 100T",
    price: "от 3 100 000 ₽",
    description: "Листогибочный пресс для типовых задач гибки металла.",
    specs: ["Усилие: 100 тонн", "ЧПУ управление", "Для цехов и производств"],
  },
  {
    id: "lathe-1",
    categoryId: "lathe",
    name: "TurnPro CK6140",
    price: "от 2 200 000 ₽",
    description: "Универсальный токарный станок с ЧПУ для широкого спектра деталей.",
    specs: ["Стабильная геометрия", "Подходит для серийной работы", "Надёжная база"],
  },
  {
    id: "milling-1",
    categoryId: "milling",
    name: "MillCenter VMC850",
    price: "от 3 400 000 ₽",
    description: "Вертикальный обрабатывающий центр для точной фрезерной обработки.",
    specs: ["Класс VMC", "Для сложных деталей", "Для инструментальных задач"],
  },
  {
    id: "edm-1",
    categoryId: "edm",
    name: "EDM Start 400",
    price: "по запросу",
    description: "Электроэрозионный станок для точной обработки трудных материалов.",
    specs: ["Проволочно-вырезная обработка", "Точность", "Сложный контур"],
  },
  {
    id: "band-1",
    categoryId: "band",
    name: "BandSaw 500",
    price: "от 890 000 ₽",
    description: "Полуавтоматический ленточнопильный станок для металла.",
    specs: ["Надёжный привод", "Для заготовительного участка", "Стабильный рез"],
  },
  {
    id: "welding-1",
    categoryId: "welding",
    name: "LaserWeld 1500",
    price: "от 420 000 ₽",
    description: "Ручной аппарат лазерной сварки для современного производства.",
    specs: ["Мощность: 1500W", "Компактный формат", "Подходит для сварки и очистки"],
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
      <div className="min-h-screen bg-[#f3f5f7] text-slate-900">
        <div className="mx-auto max-w-md px-4 pb-8 pt-4">
          <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-5 text-white shadow-lg">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-300">
              ВсеСтанки
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight">
              Каталог
              <br />
              промышленного оборудования
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Подберите подходящий станок, посмотрите доступные модели и отправьте заявку на коммерческое предложение.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/90">
                ЧПУ оборудование
              </div>
              <div className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/90">
                Подбор под задачу
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Категории</div>
              <div className="text-sm text-slate-500">Выберите направление оборудования</div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {categories.map((category) => {
              const count = products.filter((p) => p.categoryId === category.id).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setScreen({ name: "category", categoryId: category.id })}
                  className="w-full rounded-[24px] border border-white bg-white p-4 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:scale-[0.99]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      {category.emoji ?? "📦"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-[15px] font-semibold leading-5 text-slate-900">
                          {category.name}
                        </h2>
                        <div className="shrink-0 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
                          {count}
                        </div>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {category.description}
                      </p>

                      <div className="mt-3 text-sm font-medium text-slate-900">
                        Смотреть модели →
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 shadow-sm"
            >
              О компании
            </button>
            <button
              type="button"
              className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 shadow-sm"
            >
              Контакты
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen.name === "category") {
    return (
      <div className="min-h-screen bg-[#f3f5f7] text-slate-900">
        <div className="mx-auto max-w-md px-4 pb-8 pt-4">
          <button
            type="button"
            onClick={() => setScreen({ name: "home" })}
            className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          >
            ← Назад
          </button>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Категория
            </div>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900">
              {currentCategory?.name ?? "Без названия"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {currentCategory?.description ?? ""}
            </p>
            <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Моделей: {currentProducts.length}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {currentProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setScreen({ name: "product", productId: product.id })}
                className="block w-full rounded-[24px] border border-white bg-white p-4 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-md active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-slate-900">
                      {product.name}
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-700">
                      {product.price ?? "по запросу"}
                    </div>
                  </div>

                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    КП
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.description ?? ""}
                </p>

                <div className="mt-4 text-sm font-medium text-slate-900">
                  Подробнее →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f5f7] text-slate-900">
      <div className="mx-auto max-w-md px-4 pb-8 pt-4">
        <button
          type="button"
          onClick={() =>
            currentCategory
              ? setScreen({ name: "category", categoryId: currentCategory.id })
              : setScreen({ name: "home" })
          }
          className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
        >
          ← Назад
        </button>

        <div className="rounded-[28px] bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Оборудование
          </div>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900">
            {currentProduct?.name ?? "Товар"}
          </h1>
          <div className="mt-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">
            {currentProduct?.price ?? "по запросу"}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {currentProduct?.description ?? ""}
          </p>

          {currentProduct?.specs?.length ? (
            <div className="mt-5 space-y-2">
              {currentProduct.specs.map((spec) => (
                <div
                  key={spec}
                  className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {spec}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">
            Запросить коммерческое предложение
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Оставьте контакты, и мы подберём оборудование под вашу задачу.
          </p>

          <form className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
            <textarea
              placeholder="Комментарий или задача"
              rows={4}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
            <button
              type="button"
              className="w-full rounded-2xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
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