import { ReactNode } from "react";
import styles from "./contact.module.css";

type ContactProps = {
  icon: ReactNode;
  title: string;
  number: string;
};

export const Contact = ({ icon, title, number }: ContactProps) => (
  <div className={styles.container}>
    {icon}
    <p className={styles.title}>{title}</p>
    <p className={styles.number}>{number}</p>
  </div>
);
