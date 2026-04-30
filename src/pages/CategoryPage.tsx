import type { Category, Item } from "../types/catalog";

type Props = {
  category: Category | null;
  items: Item[];
  onBack: () => void;
  onOpenProduct: (productId: string) => void;
};

export default function CategoryPage({
  category,
  items,
  onBack,
  onOpenProduct,
}: Props) {
  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-md space-y-4 py-4">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-slate-600"
          >
            ← Назад
          </button>

          <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-sm">
            Категория не найдена.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-slate-600"
        >
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Категория</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {category.name}
          </h1>

          {category.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {category.description}
            </p>
          ) : null}

          <div className="mt-4 text-sm text-slate-500">
            Найдено моделей: {items.length}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-sm">
            В этой категории пока нет товаров.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenProduct(item.id)}
                className="block w-full rounded-2xl bg-white p-5 text-left shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
              >
                <div className="text-base font-semibold text-slate-900">
                  {item.name}
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  {item.priceFrom || "По запросу"}
                </div>

                {item.specsList?.length ? (
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    {item.specsList.slice(0, 3).map((spec) => (
                      <div key={spec}>• {spec}</div>
                    ))}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}