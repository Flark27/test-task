import { FilterColumns, FilterSelect } from "../types/filters";

export const FILTERS: FilterSelect[] = [
  {
    key: 1,
    label: "Категория",
    options: [
      {
        key: "1",
        label: "Техника",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Техника",
        },
      },
      {
        key: "2",
        label: "Одежда",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Одежда",
        },
      },
      {
        key: "3",
        label: "Обувь",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Обувь",
        },
      },
      {
        key: "4",
        label: "Дом и сад",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Дом и сад",
        },
      },
      {
        key: "5",
        label: "Автотовары",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Автотовары",
        },
      },
      {
        key: "6",
        label: "Аксессуары",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Аксессуары",
        },
      },
      {
        key: "7",
        label: "Туризм",
        value: {
          columnName: FilterColumns.CATEGORY,
          value: "Туризм",
        },
      },
    ],
  },
  {
    key: 2,
    label: "Город",
    options: [
      {
        key: "1",
        label: "Москва",
        value: {
          columnName: FilterColumns.CITY,
          value: "Москва",
        },
      },
      {
        key: "2",
        label: "Санкт-Петербург",
        value: {
          columnName: FilterColumns.CITY,
          value: "Санкт-Петербург",
        },
      },
      {
        key: "3",
        label: "Уфа",
        value: {
          columnName: FilterColumns.CITY,
          value: "Уфа",
        },
      },
      {
        key: "4",
        label: "Саратов",
        value: {
          columnName: FilterColumns.CITY,
          value: "Саратов",
        },
      },
    ],
  },
];
