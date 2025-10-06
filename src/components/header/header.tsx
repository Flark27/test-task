import React, { ChangeEventHandler, useEffect, useState } from "react";
import styles from "./header.module.css";
import { Logo } from "../icons/logo";
import { Search } from "../search";
import { LoginButton } from "../login-button";
import { Switch } from "../switch";
import { Theme } from "../../utils/types/common";
import {
  suppliersIsActiveSearchSelector,
  suppliersIsLoadingSelector,
} from "../../redux/modules/suppliers";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";
import classNames from "classnames";
import { Skeleton } from "../skeleton";
import { useIsMobile } from "../../utils/hooks/use-is-mobile";

export const Header = () => {
  const isSearchActive = useTypedSelector(suppliersIsActiveSearchSelector);
  const isLoading = useTypedSelector(suppliersIsLoadingSelector);

  const [theme, setTheme] = useState(
    localStorage.getItem("data-theme") ?? Theme.LIGHT,
  );

  const isDarkTheme = theme === Theme.DARK;

  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem("data-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange: ChangeEventHandler<HTMLInputElement> = () => {
    localStorage.setItem("data-theme", theme);
    setTheme(isDarkTheme ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.activeSearch]: isSearchActive,
      })}
    >
      {!isSearchActive && !isLoading && <Logo isDarkTheme={isDarkTheme} />}
      {isLoading && <Skeleton width="155px" height="40px" />}
      <Search />
      {!isSearchActive && !isLoading && (
        <div className={styles.loginContainer}>
          <Switch
            checked={isDarkTheme}
            label="Тёмная тема"
            handleCheck={handleThemeChange}
          />
          <LoginButton />
        </div>
      )}
      {isLoading && (
        <React.Fragment>
          <Skeleton width={isMobile ? "24px" : "48px"} height="24px" />
          <Skeleton width={isMobile ? "24px" : "78px"} height="24px" />
        </React.Fragment>
      )}
    </div>
  );
};
