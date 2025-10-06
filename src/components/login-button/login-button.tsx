import React from "react";
import styles from "./login-button.module.css";
import { UserIcon } from "../icons/user-icon";

export const LoginButton = () => {
  return (
    <div className={styles.container}>
      <UserIcon />
      <p className={styles.loginText}>Войти</p>
    </div>
  );
};
