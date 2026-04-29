import type { Facet } from "../types/catalog";

export const facetsByCategory: Record<string, Facet[]> = {
  laser: [
    {
      key: "Тип станка",
      name: "Тип станка",
      type: "checkbox",
      values: [
        { value: "Закрытый тип", count: 2 },
        { value: "Открытый тип", count: 1 },
      ],
    },
    {
      key: "Рабочая зона (X, Y)",
      name: "Рабочая зона (X, Y)",
      type: "checkbox",
      values: [
        { value: "1500x3000", count: 2 },
        { value: "2000x4000", count: 1 },
      ],
    },
    {
      key: "Мощность источника",
      name: "Мощность источника",
      type: "checkbox",
      values: [
        { value: "3 000", count: 1 },
        { value: "6 000", count: 1 },
        { value: "12 000", count: 1 },
      ],
    },
  ],
  press: [
    {
      key: "Усилие (т)",
      name: "Усилие (т)",
      type: "checkbox",
      values: [
        { value: "100", count: 1 },
        { value: "160", count: 1 },
      ],
    },
    {
      key: "Длина гиба, мм",
      name: "Длина гиба, мм",
      type: "checkbox",
      values: [
        { value: "3200", count: 1 },
        { value: "4000", count: 1 },
      ],
    },
  ],
  turning: [
    {
      key: "Диаметр обработки",
      name: "Диаметр обработки",
      type: "checkbox",
      values: [
        { value: "500", count: 1 },
        { value: "630", count: 1 },
      ],
    },
    {
      key: "Система ЧПУ",
      name: "Система ЧПУ",
      type: "checkbox",
      values: [
        { value: "Siemens", count: 1 },
        { value: "Fanuc", count: 1 },
      ],
    },
  ],
};