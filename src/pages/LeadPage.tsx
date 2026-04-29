import { useMemo, useState } from "react";

type Category = {
  name: string;
} | null;

type Item = {
  name: string;
  url?: string;
} | null;

type Props = {
  category: Category;
  item: Item;
  onBack: () => void;
  onDone: () => void;
};

type Step = 1 | 2 | 3 | 4 | 5;

const PHONE_RE = /^\+?[0-9()\-\s]{10,20}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default function LeadPage({ category, item, onBack, onDone }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const title = useMemo(() => {
    if (item?.name) return `Заявка на КП: ${item.name}`;
    if (category?.name) return `Заявка на КП: ${category.name}`;
    return "Заявка на КП";
  }, [category, item]);

  const nextStep = () => {
    setError("");

    if (step === 1) {
      if (!company.trim()) {
        setError("Введите название компании");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!name.trim()) {
        setError("Введите имя");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      const value = contact.trim();
      const valid = PHONE_RE.test(value) || EMAIL_RE.test(value);

      if (!value) {
        setError("Введите телефон или e-mail");
        return;
      }

      if (!valid) {
        setError("Введите корректный телефон или e-mail");
        return;
      }

      setStep(4);
      return;
    }

    if (step === 4) {
      const value = task.trim();

      if (!value) {
        setError("Опишите задачу");
        return;
      }

      if (value.length > 1000) {
        setError("Описание задачи должно быть не длиннее 1000 символов");
        return;
      }

      setStep(5);
    }
  };

  const prevStep = () => {
    setError("");

    if (step === 1) {
      onBack();
      return;
    }

    setStep((step - 1) as Step);
  };

  const submitLead = () => {
    alert(
      [
        "✅ Заявка принята!",
        "",
        `Компания: ${company}`,
        `Имя: ${name}`,
        `Контакт: ${contact}`,
        `Задача: ${task}`,
        `Категория: ${category?.name || "-"}`,
        `Модель: ${item?.name || "-"}`,
        `Ссылка: ${item?.url || "-"}`,
      ].join("\n"),
    );

    onDone();
  };

  const progress = Math.round(((step - 1) / 4) * 100);

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={prevStep} className="text-sm font-medium text-slate-600">
          ← {step === 1 ? "Назад" : "К предыдущему шагу"}
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Шаг {Math.min(step, 4)} из 4</div>
          <h1 className="mt-1 text-xl font-bold text-slate-900">{title}</h1>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {(category || item) && step !== 5 ? (
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              {category ? <div>Категория: {category.name}</div> : null}
              {item ? <div>Модель: {item.name}</div> : null}
            </div>
          ) : null}
        </div>

        {step === 1 ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Компания
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Например: ООО Ромашка"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Имя
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Иван"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Телефон или e-mail
            </label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+7 999 123-45-67 или mail@company.ru"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
            />
            <p className="mt-2 text-xs text-slate-500">
              Можно указать телефон или адрес электронной почты.
            </p>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Задача
            </label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Опишите задачу, материал, требования, объём производства и пожелания"
              rows={6}
              maxLength={1000}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
            />
            <div className="mt-2 text-xs text-slate-500">
              {task.length} / 1000
            </div>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-lg font-bold text-emerald-700">✅ Заявка готова</div>
              <p className="mt-2 text-sm text-slate-600">
                Проверьте данные перед отправкой.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm text-sm text-slate-700 space-y-2">
              <div><span className="font-semibold">Компания:</span> {company}</div>
              <div><span className="font-semibold">Имя:</span> {name}</div>
              <div><span className="font-semibold">Контакт:</span> {contact}</div>
              <div><span className="font-semibold">Задача:</span> {task}</div>
              <div><span className="font-semibold">Категория:</span> {category?.name || "-"}</div>
              <div><span className="font-semibold">Модель:</span> {item?.name || "-"}</div>
            </div>

            <button
              onClick={submitLead}
              className="w-full rounded-2xl bg-slate-900 px-4 py-4 text-white"
            >
              ✅ Подтвердить и отправить
            </button>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {step < 5 ? (
          <button
            onClick={nextStep}
            className="w-full rounded-2xl bg-slate-900 px-4 py-4 text-white"
          >
            {step === 4 ? "Проверить заявку" : "Продолжить"}
          </button>
        ) : null}
      </div>
    </div>
  );
}