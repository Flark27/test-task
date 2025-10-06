import { HeartFillIcon } from "../../../../../icons/heart-fill-icon";
import { HeartIcon } from "../../../../../icons/heart-icon";
import styles from "./add-to-favourite-button.module.css";

type AddToFavouriteButtonProps = {
  isFavourite: boolean;
  handleAddToFavourite: () => void;
};

export const AddToFavouriteButton = ({
  isFavourite,
  handleAddToFavourite,
}: AddToFavouriteButtonProps) => (
  <div className={styles.container} onClick={handleAddToFavourite}>
    {isFavourite ? <HeartFillIcon /> : <HeartIcon />}
  </div>
);
