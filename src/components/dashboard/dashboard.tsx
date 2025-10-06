import { useEffect, useMemo, useState } from "react";
import { Button } from "../button";
import { ArrowIcon } from "../icons/arrow-icon";
import styles from "./dashboard.module.css";
import { Card } from "./elems/card";
import { Tabs } from "./elems/tabs";
import { useGetSupplierQueryWithParams } from "../../utils/hooks/use-get-suppliers-query-with-params";
import { TABS } from "../../utils/constants/tabs";
import {
  suppliersFiltersSelector,
  suppliersIsActiveSearchSelector,
  suppliersIsLoadingSelector,
  suppliersResetFilters,
  suppliersSearchSelector,
  suppliersSetIsLoading,
} from "../../redux/modules/suppliers";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";
import { EmptyMessage } from "./elems/empty-message";
import { useDispatch } from "react-redux";
import { getResultsWord } from "./helpers/get-results-word";
import { Skeleton } from "../skeleton";

export const Dashboard = () => {
  const filters = useTypedSelector(suppliersFiltersSelector);
  const search = useTypedSelector(suppliersSearchSelector);
  const isLoading = useTypedSelector(suppliersIsLoadingSelector);
  const isSearchActive = useTypedSelector(suppliersIsActiveSearchSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTabId, setSelectedTabId] = useState(TABS[0].id);

  const dispatch = useDispatch();

  const { data, isSuccess } = useGetSupplierQueryWithParams(
    currentPage,
    selectedTabId === TABS[1].id,
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(suppliersSetIsLoading(false));
    }
  }, [isSuccess]);

  const suppliers = useMemo(() => {
    const suppliers = data?.suppliers ?? [];

    if (!isSearchActive) return suppliers;

    return search ? suppliers : [];
  }, [data, isSearchActive]);

  const total = data?.total ?? 0;

  const hasMore = currentPage * 15 < total && (!isSearchActive || search);

  const showResultsNumber = isSearchActive && search;

  const handleShowMoreClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleTabChange = (id: number) => () => {
    setSelectedTabId(id);
    setCurrentPage(1);
  };

  const handleFiltersReset = () => {
    dispatch(suppliersResetFilters());
  };

  if (!suppliers.length && !isSearchActive && !isLoading) {
    return (
      <EmptyMessage
        handleResetFilters={handleFiltersReset}
        isFiltersActive={!!filters.length}
        handleBackToAllSuppliers={handleTabChange(TABS[0].id)}
      />
    );
  }

  return (
    <div className={styles.container}>
      {showResultsNumber && (
        <p>
          {total} {getResultsWord(total)}
        </p>
      )}
      {!isSearchActive && (
        <Tabs selectedTabId={selectedTabId} handleTabChange={handleTabChange} />
      )}
      <div className={styles.cardsGrid}>
        {isLoading
          ? Array.from({ length: 15 }).map((_, i) => (
              <Skeleton width="227px" height="328px" key={i} />
            ))
          : suppliers.map((supplier) => (
              <Card key={supplier.id} {...supplier} />
            ))}
      </div>
      {isLoading && <Skeleton width="135px" height="45px" margin="auto" />}
      {hasMore && !isLoading && (
        <Button
          className={styles.showMoreButton}
          handleClick={handleShowMoreClick}
        >
          Показать ещё
          <ArrowIcon className={styles.arrowIcon} />
        </Button>
      )}
    </div>
  );
};
