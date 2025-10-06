import { useDispatch } from "react-redux";
import { SortIcon } from "../icons/sort-icon";
import styles from "./sort-button.module.css";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";
import {
  suppliersSetSort,
  suppliersSortSelector,
} from "../../redux/modules/suppliers";
import { SortColumn } from "../../utils/types/supplier";

export const SortButton = () => {
  const sort = useTypedSelector(suppliersSortSelector);
  const dispatch = useDispatch();

  const handleSortChange = () => {
    let nextSort = SortColumn.TITLE;

    if (sort === SortColumn.TITLE) {
      nextSort = SortColumn.RATING;
    }

    if (sort === SortColumn.RATING) {
      nextSort = SortColumn.ID;
    }

    dispatch(suppliersSetSort(nextSort));
  };
  return (
    <button className={styles.button} onClick={handleSortChange}>
      <SortIcon />
      Сортировка
    </button>
  );
};
