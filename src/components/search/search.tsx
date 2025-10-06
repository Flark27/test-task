import { useDispatch } from "react-redux";
import { SearchIcon } from "../icons/search-icon";
import styles from "./search.module.css";
import {
  suppliersIsActiveSearchSelector,
  suppliersIsLoadingSelector,
  suppliersSetActiveSearch,
  suppliersSetSearch,
} from "../../redux/modules/suppliers";
import { ChangeEventHandler, useEffect } from "react";
import { debounce } from "../../utils/helpers/debounce";
import { useIsMobile } from "../../utils/hooks/use-is-mobile";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";
import { CloseIcon } from "../icons/close-icon";
import { Theme } from "../../utils/types/common";
import { Skeleton } from "../skeleton";

export const Search = () => {
  const isSearchActive = useTypedSelector(suppliersIsActiveSearchSelector);
  const isDarkTheme = localStorage.getItem("data-theme") === Theme.DARK;
  const isLoading = useTypedSelector(suppliersIsLoadingSelector);

  const dispatch = useDispatch();

  const isMobile = useIsMobile();

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(suppliersSetSearch(event.target.value));
  };

  const handleActiveSearch = (isSearchActive: boolean) => () => {
    dispatch(suppliersSetActiveSearch(isSearchActive));
    if (!isSearchActive) {
      dispatch(suppliersSetSearch(""));
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      document.getElementById("search")?.focus();
    }
  }, [isSearchActive]);

  if (isLoading) {
    return (
      <Skeleton
        width={isMobile ? "24px" : "504px"}
        height={isMobile ? "24px" : "48px"}
      />
    );
  }

  if (isMobile && !isSearchActive) {
    return (
      <button
        onClick={handleActiveSearch(true)}
        className={styles.searchButton}
      >
        <SearchIcon />
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <label htmlFor="search">
        <SearchIcon />
      </label>
      <input
        id="search"
        placeholder="Поиск"
        className={styles.input}
        onChange={debounce(handleSearchChange)}
      />
      {isSearchActive && (
        <button
          onClick={handleActiveSearch(false)}
          className={styles.closeSearchButton}
        >
          <CloseIcon isDarkTheme={isDarkTheme} />
        </button>
      )}
    </div>
  );
};
