import React from "react";
import styles from "./layout.module.css";
import { Outlet } from "react-router";
import { Header } from "../header";
import { FilterPanel } from "../filter-panel";
import { suppliersIsActiveSearchSelector } from "../../redux/modules/suppliers";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";

export const Layout = () => {
  const isSearchActive = useTypedSelector(suppliersIsActiveSearchSelector);
  return (
    <div className={styles.layout}>
      <Header />
      {!isSearchActive && <FilterPanel />}
      <Outlet />
    </div>
  );
};
