import type { Item } from "../types/catalog";

type Props = {
  item: Item;
  onBack: () => void;
  onRequestQuote: (itemId: string) => void;
};

export default function ItemPage({ item, onBack, onRequestQuote }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Карточка модели</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{item.name}</h1>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div>
              <div className="font-medium text-slate-900">Цена</div>
              <div>{item.priceFrom || "По запросу"}</div>
            </div>

            {item.specsList?.length > 0 && (
              <div>
                <div className="font-medium text-slate-900">Характеристики</div>
                <div className="mt-2 space-y-1">
                  {item.specsList.map((spec) => (
                    <div key={spec}>• {spec}</div>
                  ))}
                </div>
              </div>
            )}

            {item.attrs && Object.keys(item.attrs).length > 0 && (
              <div>
                <div className="font-medium text-slate-900">Параметры</div>
                <div className="mt-2 space-y-1">
                  {Object.entries(item.attrs).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.url && (
              <div>
                <div className="font-medium text-slate-900">Ссылка</div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 underline"
                >
                  Открыть на сайте
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onRequestQuote(item.id)}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
        >
          Запросить КП
        </button>
      </div>
    </div>
  );
}