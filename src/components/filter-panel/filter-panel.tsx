import { useDispatch } from "react-redux";
import {
  suppliersFiltersSelector,
  suppliersIsLoadingSelector,
  suppliersRemoveFilter,
  suppliersSetFilter,
} from "../../redux/modules/suppliers";
import { FILTERS } from "../../utils/constants/filters";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";
import { Option } from "../../utils/types/common";
import { Filter, FilterColumns } from "../../utils/types/filters";
import { Select } from "../select";
import { SortButton } from "../sort-button";
import styles from "./filter-panel.module.css";
import { Skeleton } from "../skeleton";

export const FilterPanel = () => {
  const filters = useTypedSelector(suppliersFiltersSelector);
  const isLoading = useTypedSelector(suppliersIsLoadingSelector);

  const dispatch = useDispatch();

  const handleFilterChange = (selectedOption?: Option) => {
    if (!selectedOption) return;

    const newFilter = selectedOption.value as Filter;

    if (
      filters.some(
        ({ columnName, value }) =>
          columnName === newFilter.columnName && value === newFilter.value,
      )
    ) {
      dispatch(suppliersRemoveFilter(newFilter));
      return;
    }
    dispatch(suppliersSetFilter(newFilter));
  };

  const findCurrentFilter = (options: Option<Filter>[], label: string) => {
    if (label === FILTERS[1].label) return;

    const columnFilter = filters.find(
      ({ columnName }) => columnName === FilterColumns.CATEGORY,
    );

    if (!columnFilter) return null;

    return options.find(({ label }) => label === columnFilter?.value);
  };
  return (
    <div className={styles.container}>
      {isLoading ? <Skeleton width="135px" height="36px" /> : <SortButton />}
      {FILTERS.map(({ key, label, options }) =>
        isLoading ? (
          <Skeleton key={key} width="123px" height="36px" />
        ) : (
          <Select
            key={key}
            label={label}
            options={options}
            onChange={handleFilterChange}
            value={findCurrentFilter(options, label)}
          />
        ),
      )}
    </div>
  );
};
