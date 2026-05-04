import { CSSProperties, useMemo, useState } from "react";

type FilterType = "select" | "checkbox" | "range";

type FilterOption = {
  label: string;
  value: string;
};

type FilterConfig = {
  id: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

type Category = {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
  filters: FilterConfig[];
};

type Screen =
  | { name: "home" }
  | { name: "about" }
  | { name: "contacts" }
  | { name: "category"; categoryId: string };

type RangeValue = {
  min: string;
  max: string;
};

type FilterValue = string | string[] | RangeValue;
type FilterState = Record<string, FilterValue>;

const categories: Category[] = [
  {
    id: "laser",
    name: "Лазерные станки с ЧПУ",
    emoji: "🔥",
    description: "Подбор по ключевым параметрам лазерной резки металла.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 1424658,
        max: 19446522,
        step: 100000,
        suffix: "₽",
      },
      {
        id: "machineType",
        label: "Тип станка",
        type: "select",
        options: [
          { label: "Открытый тип", value: "Открытый тип" },
          { label: "Закрытый тип", value: "Закрытый тип" },
          { label: "Комбинированный", value: "Комбинированный" },
          { label: "Труборез", value: "Труборез" },
        ],
      },
      {
        id: "workArea",
        label: "Рабочая зона (X, Y)",
        type: "select",
        options: [
          { label: "1500×3000", value: "1500×3000" },
          { label: "1500×6000", value: "1500×6000" },
          { label: "2000×6000", value: "2000×6000" },
        ],
      },
      {
        id: "power",
        label: "Мощность источника",
        type: "select",
        options: [
          { label: "1 500", value: "1 500" },
          { label: "2 000", value: "2 000" },
          { label: "3 000", value: "3 000" },
          { label: "6 000", value: "6 000" },
          { label: "12 000", value: "12 000" },
        ],
      },
    ],
  },
  {
    id: "press",
    name: "Листогибочные прессы",
    emoji: "🛠️",
    description: "Подбор листогибочного пресса под задачи гибки.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 703562,
        max: 6356164,
        step: 10000,
        suffix: "₽",
      },
      {
        id: "bendLength",
        label: "Длина гиба, мм",
        type: "select",
        options: [
          { label: "1600", value: "1600" },
          { label: "2000", value: "2000" },
          { label: "2500", value: "2500" },
          { label: "3200", value: "3200" },
          { label: "4000", value: "4000" },
          { label: "5000", value: "5000" },
          { label: "6000", value: "6000" },
        ],
      },
      {
        id: "effort",
        label: "Усилие (т)",
        type: "select",
        options: [
          { label: "30", value: "30" },
          { label: "40", value: "40" },
          { label: "50", value: "50" },
          { label: "63", value: "63" },
          { label: "70", value: "70" },
          { label: "80", value: "80" },
          { label: "90", value: "90" },
          { label: "100", value: "100" },
          { label: "110", value: "110" },
          { label: "125", value: "125" },
          { label: "135", value: "135" },
          { label: "160", value: "160" },
          { label: "170", value: "170" },
          { label: "200", value: "200" },
          { label: "250", value: "250" },
          { label: "300", value: "300" },
          { label: "400", value: "400" },
          { label: "500", value: "500" },
          { label: "600", value: "600" },
          { label: "800", value: "800" },
          { label: "1000", value: "1000" },
          { label: "1200", value: "1200" },
          { label: "1600", value: "1600" },
        ],
      },
      {
        id: "controlSystem",
        label: "Система ЧПУ",
        type: "select",
        options: [
          { label: "CYBELEC CT12", value: "CYBELEC CT12" },
          { label: "DELEM 69T", value: "DELEM 69T" },
          { label: "DELEM DA53T", value: "DELEM DA53T" },
          { label: "E22", value: "E22" },
          { label: "ESA 630", value: "ESA 630" },
          { label: "ESA875", value: "ESA875" },
          { label: "TP10S", value: "TP10S" },
          { label: "МТ-15", value: "МТ-15" },
        ],
      },
    ],
  },
  {
    id: "lathe",
    name: "Токарные станки с ЧПУ",
    emoji: "⚙️",
    description: "Подбор токарного оборудования по параметрам производства.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 805479,
        max: 8767123,
        step: 10000,
        suffix: "₽",
      },
      {
        id: "betweenCenters",
        label: "Расстояние между центрами, мм",
        type: "range",
        min: 250,
        max: 5000,
        step: 10,
        suffix: "мм",
      },
      {
        id: "bedType",
        label: "Тип станины",
        type: "select",
        options: [
          { label: "Горизонтальная", value: "Горизонтальная" },
          { label: "Наклонная", value: "Наклонная" },
        ],
      },
      {
        id: "axisCount",
        label: "Количество осей",
        type: "select",
        options: [{ label: "5", value: "5" }],
      },
      {
        id: "controlSystem",
        label: "Система ЧПУ",
        type: "select",
        options: [
          { label: "FANUC", value: "FANUC" },
          { label: "GSK", value: "GSK" },
          { label: "KND", value: "KND" },
          { label: "Siemens", value: "Siemens" },
        ],
      },
    ],
  },
  {
    id: "milling",
    name: "Фрезерные станки с ЧПУ",
    emoji: "🧩",
    description: "Подбор фрезерных станков с ЧПУ по столу, осям и системе управления.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 2191781,
        max: 7397260,
        step: 10000,
        suffix: "₽",
      },
      {
        id: "tableSize",
        label: "Размеры рабочего стола, мм",
        type: "range",
        min: 260,
        max: 1700,
        step: 10,
        suffix: "мм",
      },
      {
        id: "axisCount",
        label: "Количество осей",
        type: "select",
        options: [
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ],
      },
      {
        id: "controlSystem",
        label: "Система ЧПУ",
        type: "select",
        options: [
          { label: "FANUC", value: "FANUC" },
          { label: "GSK", value: "GSK" },
          { label: "KND", value: "KND" },
          { label: "Siemens", value: "Siemens" },
        ],
      },
    ],
  },
  {
    id: "edm",
    name: "Электроэрозионные станки с ЧПУ",
    emoji: "⚡",
    description: "Подбор электроэрозионного оборудования по столу и параметрам обработки.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 460274,
        max: 2356164,
        step: 10000,
        suffix: "₽",
      },
      {
        id: "tilt30",
        label: "Наклон 30 градусов",
        type: "checkbox",
        options: [{ label: "Да", value: "Да" }],
      },
      {
        id: "tilt45",
        label: "Наклон 45 градусов",
        type: "checkbox",
        options: [{ label: "Да", value: "Да" }],
      },
      {
        id: "workTable",
        label: "Размер рабочего стола",
        type: "range",
        min: 320,
        max: 1600,
        step: 10,
        suffix: "мм",
      },
      {
        id: "maxDetailHeight",
        label: "Макс. высота обрабатываемой детали, мм",
        type: "range",
        min: 300,
        max: 3350,
        step: 10,
        suffix: "мм",
      },
    ],
  },
  {
    id: "band",
    name: "Ленточнопильные станки",
    emoji: "🔩",
    description: "Подбор ленточнопильных станков по типу, параметрам резки и конструкции.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 339726,
        max: 2794521,
        step: 10000,
        suffix: "₽",
      },
      {
        id: "machineKind",
        label: "Вид станка",
        type: "select",
        options: [
          { label: "Ручной", value: "Ручной" },
          { label: "Полуавтоматические", value: "Полуавтоматические" },
          { label: "Автоматический", value: "Автоматический" },
        ],
      },
      {
        id: "cutParams",
        label: "Параметры резки",
        type: "select",
        options: [
          { label: "200 / 200 х 200", value: "200 / 200 х 200" },
          { label: "250, 245, 320 x 175", value: "250, 245, 320 x 175" },
          { label: "270, 260, 370 x 220", value: "270, 260, 370 x 220" },
          { label: "300 - 300 x 300", value: "300 - 300 x 300" },
          { label: "300 / 300 х 300", value: "300 / 300 х 300" },
          { label: "330 - 330 х 350", value: "330 - 330 х 350" },
          { label: "350 - 350 x 350", value: "350 - 350 x 350" },
          { label: "350 / 350 х 350", value: "350 / 350 х 350" },
          { label: "360 - 360 х 500", value: "360 - 360 х 500" },
          { label: "400 - 400 x 400", value: "400 - 400 x 400" },
          { label: "400 / 400 х 400", value: "400 / 400 х 400" },
          { label: "430 - 430 х 430", value: "430 - 430 х 430" },
          { label: "500 - 500 x 500", value: "500 - 500 x 500" },
          { label: "500 / 500 х 500", value: "500 / 500 х 500" },
          { label: "530 - 530 х 530", value: "530 - 530 х 530" },
          { label: "600 - 600 x 600", value: "600 - 600 x 600" },
          { label: "600 / 600 х 600", value: "600 / 600 х 600" },
          { label: "700 / 700 х 700", value: "700 / 700 х 700" },
          { label: "800 / 800 х 800", value: "800 / 800 х 800" },
          { label: "850 / 850 х 850", value: "850 / 850 х 850" },
        ],
      },
      {
        id: "turnFrameVice",
        label: "Поворот рамы / тисков",
        type: "select",
        options: [
          { label: "Да", value: "Да" },
          { label: "Нет", value: "Нет" },
        ],
      },
    ],
  },
  {
    id: "welding",
    name: "Аппараты лазерной сварки",
    emoji: "✨",
    description: "Подбор аппаратов лазерной сварки и очистки.",
    filters: [
      {
        id: "price",
        label: "Цена",
        type: "range",
        min: 726575,
        max: 1008219,
        step: 10000,
        suffix: "₽",
      },
      {
        id: "laserPower",
        label: "Мощность источника",
        type: "select",
        options: [
          { label: "1 500", value: "1 500" },
          { label: "2 000", value: "2 000" },
          { label: "3 000", value: "3 000" },
        ],
      },
    ],
  },
];

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f5f7",
    color: "#0f172a",
    fontFamily: "Inter, Arial, sans-serif",
  },
  container: {
    maxWidth: 460,
    margin: "0 auto",
    padding: "16px 16px 32px",
  },
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 10px 30px rgba(15,23,42,0.18)",
  },
  heroLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.7)",
  },
  heroTitle: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.15,
  },
  heroText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)",
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 20,
    fontWeight: 700,
  },
  sectionText: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748b",
  },
  card: {
    width: "100%",
    border: "none",
    background: "#fff",
    borderRadius: 24,
    padding: 16,
    marginTop: 12,
    textAlign: "left",
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)",
    cursor: "pointer",
  },
  cardTop: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    flexShrink: 0,
  },
  cardTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.35,
    margin: 0,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#475569",
  },
  cardLink: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a",
  },
  backButton: {
    border: "none",
    background: "#fff",
    borderRadius: 999,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)",
    cursor: "pointer",
    marginBottom: 16,
  },
  whiteBlock: {
    background: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)",
  },
  smallLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#94a3b8",
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  formBlock: {
    marginTop: 16,
    background: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)",
  },
  input: {
    width: "100%",
    borderRadius: 18,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    padding: "14px 16px",
    fontSize: 14,
    outline: "none",
    marginTop: 12,
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    borderRadius: 18,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    padding: "14px 16px",
    fontSize: 14,
    outline: "none",
    marginTop: 12,
    boxSizing: "border-box",
    appearance: "none",
  },
  submit: {
    width: "100%",
    border: "none",
    borderRadius: 18,
    background: "#0f172a",
    color: "#fff",
    padding: "15px 16px",
    fontSize: 14,
    fontWeight: 700,
    marginTop: 12,
    cursor: "pointer",
  },
  submitDisabled: {
    width: "100%",
    border: "none",
    borderRadius: 18,
    background: "#94a3b8",
    color: "#fff",
    padding: "15px 16px",
    fontSize: 14,
    fontWeight: 700,
    marginTop: 12,
    cursor: "not-allowed",
  },
  spec: {
    marginTop: 10,
    borderRadius: 16,
    background: "#f8fafc",
    padding: "12px 14px",
    fontSize: 14,
    color: "#334155",
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 16,
  },
  smallButton: {
    border: "none",
    background: "#fff",
    borderRadius: 20,
    padding: "14px 12px",
    fontSize: 14,
    fontWeight: 600,
    color: "#1e293b",
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)",
    cursor: "pointer",
  },
  statusOk: {
    marginTop: 12,
    borderRadius: 16,
    background: "#ecfdf5",
    color: "#166534",
    padding: "12px 14px",
    fontSize: 14,
    lineHeight: 1.5,
  },
  statusError: {
    marginTop: 12,
    borderRadius: 16,
    background: "#fef2f2",
    color: "#b91c1c",
    padding: "12px 14px",
    fontSize: 14,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  filterTitle: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: 700,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
    fontSize: 14,
    color: "#334155",
  },
  rangeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 12,
  },
  hintBox: {
    marginTop: 16,
    borderRadius: 18,
    background: "#eef6ff",
    color: "#1e3a8a",
    padding: "14px 16px",
    fontSize: 14,
    lineHeight: 1.6,
  },
};

function createInitialFilters(filters: FilterConfig[]): FilterState {
  const state: FilterState = {};

  filters.forEach((filter) => {
    if (filter.type === "range") {
      state[filter.id] = {
        min: filter.min ? String(filter.min) : "",
        max: filter.max ? String(filter.max) : "",
      };
    } else if (filter.type === "checkbox") {
      state[filter.id] = [];
    } else {
      state[filter.id] = "";
    }
  });

  return state;
}

function formatNumber(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value;
  if (!num) return "";
  return new Intl.NumberFormat("ru-RU").format(num);
}

function buildFiltersText(category: Category | null, filters: FilterState) {
  if (!category) return "";

  const lines: string[] = [`Категория: ${category.name}`];

  category.filters.forEach((filter) => {
    const value = filters[filter.id];

    if (
      filter.type === "range" &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "min" in value
    ) {
      if (value.min || value.max) {
        const left = value.min ? formatNumber(value.min) : "не указано";
        const right = value.max ? formatNumber(value.max) : "не указано";
        lines.push(
          `${filter.label}: от ${left} до ${right} ${filter.suffix ?? ""}`.trim()
        );
      }
      return;
    }

    if (Array.isArray(value) && value.length > 0) {
      lines.push(`${filter.label}: ${value.join(", ")}`);
      return;
    }

    if (typeof value === "string" && value.trim()) {
      lines.push(`${filter.label}: ${value}`);
    }
  });

  return lines.join("\n");
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  const [filterValues, setFilterValues] = useState<Record<string, FilterState>>(() => {
    const initial: Record<string, FilterState> = {};
    categories.forEach((category) => {
      initial[category.id] = createInitialFilters(category.filters);
    });
    return initial;
  });

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formComment, setFormComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentCategory =
    screen.name === "category"
      ? categories.find((c) => c.id === screen.categoryId) ?? null
      : null;

  const currentFilters = currentCategory ? filterValues[currentCategory.id] : null;

  const selectionText = useMemo(() => {
    return buildFiltersText(currentCategory, currentFilters ?? {});
  }, [currentCategory, currentFilters]);

  function resetMessages() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  function updateSelect(categoryId: string, filterId: string, value: string) {
    resetMessages();
    setFilterValues((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [filterId]: value,
      },
    }));
  }

  function updateCheckbox(
    categoryId: string,
    filterId: string,
    optionValue: string,
    checked: boolean
  ) {
    resetMessages();
    setFilterValues((prev) => {
      const current = prev[categoryId][filterId];
      const currentArray = Array.isArray(current) ? current : [];
      const nextArray = checked
        ? [...currentArray, optionValue]
        : currentArray.filter((item) => item !== optionValue);

      return {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          [filterId]: nextArray,
        },
      };
    });
  }

  function updateRange(
    categoryId: string,
    filterId: string,
    side: "min" | "max",
    value: string
  ) {
    resetMessages();
    setFilterValues((prev) => {
      const current = prev[categoryId][filterId];
      const rangeValue =
        current &&
        typeof current === "object" &&
        !Array.isArray(current) &&
        "min" in current
          ? current
          : { min: "", max: "" };

      return {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          [filterId]: {
            ...rangeValue,
            [side]: value,
          },
        },
      };
    });
  }

  async function handleSubmit() {
    resetMessages();

    if (!formName.trim()) {
      setErrorMessage("Введите имя.");
      return;
    }

    if (!formPhone.trim()) {
      setErrorMessage("Введите телефон.");
      return;
    }

    if (!currentCategory) {
      setErrorMessage("Не выбрана категория.");
      return;
    }

    try {
      setIsSending(true);

      const filtersText = buildFiltersText(
        currentCategory,
        filterValues[currentCategory.id]
      );

      const payload = {
        name: formName.trim(),
        phone: formPhone.trim(),
        comment: [filtersText, formComment.trim()].filter(Boolean).join("\n\n"),
        product: `Подбор оборудования: ${currentCategory.name}`,
        category: currentCategory.name,
        source: "MAX mini app",
      };

      const response = await fetch("https://vsestanky.ru/api/quote.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(text || `HTTP ${response.status}`);
      }

      if (data && data.ok === false) {
        throw new Error(data.message || "Сервер вернул ошибку.");
      }

      setSuccessMessage(data?.message || "Заявка успешно отправлена.");
      setFormName("");
      setFormPhone("");
      setFormComment("");
    } catch (error: any) {
      setErrorMessage(error?.message || "Не удалось отправить заявку.");
    } finally {
      setIsSending(false);
    }
  }

  if (screen.name === "home") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <div style={styles.heroLabel}>ВсеСтанки</div>
            <div style={styles.heroTitle}>Подбор оборудования по параметрам</div>
            <div style={styles.heroText}>
              Выберите категорию, задайте фильтры и отправьте запрос на коммерческое
              предложение.
            </div>
          </div>

          <div style={styles.sectionTitle}>Категории оборудования</div>
          <div style={styles.sectionText}>
            Откройте нужную категорию и задайте параметры подбора
          </div>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              style={styles.card}
              onClick={() => {
                resetMessages();
                setScreen({ name: "category", categoryId: category.id });
              }}
            >
              <div style={styles.cardTop}>
                <div style={styles.iconBox}>{category.emoji ?? "📦"}</div>
                <div style={{ flex: 1 }}>
                  <div style={styles.cardTitleRow}>
                    <h2 style={styles.cardTitle}>{category.name}</h2>
                  </div>
                  <div style={styles.cardText}>{category.description}</div>
                  <div style={styles.cardLink}>Открыть фильтры →</div>
                </div>
              </div>
            </button>
          ))}

          <div style={styles.twoCols}>
            <button
              type="button"
              style={styles.smallButton}
              onClick={() => setScreen({ name: "about" })}
            >
              О компании
            </button>
            <button
              type="button"
              style={styles.smallButton}
              onClick={() => setScreen({ name: "contacts" })}
            >
              Контакты
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen.name === "about") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button
            type="button"
            style={styles.backButton}
            onClick={() => setScreen({ name: "home" })}
          >
            ← Назад
          </button>

          <div style={styles.whiteBlock}>
            <div style={styles.smallLabel}>О компании</div>
            <div style={styles.title}>ООО «ВсеСтанки»</div>
            <div style={styles.cardText}>
              Мы поставляем металлообрабатывающее оборудование с ЧПУ, подбираем
              станки под конкретные производственные задачи, выполняем настройку и
              сопровождение.
            </div>
            <div style={styles.cardText}>
              Компания работает на рынке промышленного оборудования с 2022 года,
              является официальным дилером оборудования на территории РФ и
              поставляет решения по всей России.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen.name === "contacts") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button
            type="button"
            style={styles.backButton}
            onClick={() => setScreen({ name: "home" })}
          >
            ← Назад
          </button>

          <div style={styles.whiteBlock}>
            <div style={styles.smallLabel}>Контакты</div>
            <div style={styles.title}>Связаться с нами</div>
            <div style={styles.spec}>Телефон: +7 (903) 002-83-53</div>
            <div style={styles.spec}>Email: info@vsestanky.ru</div>
            <div style={styles.spec}>Время работы: ежедневно с 9:00 до 18:00</div>
            <div style={styles.spec}>Адрес: г. Москва, 1-я Пугачевская 25ст1</div>
            <div style={styles.spec}>Telegram: @vsestanky</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          type="button"
          style={styles.backButton}
          onClick={() => {
            resetMessages();
            setScreen({ name: "home" });
          }}
        >
          ← Назад
        </button>

        <div style={styles.whiteBlock}>
          <div style={styles.smallLabel}>Подбор оборудования</div>
          <div style={styles.title}>{currentCategory?.name ?? "Категория"}</div>
          <div style={styles.cardText}>{currentCategory?.description ?? ""}</div>

          {currentCategory?.filters.map((filter) => {
            const value = currentFilters?.[filter.id];

            if (filter.type === "select") {
              return (
                <div key={filter.id}>
                  <div style={styles.filterTitle}>{filter.label}</div>
                  <select
                    style={styles.select}
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) =>
                      currentCategory &&
                      updateSelect(currentCategory.id, filter.id, e.target.value)
                    }
                  >
                    <option value="">Выберите параметр</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (filter.type === "checkbox") {
              const selected = Array.isArray(value) ? value : [];

              return (
                <div key={filter.id}>
                  <div style={styles.filterTitle}>{filter.label}</div>
                  {filter.options?.map((option) => (
                    <label key={option.value} style={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={selected.includes(option.value)}
                        onChange={(e) =>
                          currentCategory &&
                          updateCheckbox(
                            currentCategory.id,
                            filter.id,
                            option.value,
                            e.target.checked
                          )
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              );
            }

            const range =
              value &&
              typeof value === "object" &&
              !Array.isArray(value) &&
              "min" in value
                ? value
                : { min: "", max: "" };

            return (
              <div key={filter.id}>
                <div style={styles.filterTitle}>{filter.label}</div>
                <div style={styles.rangeGrid}>
                  <input
                    type="number"
                    placeholder="От"
                    style={styles.input}
                    value={range.min}
                    onChange={(e) =>
                      currentCategory &&
                      updateRange(currentCategory.id, filter.id, "min", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="До"
                    style={styles.input}
                    value={range.max}
                    onChange={(e) =>
                      currentCategory &&
                      updateRange(currentCategory.id, filter.id, "max", e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}

          <div style={styles.hintBox}>
            Мы используем выбранные параметры для подбора подходящего оборудования
            и подготовки КП.
          </div>
        </div>

        <div style={styles.formBlock}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            Запросить коммерческое предложение
          </div>
          <div style={styles.cardText}>
            Ниже будет отправлен запрос с выбранной категорией и параметрами
            подбора.
          </div>

          <textarea
            rows={8}
            readOnly
            value={selectionText}
            style={{
              ...styles.input,
              color: "#475569",
              background: "#eef2f7",
              resize: "none",
            }}
          />

          <input
            type="text"
            placeholder="Ваше имя"
            style={styles.input}
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Телефон"
            style={styles.input}
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
          />

          <textarea
            placeholder="Комментарий к заявке"
            rows={4}
            style={{ ...styles.input, resize: "vertical" }}
            value={formComment}
            onChange={(e) => setFormComment(e.target.value)}
          />

          <button
            type="button"
            style={isSending ? styles.submitDisabled : styles.submit}
            onClick={handleSubmit}
            disabled={isSending}
          >
            {isSending ? "Отправка..." : "Отправить запрос"}
          </button>

          {successMessage ? <div style={styles.statusOk}>{successMessage}</div> : null}
          {errorMessage ? <div style={styles.statusError}>{errorMessage}</div> : null}
        </div>
      </div>
    </div>
  );
}