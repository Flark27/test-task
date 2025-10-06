import { combineReducers } from "@reduxjs/toolkit";
import { SuppliersState, suppliersSlice } from "./modules/suppliers";
import {
  CombinedState,
  EndpointDefinitions,
} from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "./services";

export type ApplicationState = Readonly<{
  suppliers: SuppliersState;
  api: CombinedState<EndpointDefinitions, never, "api">;
}>;

export const rootReducer = combineReducers({
  [suppliersSlice.name]: suppliersSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
