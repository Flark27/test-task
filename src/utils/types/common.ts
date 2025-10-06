export enum RoutePath {
  DASHBOARD = "/dashboard",
  HOME = "/",
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export type Option<T = unknown> = {
  key: string;
  label: string;
  value?: T;
};

export type Tab = {
  id: number;
  label: string;
};

export enum SortDirection {
  DESC = "desc",
  ASC = "asc",
}
