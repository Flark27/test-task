import { SortDirection } from "../../utils/types/common";
import { Filter, FilterColumns } from "../../utils/types/filters";
import { SortColumn, Supplier } from "../../utils/types/supplier";
import { apiSlice } from "./index";

export const suppliersApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Suppliers"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSuppliers: builder.query<
        { suppliers: Supplier[]; total: number },
        {
          page?: number;
          search?: string;
          filters?: Filter[];
          sort?: string;
          limit?: number;
          getOnlyFavourite?: boolean;
        } | void
      >({
        query: (args) => {
          const {
            page = 1,
            limit = 15,
            search,
            sort,
            filters,
            getOnlyFavourite,
          } = args ?? {};

          const params = new URLSearchParams();
          params.set("_page", String(page));
          params.set("_limit", String(limit));

          if (search && search.trim()) params.set("q", search.trim());

          const cityFilter = filters?.find(
            ({ columnName }) => columnName === FilterColumns.CITY,
          )?.value;
          const categoriesFilter = filters?.find(
            ({ columnName }) => columnName === FilterColumns.CATEGORY,
          )?.value;

          if (cityFilter) {
            params.set("city", cityFilter);
          }

          if (categoriesFilter) {
            params.set("category", categoriesFilter);
          }

          if (getOnlyFavourite) {
            params.set("isFavourite", "true");
          }

          if (sort) {
            params.set("_sort", sort);
            params.set(
              "_order",
              sort === SortColumn.RATING
                ? SortDirection.DESC
                : SortDirection.ASC,
            );
          }

          return `/suppliers?${params.toString()}`;
        },
        transformResponse: (response: Supplier[], meta) => {
          const total = Number(
            meta?.response?.headers.get("x-total-count") ?? 0,
          );
          return { suppliers: response, total };
        },
        serializeQueryArgs: ({ endpointName, queryArgs }) => {
          const {
            search = "",
            sort = "",
            limit = 15,
            filters = [],
            getOnlyFavourite = false,
          } = queryArgs ?? {};
          const normalizedFilters = (filters as Filter[])
            .map((filter) => [filter.columnName, filter.value] as const)
            .sort((a, b) => String(a[0]).localeCompare(String(b[0])));

          return `${endpointName}|s=${search}|sort=${sort}|limit=${limit}|fav=${getOnlyFavourite}|filters=${JSON.stringify(normalizedFilters)}`;
        },

        merge: (currentCache, incoming) => {
          const map = new Map<number, Supplier>();
          for (const supplier of currentCache.suppliers)
            map.set(supplier.id, supplier);
          for (const supplier of incoming.suppliers)
            map.set(supplier.id, supplier);
          currentCache.suppliers = Array.from(map.values());
          currentCache.total = incoming.total;
        },

        forceRefetch({ currentArg, previousArg }) {
          return currentArg?.page !== previousArg?.page;
        },
        providesTags: (res) =>
          res
            ? [
                ...res.suppliers.map(({ id }) => ({
                  type: "Suppliers" as const,
                  id,
                })),
                { type: "Suppliers" as const, id: "LIST" },
              ]
            : [{ type: "Suppliers" as const, id: "LIST" }],
      }),
      editSupplier: builder.mutation<
        Supplier,
        Partial<Supplier> & { id: number }
      >({
        query: ({ id, ...patch }) => ({
          url: `/suppliers/${id}`,
          method: "PATCH",
          body: patch,
        }),
        async onQueryStarted(
          { id, ...patch },
          { dispatch, getState, queryFulfilled },
        ) {
          const passesFilters = (item: Supplier, args: any) => {
            const { search = "", filters = [] as Filter[] } = args ?? {};
            const city = filters.find(
              (filter: Filter) => filter.columnName === FilterColumns.CITY,
            )?.value;
            const category = filters.find(
              (filter: Filter) => filter.columnName === FilterColumns.CATEGORY,
            )?.value;

            if (city && item.city !== city) return false;
            if (category && item.category !== category) return false;
            if (
              search &&
              !`${item.title} ${item.city} ${item.category}`
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return false;
            }
            return true;
          };

          const cachedArgs = suppliersApiSlice.util.selectCachedArgsForQuery(
            getState() as any,
            "getSuppliers",
          ) as Array<any>;

          let sourceSupplier: Supplier | undefined;
          for (const args of cachedArgs) {
            const selectedArguments =
              suppliersApiSlice.endpoints.getSuppliers.select(args);
            const cache = selectedArguments(getState() as any);
            const found = cache?.data?.suppliers?.find(
              (supplier: Supplier) => supplier.id === id,
            );
            if (found) {
              sourceSupplier = { ...found, ...patch };
              break;
            }
          }
          const updatedCandidate: Supplier =
            sourceSupplier ?? ({ id, ...(patch as any) } as Supplier);

          const patches: { undo: () => void }[] = [];
          for (const args of cachedArgs) {
            const isFavList = !!args?.getOnlyFavourite;

            const patchedSupplier = dispatch(
              suppliersApiSlice.util.updateQueryData(
                "getSuppliers",
                args,
                (draft) => {
                  const idx = draft.suppliers.findIndex((s) => s.id === id);

                  const nextIsFav = Object.prototype.hasOwnProperty.call(
                    patch,
                    "isFavourite",
                  )
                    ? (patch as any).isFavourite
                    : idx !== -1
                      ? draft.suppliers[idx].isFavourite
                      : undefined;

                  if (isFavList) {
                    if (nextIsFav === false) {
                      if (idx !== -1) {
                        draft.suppliers.splice(idx, 1);
                        draft.total = Math.max(0, draft.total - 1);
                      }
                    } else if (nextIsFav === true) {
                      if (idx === -1) {
                        if (passesFilters(updatedCandidate, args)) {
                          draft.suppliers.unshift(updatedCandidate);
                          draft.total += 1;
                        }
                      } else {
                        Object.assign(draft.suppliers[idx], patch);
                      }
                    }
                  } else {
                    if (idx !== -1) {
                      Object.assign(draft.suppliers[idx], patch);
                    } else if (passesFilters(updatedCandidate, args)) {
                      draft.suppliers.unshift(updatedCandidate);
                      draft.total += 1;
                    }
                  }
                },
              ),
            );
            patches.push(patchedSupplier);
          }

          try {
            await queryFulfilled;
          } catch {
            patches.forEach((p) => p.undo());
          }
        },
        invalidatesTags: (_res, _err, arg) => [
          { type: "Suppliers", id: arg.id },
          { type: "Suppliers", id: "LIST" },
        ],
      }),
    }),
  });

export const { useGetSuppliersQuery, useEditSupplierMutation } =
  suppliersApiSlice;
