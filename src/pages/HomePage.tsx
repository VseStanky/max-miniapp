type Props = {
  onOpenCatalog: () => void;
  onOpenLead: () => void;
  onOpenAbout: () => void;
  onOpenContacts: () => void;
};

export default function HomePage({
  onOpenCatalog,
  onOpenLead,
  onOpenAbout,
  onOpenContacts,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-6">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 text-sm font-medium text-slate-500">ВсеСтанки</div>
          <h1 className="text-2xl font-bold text-slate-900">
            Каталог станков и заявка на КП
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Подбор промышленного оборудования в формате mini app для MAX.
          </p>
        </div>

        <div className="grid gap-3">
          <button
            onClick={onOpenCatalog}
            className="rounded-2xl bg-slate-900 px-4 py-4 text-left text-white shadow-sm"
          >
            <div className="text-lg font-semibold">📚 Каталог станков</div>
            <div className="mt-1 text-sm text-slate-300">
              Категории, фильтры, модели
            </div>
          </button>

          <button
            onClick={onOpenLead}
            className="rounded-2xl bg-white px-4 py-4 text-left text-slate-900 shadow-sm"
          >
            <div className="text-lg font-semibold">📝 Оставить заявку на КП</div>
            <div className="mt-1 text-sm text-slate-500">
              Быстрая форма запроса коммерческого предложения
            </div>
          </button>

          <button
            onClick={onOpenAbout}
            className="rounded-2xl bg-white px-4 py-4 text-left text-slate-900 shadow-sm"
          >
            <div className="text-lg font-semibold">ℹ️ О компании</div>
          </button>

          <button
            onClick={onOpenContacts}
            className="rounded-2xl bg-white px-4 py-4 text-left text-slate-900 shadow-sm"
          >
            <div className="text-lg font-semibold">📞 Контакты</div>
          </button>
        </div>
      </div>
    </div>
  );
}