type Category = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  itemsCount: number;
};

type Props = {
  category: Category;
  itemsCount: number;
  onBack: () => void;
  onOpenModels: () => void;
  onOpenLead: () => void;
};

export default function CategoryFiltersPage({
  category,
  itemsCount,
  onBack,
  onOpenModels,
  onOpenLead,
}: Props) {
  const mockFacets = [
    "Цена",
    "Тип станка",
    "Рабочая зона (X, Y)",
    "Мощность источника",
  ];

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
            Моделей в каталоге: {itemsCount}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            На следующем шаге сюда подключим реальные фильтры.
          </p>
        </div>

        <div className="space-y-3">
          {mockFacets.map((facet) => (
            <button
              key={facet}
              onClick={() => alert(`Экран значений фильтра "${facet}" сделаем следующим шагом`)}
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
            >
              <div className="font-semibold text-slate-900">➕ {facet}</div>
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <button
            onClick={onOpenModels}
            className="rounded-2xl bg-slate-900 px-4 py-4 text-white"
          >
            📋 Показать модели ({itemsCount})
          </button>

          <button
            onClick={onOpenLead}
            className="rounded-2xl bg-white px-4 py-4 text-slate-900 shadow-sm"
          >
            📝 Заявка на КП по разделу
          </button>
        </div>
      </div>
    </div>
  );
}