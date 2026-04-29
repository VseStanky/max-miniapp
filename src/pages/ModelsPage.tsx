type Category = {
  id: string;
  emoji: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
  priceFrom: string;
  specsList: string[];
};

type Props = {
  category: Category;
  items: Item[];
  onBack: () => void;
  onOpenItem: (itemId: string) => void;
  onOpenLead: () => void;
};

export default function ModelsPage({
  category,
  items,
  onBack,
  onOpenItem,
  onOpenLead,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← К фильтрам
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{category.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Найдено моделей: {items.length}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item.id)}
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm"
            >
              <div className="font-semibold text-slate-900">{item.name}</div>
              <div className="mt-1 text-sm text-slate-600">{item.priceFrom}</div>
              <div className="mt-2 text-sm text-slate-500">
                {item.specsList.slice(0, 2).join(" • ")}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onOpenLead}
          className="rounded-2xl bg-white px-4 py-4 text-slate-900 shadow-sm"
        >
          📝 Заявка на КП по разделу
        </button>
      </div>
    </div>
  );
}