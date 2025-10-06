import classNames from "classnames";
import styles from "./tab.module.css";

type TabProps = {
  id: number;
  label: string;
  isSelected: boolean;
  handleTabChange: (id: number) => () => void;
};

export const Tab = ({ id, label, isSelected, handleTabChange }: TabProps) => (
  <div
    className={classNames({
      [styles.tab]: true,
      [styles.activeTab]: isSelected,
    })}
    onClick={handleTabChange(id)}
  >
    <h2 className={styles.label}>{label}</h2>
  </div>
);
