type Props = {
  onBack: () => void;
};

export default function ContactsPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Контакты</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Связаться с ВсеСтанки
          </h1>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div>
              <div className="font-medium text-slate-900">Сайт</div>
              <a
                href="https://vsestanky.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 underline"
              >
                https://vsestanky.ru
              </a>
            </div>

            <div>
              <div className="font-medium text-slate-900">E-mail</div>
              <div>info@vsestanky.ru</div>
            </div>

            <div>
              <div className="font-medium text-slate-900">Телефоны</div>
              <div>Основной: +7 (903) 589-18-60</div>
              <div>Дополнительный: +7 (499) 325-62-90</div>
            </div>

            <div>
              <div className="font-medium text-slate-900">Адрес</div>
              <div>г. Москва, 1-я Пугачевская, 25ст1</div>
            </div>

            <div>
              <div className="font-medium text-slate-900">Режим работы</div>
              <div>Пн–Пт, с 9:00 до 18:00</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-base font-semibold text-slate-900">
            Быстрый способ связи
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Если вы уже выбрали модель или категорию, удобнее всего сразу отправить
            заявку на коммерческое предложение через mini app.
          </p>
        </div>
      </div>
    </div>
  );
}