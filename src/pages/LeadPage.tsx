import { useState } from "react";

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

export default function LeadPage({ category, item, onBack, onDone }: Props) {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    const summary = [
      `Компания: ${company || "-"}`,
      `Имя: ${name || "-"}`,
      `Контакт: ${contact || "-"}`,
      `Задача: ${task || "-"}`,
      `Категория: ${category?.name || "-"}`,
      `Модель: ${item?.name || "-"}`,
    ].join("\n");

    alert(`✅ Заявка принята!\n\n${summary}`);
    onDone();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Заявка на КП</h1>
          <p className="mt-2 text-sm text-slate-500">
            Следующим шагом подключим реальную валидацию и отправку на backend.
          </p>

          {category ? (
            <div className="mt-4 text-sm text-slate-600">
              <div>Категория: {category.name}</div>
              {item ? <div>Модель: {item.name}</div> : null}
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Компания"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Телефон или e-mail"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          />
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Опишите задачу"
            rows={5}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-2xl bg-slate-900 px-4 py-4 text-white"
        >
          ✅ Отправить заявку
        </button>
      </div>
    </div>
  );
}