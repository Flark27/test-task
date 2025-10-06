import { GlobeIcon } from "../../components/icons/globe-icon";
import { Theme } from "../../utils/types/common";
import styles from "./not-found-page.module.css";

export const NotFoundPage = () => {
  const isDarkTheme = localStorage.getItem("data-theme") === Theme.DARK;
  return (
    <div className={styles.container}>
      <GlobeIcon isDarkTheme={isDarkTheme} />
      <h1 className={styles.header}>Страница не найдена</h1>
      <p className={styles.text}>Попробуйте зайти на другую страницу</p>
    </div>
  );
};
