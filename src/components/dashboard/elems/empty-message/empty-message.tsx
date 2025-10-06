import styles from "./empty-message.module.css";
import { Theme } from "../../../../utils/types/common";
import { FolderIcon } from "../../../icons/folder-icon";
import { Button } from "../../../button";

type EmptyMessageProps = {
  isFiltersActive: boolean;
  handleBackToAllSuppliers: () => void;
  handleResetFilters: () => void;
};

export const EmptyMessage = ({
  handleBackToAllSuppliers,
  handleResetFilters,
  isFiltersActive,
}: EmptyMessageProps) => {
  const isDarkTheme = localStorage.getItem("data-theme") === Theme.DARK;

  return (
    <div className={styles.container}>
      <FolderIcon isDarkTheme={isDarkTheme} />
      <h1 className={styles.header}>
        {isFiltersActive ? "Здесь" : "Пока"} пусто
      </h1>
      <p className={styles.text}>
        {isFiltersActive
          ? "Попробуйте выбрать другие фильтры"
          : "Вы пока ничего не добавили в избранное"}
      </p>
      <Button
        className={styles.button}
        handleClick={
          isFiltersActive ? handleResetFilters : handleBackToAllSuppliers
        }
      >
        {isFiltersActive ? "Сбросить фильтры" : "Назад к поставщикам"}
      </Button>
    </div>
  );
};
