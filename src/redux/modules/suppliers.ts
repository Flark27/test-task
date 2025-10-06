import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type ApplicationState } from "../root-reducer";
import { SortColumn, Supplier } from "../../utils/types/supplier";
import { Filter } from "../../utils/types/filters";

export type SuppliersState = {
  error: string;
  suppliers: Supplier[];
  search: string;
  filters: Filter[];
  sort: SortColumn;
  isSearchActive: boolean;
  isLoading: boolean;
};

export const initialState: SuppliersState = {
  error: "",
  suppliers: [],
  search: "",
  filters: [],
  sort: SortColumn.ID,
  isSearchActive: false,
  isLoading: true,
};

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    suppliersSetSuppliers(
      state,
      { payload: suppliers }: PayloadAction<Supplier[]>,
    ) {
      state.suppliers = suppliers;
    },
    suppliersSetSearch(state, { payload: search }: PayloadAction<string>) {
      state.search = search;
    },
    suppliersSetFilter(state, { payload: filter }: PayloadAction<Filter>) {
      const newFilters = [...state.filters];
      const filterIndex = newFilters.findIndex(
        ({ columnName }) => columnName === filter.columnName,
      );

      if (filterIndex !== -1) {
        newFilters[filterIndex] = filter;
      } else {
        newFilters.push(filter);
      }
      state.filters = newFilters;
    },
    suppliersRemoveFilter(state, { payload: filter }: PayloadAction<Filter>) {
      state.filters = state.filters.filter(
        ({ columnName }) => filter.columnName !== columnName,
      );
    },
    suppliersResetFilters(state) {
      state.filters = [];
    },
    suppliersSetSort(state, { payload: sort }: PayloadAction<SortColumn>) {
      state.sort = sort;
    },
    suppliersSetActiveSearch(
      state,
      { payload: isSearchActive }: PayloadAction<boolean>,
    ) {
      state.isSearchActive = isSearchActive;
    },
    suppliersSetIsLoading(
      state,
      { payload: isLoading }: PayloadAction<boolean>,
    ) {
      state.isLoading = isLoading;
    },
  },
});

export const suppliersFiltersSelector = (state: ApplicationState) =>
  state.suppliers.filters;
export const suppliersSuppliersSelector = (state: ApplicationState) =>
  state.suppliers.suppliers;
export const suppliersSearchSelector = (state: ApplicationState) =>
  state.suppliers.search;
export const suppliersSortSelector = (state: ApplicationState) =>
  state.suppliers.sort;
export const suppliersIsActiveSearchSelector = (state: ApplicationState) =>
  state.suppliers.isSearchActive;
export const suppliersIsLoadingSelector = (state: ApplicationState) =>
  state.suppliers.isLoading;

export const {
  suppliersRemoveFilter,
  suppliersSetFilter,
  suppliersSetSearch,
  suppliersSetSort,
  suppliersSetSuppliers,
  suppliersResetFilters,
  suppliersSetActiveSearch,
  suppliersSetIsLoading,
} = suppliersSlice.actions;
