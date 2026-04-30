type FacetValue = {
  value: string;
  count: number;
};

type Facet = {
  key: string;
  name: string;
  type: "checkbox" | "price";
  values: FacetValue[];
};

type Props = {
  facet: Facet;
  activeValue?: string;
  onBack: () => void;
  onSelectValue: (value: string) => void;
  onClearValue: () => void;
};

export default function FacetValuesPage({
  facet,
  activeValue,
  onBack,
  onSelectValue,
  onClearValue,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-md space-y-4 py-4">
        <button onClick={onBack} className="text-sm font-medium text-slate-600">
          ← К фильтрам
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Фильтр</div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{facet.name}</h1>
          {activeValue ? (
            <div className="mt-3 text-sm text-emerald-700">
              Выбрано: {activeValue}
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-500">Значение не выбрано</div>
          )}
        </div>

        {activeValue ? (
          <button
            onClick={onClearValue}
            className="w-full rounded-2xl bg-white px-4 py-4 text-left text-red-600 shadow-sm"
          >
            ✖️ Снять выбранное значение
          </button>
        ) : null}

        <div className="space-y-3">
          {facet.values.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelectValue(option.value)}
              className={`w-full rounded-2xl p-4 text-left shadow-sm ${
                activeValue === option.value
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-900"
              }`}
            >
              <div className="font-semibold">{option.value}</div>
              <div
                className={`mt-1 text-sm ${
                  activeValue === option.value ? "text-slate-300" : "text-slate-500"
                }`}
              >
                Подходит моделей: {option.count}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}