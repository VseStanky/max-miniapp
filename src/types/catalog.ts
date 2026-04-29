export type Category = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  itemsCount: number;
};

export type Item = {
  id: string;
  categoryId: string;
  name: string;
  priceFrom: string;
  specsList: string[];
  attrs: Record<string, string>;
  url?: string;
};

export type FacetValue = {
  value: string;
  count: number;
};

export type Facet = {
  key: string;
  name: string;
  type: "checkbox" | "price";
  values: FacetValue[];
};

export type ActiveFilters = Record<string, Record<string, string>>;