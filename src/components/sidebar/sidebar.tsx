import styles from "./sidebar.module.css";
import { StarIcon } from "../icons/star-icon";
import { HeartIcon } from "../icons/heart-icon";
import { HeartFillIcon } from "../icons/heart-fill-icon";
import { CloseIcon } from "../icons/close-icon";
import { Supplier } from "../../utils/types/supplier";
import { Button } from "../button";
import { Theme } from "../../utils/types/common";

type SidebarProps = {
  open: boolean;
  supplier: Supplier;
  onClose: () => void;
  onToggleFavourite?: (id: number, next: boolean) => void;
  filters: string;
};

export const Sidebar = ({
  open,
  supplier,
  onClose,
  onToggleFavourite,
  filters,
}: SidebarProps) => {
  if (!open) return null;

  const isDarkTheme = localStorage.getItem("data-theme") === Theme.DARK;

  const { id, title, rating, logoSrc, description, isFavourite } = supplier;

  const handleFavourite = () => {
    onToggleFavourite?.(id, !isFavourite);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose} />

      <aside className={styles.panel}>
        <div className={styles.logoContainer}>
          <button className={styles.close} onClick={onClose}>
            <CloseIcon isDarkTheme={isDarkTheme} />
          </button>

          <img
            src={logoSrc}
            alt={title}
            className={styles.logo}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <div className={styles.rating}>
            <StarIcon />
            <span className={styles.ratingNumber}>{rating}</span>
            <span className={styles.ratingNumber}>{filters}</span>
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.footer}>
          <Button className={styles.button} handleClick={handleFavourite}>
            {isFavourite ? <HeartFillIcon /> : <HeartIcon />}
            {isFavourite ? "В избранном" : "Добавить в избранное"}
          </Button>
        </div>
      </aside>
    </div>
  );
};
