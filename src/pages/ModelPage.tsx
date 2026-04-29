type Category = {
  name: string;
};

type Item = {
  name: string;
  priceFrom: string;
  specsList: string[];
  url?: string;
};

type Props = {
  category: Category;
  item: Item;
  onBack: () => void;
  onHome: () => void;
  onOpenLead: () => void;
};

export default function ModelPage({
  category,
  item,
  onBack,
  onHome,
  onOpenLead,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← К списку
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">{category.name}</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{item.name}</h1>
          <div className="mt-3 text-lg font-semibold text-slate-800">
            {item.priceFrom || "Цена по запросу"}
          </div>

          <div className="mt-4 space-y-2">
            {item.specsList.map((spec) => (
              <div
                key={spec}
                className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                {spec}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Срок поставки и условия гарантии уточняются в коммерческом предложении.
          </p>
        </div>

        <div className="grid gap-3">
          <button
            onClick={onOpenLead}
            className="rounded-2xl bg-slate-900 px-4 py-4 text-white"
          >
            📝 Запросить КП по этой модели
          </button>

          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white px-4 py-4 text-center text-slate-900 shadow-sm"
            >
              🌐 Открыть на сайте
            </a>
          ) : null}

          <button
            onClick={onHome}
            className="rounded-2xl bg-white px-4 py-4 text-slate-900 shadow-sm"
          >
            🏠 Главное меню
          </button>
        </div>
      </div>
    </div>
  );
}