import { Option } from "./common";

export type Filter = {
  columnName: string;
  value: string;
};

export type FilterSelect = {
  key: number;
  label: string;
  options: Option<Filter>[];
};

export enum FilterColumns {
  CATEGORY = "category",
  CITY = "city",
}
