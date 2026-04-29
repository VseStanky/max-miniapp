type Category = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  itemsCount: number;
};

type Props = {
  categories: Category[];
  onBack: () => void;
  onOpenCategory: (categoryId: string) => void;
};

export default function CategoriesPage({
  categories,
  onBack,
  onOpenCategory,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button
          onClick={onBack}
          className="text-sm font-medium text-slate-600"
        >
          ← Назад
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Категории</h1>
          <p className="mt-1 text-sm text-slate-500">
            Выберите раздел — далее сразу откроются фильтры.
          </p>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onOpenCategory(category.id)}
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
            >
              <div className="text-lg font-semibold text-slate-900">
                {category.emoji} {category.name}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                {category.description}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-700">
                Моделей: {category.itemsCount}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}