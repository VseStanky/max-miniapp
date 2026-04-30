import { CSSProperties, useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
};

type Product = {
  id: string;
  categoryId: string;
  name: string;
  price?: string;
  description?: string;
  specs?: string[];
};

const categories: Category[] = [
  {
    id: "laser",
    name: "Лазерные станки с ЧПУ",
    emoji: "🔥",
    description: "Резка листового металла, труб и профиля с высокой точностью."
  },
  {
    id: "press",
    name: "Листогибочные прессы",
    emoji: "🛠️",
    description: "Гибка листового металла для серийного и индивидуального производства."
  },
  {
    id: "lathe",
    name: "Токарные станки с ЧПУ",
    emoji: "⚙️",
    description: "Для обработки валов, втулок, фланцев и других деталей вращения."
  },
  {
    id: "milling",
    name: "Фрезерные станки с ЧПУ",
    emoji: "🧩",
    description: "Фрезерная обработка деталей сложной геометрии и корпусных изделий."
  },
  {
    id: "edm",
    name: "Электроэрозионные станки",
    emoji: "⚡",
    description: "Проволочно-вырезная и электроэрозионная обработка металла."
  },
  {
    id: "band",
    name: "Ленточнопильные станки",
    emoji: "🔩",
    description: "Надёжные решения для резки металлического проката и заготовок."
  },
  {
    id: "welding",
    name: "Лазерная сварка и очистка",
    emoji: "✨",
    description: "Аппараты для сварки, очистки и подготовки поверхности."
  }
];

const products: Product[] = [
  {
    id: "laser-1",
    categoryId: "laser",
    name: "LaserCut 3015 1500W",
    price: "от 1 950 000 ₽",
    description: "Станок лазерной резки с рабочим полем 3000×1500 мм.",
    specs: ["Поле 3000×1500 мм", "Источник 1500W", "Для листового металла"]
  },
  {
    id: "laser-2",
    categoryId: "laser",
    name: "LaserCut 3015 3000W",
    price: "от 2 600 000 ₽",
    description: "Производительное решение для больших объёмов раскроя.",
    specs: ["Источник 3000W", "Высокая скорость", "Для постоянной загрузки"]
  },
  {
    id: "press-1",
    categoryId: "press",
    name: "PressMaster 100T",
    price: "от 3 100 000 ₽",
    description: "Листогибочный пресс для стандартных производственных задач.",
    specs: ["Усилие 100 тонн", "ЧПУ управление", "Для гибки листа"]
  },
  {
    id: "lathe-1",
    categoryId: "lathe",
    name: "TurnPro CK6140",
    price: "от 2 200 000 ₽",
    description: "Универсальный токарный станок с ЧПУ.",
    specs: ["Серийная работа", "Стабильная геометрия", "Надёжная база"]
  },
  {
    id: "milling-1",
    categoryId: "milling",
    name: "MillCenter VMC850",
    price: "от 3 400 000 ₽",
    description: "Вертикальный обрабатывающий центр для точной обработки.",
    specs: ["Класс VMC", "Для сложных деталей", "Для инструментальных задач"]
  },
  {
    id: "edm-1",
    categoryId: "edm",
    name: "EDM Start 400",
    price: "по запросу",
    description: "Электроэрозионный станок для точной обработки.",
    specs: ["Проволочно-вырезная обработка", "Высокая точность", "Сложный контур"]
  },
  {
    id: "band-1",
    categoryId: "band",
    name: "BandSaw 500",
    price: "от 890 000 ₽",
    description: "Полуавтоматический ленточнопильный станок.",
    specs: ["Для заготовок", "Стабильный рез", "Надёжный привод"]
  },
  {
    id: "welding-1",
    categoryId: "welding",
    name: "LaserWeld 1500",
    price: "от 420 000 ₽",
    description: "Ручной аппарат лазерной сварки.",
    specs: ["Мощность 1500W", "Компактный формат", "Сварка и очистка"]
  }
];

type Screen =
  | { name: "home" }
  | { name: "category"; categoryId: string }
  | { name: "product"; productId: string };

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f5f7",
    color: "#0f172a",
    fontFamily: "Inter, Arial, sans-serif"
  },
  container: {
    maxWidth: 460,
    margin: "0 auto",
    padding: "16px 16px 32px"
  },
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 10px 30px rgba(15,23,42,0.18)"
  },
  heroLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.7)"
  },
  heroTitle: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.15
  },
  heroText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)"
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 20,
    fontWeight: 700
  },
  sectionText: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748b"
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
    cursor: "pointer"
  },
  cardTop: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start"
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
    flexShrink: 0
  },
  badge: {
    background: "#0f172a",
    color: "#fff",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0
  },
  cardTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.35,
    margin: 0
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#475569"
  },
  cardLink: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a"
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
    marginBottom: 16
  },
  whiteBlock: {
    background: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)"
  },
  smallLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#94a3b8"
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.2
  },
  pill: {
    display: "inline-block",
    marginTop: 14,
    borderRadius: 999,
    background: "#0f172a",
    color: "#fff",
    padding: "7px 12px",
    fontSize: 14,
    fontWeight: 600
  },
  formBlock: {
    marginTop: 16,
    background: "#fff",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)"
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
    boxSizing: "border-box"
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
    cursor: "pointer"
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
    cursor: "not-allowed"
  },
  spec: {
    marginTop: 10,
    borderRadius: 16,
    background: "#f8fafc",
    padding: "12px 14px",
    fontSize: 14,
    color: "#334155"
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 16
  },
  smallButton: {
    border: "none",
    background: "#fff",
    borderRadius: 20,
    padding: "14px 12px",
    fontSize: 14,
    fontWeight: 600,
    color: "#1e293b",
    boxShadow: "0 4px 18px rgba(15,23,42,0.08)"
  },
  statusOk: {
    marginTop: 12,
    borderRadius: 16,
    background: "#ecfdf5",
    color: "#166534",
    padding: "12px 14px",
    fontSize: 14,
    lineHeight: 1.5
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
    wordBreak: "break-word"
  }
};

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formComment, setFormComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentCategory =
    screen.name === "category"
      ? categories.find((c) => c.id === screen.categoryId) ?? null
      : screen.name === "product"
      ? categories.find(
          (c) =>
            c.id === products.find((p) => p.id === screen.productId)?.categoryId
        ) ?? null
      : null;

  const currentProducts = useMemo(() => {
    if (screen.name !== "category") return [];
    return products.filter((p) => p.categoryId === screen.categoryId);
  }, [screen]);

  const currentProduct =
    screen.name === "product"
      ? products.find((p) => p.id === screen.productId) ?? null
      : null;

  async function handleSubmit() {
    setSuccessMessage("");
    setErrorMessage("");

    if (!formName.trim()) {
      setErrorMessage("Введите имя.");
      return;
    }

    if (!formPhone.trim()) {
      setErrorMessage("Введите телефон.");
      return;
    }

    if (!currentProduct) {
      setErrorMessage("Не выбран товар.");
      return;
    }

    try {
      setIsSending(true);

      const payload = {
        name: formName.trim(),
        phone: formPhone.trim(),
        comment: formComment.trim(),
        product: currentProduct.name,
        source: "MAX mini app"
      };

      const response = await fetch("https://vsestanky.ru/api/quote.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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

      setSuccessMessage(
        data?.message || "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время."
      );
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
            <div style={styles.heroTitle}>Каталог промышленного оборудования</div>
            <div style={styles.heroText}>
              Подберите подходящий станок, посмотрите модели и отправьте заявку на коммерческое предложение.
            </div>
          </div>

          <div style={styles.sectionTitle}>Категории оборудования</div>
          <div style={styles.sectionText}>Выберите направление, чтобы перейти к моделям</div>

          {categories.map((category) => {
            const count = products.filter((p) => p.categoryId === category.id).length;

            return (
              <button
                key={category.id}
                type="button"
                style={styles.card}
                onClick={() => setScreen({ name: "category", categoryId: category.id })}
              >
                <div style={styles.cardTop}>
                  <div style={styles.iconBox}>{category.emoji ?? "📦"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.cardTitleRow}>
                      <h2 style={styles.cardTitle}>{category.name}</h2>
                      <div style={styles.badge}>{count}</div>
                    </div>
                    <div style={styles.cardText}>{category.description}</div>
                    <div style={styles.cardLink}>Смотреть модели →</div>
                  </div>
                </div>
              </button>
            );
          })}

          <div style={styles.twoCols}>
            <button type="button" style={styles.smallButton}>О компании</button>
            <button type="button" style={styles.smallButton}>Контакты</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen.name === "category") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button type="button" style={styles.backButton} onClick={() => setScreen({ name: "home" })}>
            ← Назад
          </button>

          <div style={styles.whiteBlock}>
            <div style={styles.smallLabel}>Категория</div>
            <div style={styles.title}>{currentCategory?.name ?? "Без названия"}</div>
            <div style={styles.cardText}>{currentCategory?.description ?? ""}</div>
          </div>

          {currentProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              style={styles.card}
              onClick={() => {
                setSuccessMessage("");
                setErrorMessage("");
                setScreen({ name: "product", productId: product.id });
              }}
            >
              <div style={styles.cardTitle}>{product.name}</div>
              <div style={{ ...styles.cardText, marginTop: 8, fontWeight: 600, color: "#334155" }}>
                {product.price ?? "по запросу"}
              </div>
              <div style={styles.cardText}>{product.description ?? ""}</div>
              <div style={styles.cardLink}>Подробнее →</div>
            </button>
          ))}
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
          onClick={() =>
            currentCategory
              ? setScreen({ name: "category", categoryId: currentCategory.id })
              : setScreen({ name: "home" })
          }
        >
          ← Назад
        </button>

        <div style={styles.whiteBlock}>
          <div style={styles.smallLabel}>Оборудование</div>
          <div style={styles.title}>{currentProduct?.name ?? "Товар"}</div>
          <div style={styles.pill}>{currentProduct?.price ?? "по запросу"}</div>
          <div style={styles.cardText}>{currentProduct?.description ?? ""}</div>

          {currentProduct?.specs?.map((spec) => (
            <div key={spec} style={styles.spec}>{spec}</div>
          ))}
        </div>

        <div style={styles.formBlock}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Запросить коммерческое предложение</div>
          <div style={styles.cardText}>
            Оставьте контакты, и мы подберём оборудование под вашу задачу.
          </div>

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
            placeholder="Комментарий или задача"
            rows={4}
            style={styles.input}
            value={formComment}
            onChange={(e) => setFormComment(e.target.value)}
          />

          <input
            type="text"
            value={currentProduct?.name ?? ""}
            readOnly
            style={{ ...styles.input, color: "#475569", background: "#eef2f7" }}
          />

          <input
            type="text"
            value="MAX mini app"
            readOnly
            style={{ ...styles.input, color: "#475569", background: "#eef2f7" }}
          />

          <button
            type="button"
            style={isSending ? styles.submitDisabled : styles.submit}
            onClick={handleSubmit}
            disabled={isSending}
          >
            {isSending ? "Отправка..." : "Отправить заявку"}
          </button>

          {successMessage ? <div style={styles.statusOk}>{successMessage}</div> : null}
          {errorMessage ? <div style={styles.statusError}>{errorMessage}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default App;