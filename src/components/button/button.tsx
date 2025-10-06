import { ReactNode } from "react";
import styles from "./button.module.css";
import classNames from "classnames";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode | ReactNode[];
  className?: string;
};

export const Button = ({ handleClick, children, className }: ButtonProps) => (
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
