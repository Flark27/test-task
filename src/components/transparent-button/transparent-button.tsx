import { ReactNode } from "react";
import styles from "./transparent-button.module.css";
import classNames from "classnames";

type TransparentButtonProps = {
  handleClick: () => void;
  children: ReactNode | ReactNode[];
  className?: string;
};

export const TransparentButton = ({
  handleClick,
  children,
  className,
}: TransparentButtonProps) => (
  <button
    onClick={handleClick}
    className={classNames({
      [styles.button]: true,
      [className ?? ""]: className,
    })}
  >
    {children}
  </button>
);
