import type { ActiveFilters, Category, Item } from "../types/catalog";

type Props = {
  category: Category;
  items: Item[];
  activeFilters: ActiveFilters;
  onBack: () => void;
  onApply: (filters: ActiveFilters) => void;
  onReset: () => void;
};

export default function FiltersPage({
  category,
  items,
  activeFilters,
  onBack,
  onApply,
  onReset,
}: Props) {
  const availableFilters = Array.from(
    new Set(items.flatMap((item) => Object.keys(item.attrs || {})))
  );

  function handleToggle(filterKey: string, value: string) {
    const nextFilters: ActiveFilters = {
      ...activeFilters,
      [filterKey]: activeFilters[filterKey] === value ? "" : value,
    };

    onApply(nextFilters);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Фильтры</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {category.name}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Выбери параметры, чтобы сузить список моделей.
          </p>
        </div>

        {availableFilters.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-sm">
            Для этой категории фильтры пока не заданы.
          </div>
        ) : (
          availableFilters.map((filterKey) => {
            const values = Array.from(
              new Set(
                items
                  .map((item) => item.attrs?.[filterKey])
                  .filter((value): value is string => Boolean(value))
              )
            );

            return (
              <div
                key={filterKey}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="text-base font-semibold text-slate-900">
                  {filterKey}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {values.map((value) => {
                    const isActive = activeFilters[filterKey] === value;

                    return (
                      <button
                        key={value}
                        onClick={() => handleToggle(filterKey, value)}
                        className={
                          isActive
                            ? "rounded-full bg-slate-900 px-3 py-2 text-sm text-white"
                            : "rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
                        }
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onApply(activeFilters)}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
          >
            Применить
          </button>

          <button
            onClick={onReset}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
}