import type { Category, Item } from "../types/catalog";

export const categories: Category[] = [
  {
    id: "laser",
    emoji: "🔥",
    name: "Лазерные станки с ЧПУ",
    description: "Станки для резки листового металла с ЧПУ.",
    itemsCount: 3,
  },
  {
    id: "press",
    emoji: "🛠️",
    name: "Листогибочные пресса с ЧПУ",
    description: "Оборудование для точной гибки металла.",
    itemsCount: 2,
  },
  {
    id: "turning",
    emoji: "⚙️",
    name: "Токарные станки с ЧПУ",
    description: "Токарная обработка деталей различной сложности.",
    itemsCount: 2,
  },
];

export const items: Item[] = [
  {
    id: "lf3015gar-12kw",
    categoryId: "laser",
    name: "G.Weike LF3015GAR-12kW",
    priceFrom: "от 12 500 000 ₽",
    specsList: [
      "Рабочее поле 1500×3000",
      "Мощность источника 12 000 Вт",
      "Закрытый тип",
    ],
    attrs: {
      "Тип станка": "Закрытый тип",
      "Рабочая зона (X, Y)": "1500x3000",
      "Мощность источника": "12 000",
      Цена: "от 12 500 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "lf3015e-3kw",
    categoryId: "laser",
    name: "G.Weike LF3015E-3kW",
    priceFrom: "от 4 900 000 ₽",
    specsList: [
      "Рабочее поле 1500×3000",
      "Мощность источника 3000 Вт",
      "Открытый тип",
    ],
    attrs: {
      "Тип станка": "Открытый тип",
      "Рабочая зона (X, Y)": "1500x3000",
      "Мощность источника": "3 000",
      Цена: "от 4 900 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "lf4020gar-6kw",
    categoryId: "laser",
    name: "G.Weike LF4020GAR-6kW",
    priceFrom: "от 8 700 000 ₽",
    specsList: [
      "Рабочее поле 2000×4000",
      "Мощность источника 6000 Вт",
      "Закрытый тип",
    ],
    attrs: {
      "Тип станка": "Закрытый тип",
      "Рабочая зона (X, Y)": "2000x4000",
      "Мощность источника": "6 000",
      Цена: "от 8 700 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "press-100t",
    categoryId: "press",
    name: "Листогибочный пресс PBH 100T3200",
    priceFrom: "от 3 200 000 ₽",
    specsList: ["Усилие 100 т", "Длина гиба 3200 мм"],
    attrs: {
      "Усилие (т)": "100",
      "Длина гиба, мм": "3200",
      Цена: "от 3 200 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "press-160t",
    categoryId: "press",
    name: "Листогибочный пресс PBH 160T4000",
    priceFrom: "от 5 400 000 ₽",
    specsList: ["Усилие 160 т", "Длина гиба 4000 мм"],
    attrs: {
      "Усилие (т)": "160",
      "Длина гиба, мм": "4000",
      Цена: "от 5 400 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "turn-500",
    categoryId: "turning",
    name: "Токарный станок CK6150",
    priceFrom: "от 2 800 000 ₽",
    specsList: ["Диаметр обработки 500 мм", "ЧПУ Siemens"],
    attrs: {
      "Диаметр обработки": "500",
      "Система ЧПУ": "Siemens",
      Цена: "от 2 800 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
  {
    id: "turn-630",
    categoryId: "turning",
    name: "Токарный станок CK6163",
    priceFrom: "от 3 600 000 ₽",
    specsList: ["Диаметр обработки 630 мм", "ЧПУ Fanuc"],
    attrs: {
      "Диаметр обработки": "630",
      "Система ЧПУ": "Fanuc",
      Цена: "от 3 600 000 ₽",
    },
    url: "https://vsestanky.ru",
  },
];