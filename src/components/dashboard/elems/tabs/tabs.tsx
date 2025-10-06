import { useState } from "react";
import { TABS } from "../../../../utils/constants/tabs";
import { Tab } from "../../../tab/tab";
import styles from "./tabs.module.css";
import { useTypedSelector } from "../../../../utils/hooks/typed-react-redux-hooks";
import { suppliersIsLoadingSelector } from "../../../../redux/modules/suppliers";
import { Skeleton } from "../../../skeleton";

type TabsProps = {
  selectedTabId: number;
  handleTabChange: (id: number) => () => void;
};

export const Tabs = ({ selectedTabId, handleTabChange }: TabsProps) => {
  const isLoading = useTypedSelector(suppliersIsLoadingSelector);
  return (
    <div className={styles.container}>
      {TABS.map(({ id, label }) =>
        isLoading ? (
          <Skeleton width="206px" height="34px" margin="0 0 16px 0" />
        ) : (
          <Tab
            key={id}
            id={id}
            label={label}
            isSelected={id === selectedTabId}
            handleTabChange={handleTabChange}
          />
        ),
      )}
    </div>
  );
};
