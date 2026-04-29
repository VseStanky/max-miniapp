type Category = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  itemsCount: number;
};

type Facet = {
  key: string;
  name: string;
  type: "checkbox" | "price";
  values: { value: string; count: number }[];
};

type Props = {
  category: Category;
  facets: Facet[];
  activeFilters: Record<string, string>;
  totalCount: number;
  filteredCount: number;
  onBack: () => void;
  onOpenFacet: (facetKey: string) => void;
  onOpenModels: () => void;
  onOpenLead: () => void;
  onResetAll: () => void;
};

export default function CategoryFiltersPage({
  category,
  facets,
  activeFilters,
  totalCount,
  filteredCount,
  onBack,
  onOpenFacet,
  onOpenModels,
  onOpenLead,
  onResetAll,
}: Props) {
  const activeEntries = Object.entries(activeFilters);

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← К категориям
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">{category.emoji} Категория</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{category.name}</h1>
          <p className="mt-3 text-sm text-slate-600">
            Подходит моделей: {filteredCount} из {totalCount}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Фильтры как в каталоге сайта — пока на мок-данных.
          </p>
        </div>

        {activeEntries.length > 0 ? (
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-900">
              Выбранные фильтры
            </div>
            <div className="space-y-2">
              {activeEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                >
                  ✅ {key}: {value}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          {facets.map((facet) => {
            const activeValue = activeFilters[facet.key];

            return (
              <button
                key={facet.key}
                onClick={() => onOpenFacet(facet.key)}
                className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
              >
                <div className="font-semibold text-slate-900">
                  {activeValue ? `✅ ${facet.name}: ${activeValue}` : `➕ ${facet.name}`}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Значений: {facet.values.length}
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid gap-3">
          <button
            onClick={onOpenModels}
            className="rounded-2xl bg-slate-900 px-4 py-4 text-white"
          >
            📋 Показать модели ({filteredCount})
          </button>

          <button
            onClick={onOpenLead}
            className="rounded-2xl bg-white px-4 py-4 text-slate-900 shadow-sm"
          >
            📝 Заявка на КП по разделу
          </button>

          {activeEntries.length > 0 ? (
            <button
              onClick={onResetAll}
              className="rounded-2xl bg-white px-4 py-4 text-red-600 shadow-sm"
            >
              ✖️ Сбросить все фильтры
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}