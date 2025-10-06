import React, { ChangeEventHandler } from "react";
import styles from "./switch.module.css";

interface SwitchProps {
  checked?: boolean;
  handleCheck?: ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  handleCheck,
  label,
}) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <span className={styles.slider} />
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};
