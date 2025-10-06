import {
  suppliersFiltersSelector,
  suppliersSearchSelector,
  suppliersSortSelector,
} from "../../redux/modules/suppliers";
import { useGetSuppliersQuery } from "../../redux/services/suppliers";
import { useTypedSelector } from "./typed-react-redux-hooks";

export const useGetSupplierQueryWithParams = (
  page: number,
  getOnlyFavourite: boolean,
) => {
  const filters = useTypedSelector(suppliersFiltersSelector);
  const search = useTypedSelector(suppliersSearchSelector);
  const sort = useTypedSelector(suppliersSortSelector);

  const query = useGetSuppliersQuery({
    page,
    search,
    filters,
    sort,
    getOnlyFavourite,
  });

  return query;
};
