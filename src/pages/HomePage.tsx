import type { Category } from "../types/catalog";

type Props = {
  categories: Category[];
  onOpenCategory: (categoryId: string) => void;
  onOpenAbout: () => void;
  onOpenContacts: () => void;
};

export default function HomePage({
  categories,
  onOpenCategory,
  onOpenAbout,
  onOpenContacts,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">ВсеСтанки</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Каталог оборудования
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Выберите категорию оборудования, чтобы посмотреть доступные модели
            и отправить заявку на коммерческое предложение.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onOpenCategory(category.id)}
              className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl">{category.emoji ?? "📦"}</div>
                  <h2 className="mt-2 text-base font-semibold text-slate-900">
                    {category.name}
                  </h2>
                  {category.description ? (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {category.description}
                    </p>
                  ) : null}
                </div>

                <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {category.itemsCount ?? 0}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onOpenAbout}
            className="rounded-2xl bg-white p-4 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
          >
            О компании
          </button>

          <button
            type="button"
            onClick={onOpenContacts}
            className="rounded-2xl bg-white p-4 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
          >
            Контакты
          </button>
        </div>
      </div>
    </div>
  );
}