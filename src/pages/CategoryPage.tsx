import type { ActiveFilters, Category, Item } from "../types/catalog";

type Props = {
  category: Category;
  items: Item[];
  activeFilters: ActiveFilters;
  onBack: () => void;
  onOpenItem: (itemId: string) => void;
  onOpenFilters: () => void;
};

export default function CategoryPage({
  category,
  items,
  activeFilters,
  onBack,
  onOpenItem,
  onOpenFilters,
}: Props) {
  const activeFiltersCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Категория</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {category.name}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {category.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-sm text-slate-500">
              Найдено моделей: {items.length}
            </div>

            <button
              onClick={onOpenFilters}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Фильтры{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-sm">
            По выбранным фильтрам ничего не найдено.
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item.id)}
              className="block w-full rounded-2xl bg-white p-5 text-left shadow-sm"
            >
              <div className="text-base font-semibold text-slate-900">
                {item.name}
              </div>

              <div className="mt-2 text-sm text-slate-500">
                {item.priceFrom || "По запросу"}
              </div>

              {item.specsList?.length > 0 && (
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  {item.specsList.slice(0, 3).map((spec) => (
                    <div key={spec}>• {spec}</div>
                  ))}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}