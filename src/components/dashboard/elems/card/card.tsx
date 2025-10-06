import { useState } from "react";
import styles from "./card.module.css";
import { AddToFavouriteButton } from "./elems/add-to-favourite-button";
import { StarIcon } from "../../../icons/star-icon";
import { TransparentButton } from "../../../transparent-button";
import { useEditSupplierMutation } from "../../../../redux/services/suppliers";
import { Sidebar } from "../../../sidebar";

type CardProps = {
  logoSrc: string;
  isFavourite: boolean;
  title: string;
  category: string;
  city: string;
  rating: number;
  id: number;
  description: string;
};

export const Card = ({
  id,
  logoSrc,
  isFavourite,
  title,
  category,
  city,
  rating,
  description,
}: CardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [editSupplier] = useEditSupplierMutation();

  const filters = `${category} · ${city}`;

  const handleAddToFavourite = () => {
    editSupplier({
      id,
      isFavourite: !isFavourite,
    });
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <AddToFavouriteButton
          isFavourite={isFavourite}
          handleAddToFavourite={handleAddToFavourite}
        />
        <img src={logoSrc} alt="" />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{filters}</p>
        <div className={styles.rating}>
          <StarIcon />
          <p className={styles.ratingNumber}>{rating}</p>
        </div>
        <TransparentButton
          className={styles.readMoreButton}
          handleClick={handleSidebarOpen}
        >
          Подробнее
        </TransparentButton>
      </div>
      {
        <Sidebar
          open={isSidebarOpen}
          onClose={handleSidebarClose}
          supplier={{
            id,
            logoSrc,
            isFavourite,
            title,
            category,
            city,
            rating,
            description,
          }}
          filters={filters}
          onToggleFavourite={handleAddToFavourite}
        />
      }
    </div>
  );
};
