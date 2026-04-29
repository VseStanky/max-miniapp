type Props = {
  onBack: () => void;
};

export default function AboutPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">О компании</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">ВсеСтанки</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            ВсеСтанки — поставщик промышленного оборудования. В mini app можно
            подобрать подходящую категорию станков, посмотреть модели и отправить
            заявку на коммерческое предложение.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            На следующих этапах сюда можно добавить реальные тексты компании,
            преимущества, бренды, географию поставок и блок с кейсами.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-base font-semibold text-slate-900">
            Что уже доступно в приложении
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <div>• Каталог категорий оборудования</div>
            <div>• Фильтрация моделей</div>
            <div>• Карточки товаров</div>
            <div>• Заявка на КП в несколько шагов</div>
          </div>
        </div>
      </div>
    </div>
  );
}