import { Filter } from "../../../../utils/types/filters";
import { Option } from "../../../../utils/types/common";

import styles from "./footer-block.module.css";
import classNames from "classnames";

type FooterBlockProps = {
  items: Partial<Option<Filter>>[];
  title: string;
  handleItemClick?: (value?: Filter) => () => void;
  containerClassName?: string;
  headerClassname?: string;
};

export const FooterBlock = ({
  items,
  title,
  handleItemClick,
  containerClassName,
  headerClassname,
}: FooterBlockProps) => (
  <div className={containerClassName}>
    <div
      className={classNames({
        [styles.header]: true,
        [headerClassname ?? ""]: headerClassname,
      })}
    >
      <p className={styles.title}>{title}</p>
    </div>
    <ul className={styles.list}>
      {items.map(({ key, label, value }) => (
        <li
          className={styles.listItem}
          key={key}
          onClick={handleItemClick?.(value)}
        >
          {label}
        </li>
      ))}
    </ul>
  </div>
);
