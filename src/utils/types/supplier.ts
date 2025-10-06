export type Supplier = {
  id: number;
  title: string;
  rating: number;
  city: string;
  isFavourite: boolean;
  category: string;
  logoSrc: string;
  description: string;
};

export enum SortColumn {
  ID = "id",
  TITLE = "title",
  RATING = "rating",
}
