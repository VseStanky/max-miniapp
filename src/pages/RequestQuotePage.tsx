import { useMemo, useState } from "react";
import type { Item } from "../types/catalog";
import {
  buildQuotePayload,
  submitQuoteRequest,
  type QuoteFormData,
  type QuoteSubmitResult,
} from "../services/quote";

type Props = {
  item: Item | null;
  onBack: () => void;
};

const initialForm: QuoteFormData = {
  name: "",
  phone: "",
  email: "",
  company: "",
  comment: "",
};

export default function RequestQuotePage({ item, onBack }: Props) {
  const [form, setForm] = useState<QuoteFormData>(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<QuoteSubmitResult | null>(null);

  const canSubmit = useMemo(() => {
    return form.name.trim() !== "" && form.phone.trim() !== "";
  }, [form]);

  function updateField<K extends keyof QuoteFormData>(
    key: K,
    value: QuoteFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!canSubmit || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const payload = buildQuotePayload(form, item);
      const result = await submitQuoteRequest(payload);

      if (!result.ok) {
        throw new Error("Request failed");
      }

      setSubmitResult(result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit quote request", error);
      alert("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-md space-y-4 py-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Заявка отправлена</div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Спасибо
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Заявка на коммерческое предложение сформирована.
            </p>

            {submitResult?.mode === "backend" ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Данные были отправлены в backend для дальнейшей обработки и
                передачи в amoCRM.
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Сейчас приложение работает в тестовом режиме: данные выведены в
                console.log и ещё не отправляются в backend.
              </p>
            )}

            <button
              onClick={onBack}
              className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
            >
              Вернуться назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← Назад
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Заявка на КП</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {item ? item.name : "Запрос коммерческого предложения"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Оставьте контакты, и менеджер подготовит коммерческое предложение.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Ваше имя *
              </label>
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                placeholder="Иван Иванов"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Телефон *
              </label>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                E-mail
              </label>
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                placeholder="mail@company.ru"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Компания
              </label>
              <input
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                placeholder="ООО Ромашка"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">
                Комментарий
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => updateField("comment", e.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                placeholder="Нужен подбор, сроки поставки, наличие, аналог и т.д."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={
              canSubmit && !isSubmitting
                ? "w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
                : "w-full rounded-xl bg-slate-300 px-4 py-3 text-sm font-medium text-white"
            }
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
}