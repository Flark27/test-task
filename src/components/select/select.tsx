import { useState, useRef, useEffect } from "react";
import { Option, Theme } from "../../utils/types/common";
import { ArrowIcon } from "../icons/arrow-icon";
import styles from "./select.module.css";
import classNames from "classnames";
import { CheckmarkIcon } from "../icons/checkmark-icon";

type SelectProps = {
  label: string;
  options: Option[];
  onChange?: (selectedOption?: Option) => void;
  value?: Option | null;
};

export const Select = ({ label, options, onChange, value }: SelectProps) => {
  const isDarkTheme = localStorage.getItem("data-theme") === Theme.DARK;
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    Option | undefined | null
  >();

  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (
      (value || value === null) &&
      (!selectedOption || selectedOption !== value)
    ) {
      setSelectedOption(value);
    }
  }, [selectedOption, value]);

  const handleSelect = (option: Option) => () => {
    const isUnselect = option.key === selectedOption?.key;

    setSelectedOption(isUnselect ? undefined : option);
    onChange?.(option);
    setOpen(false);
    btnRef.current?.focus();
  };

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={btnRef}
        type="button"
        className={classNames({
          [styles.chip]: true,
          [styles.chipActive]: open,
          [styles.chipSelected]: selectedOption,
        })}
        onClick={handleButtonClick}
      >
        <span className={styles.chipText}>
          {selectedOption ? selectedOption.label : label}
        </span>
        <ArrowIcon
          className={classNames({
            [styles.chevron]: true,
            [styles.chevronOpen]: open,
            [styles.chevronActive]: selectedOption,
          })}
        />
      </button>

      {open && (
        <ul ref={listRef} role="listbox" className={styles.menu}>
          {options.map((option) => {
            const selectedNow = selectedOption?.key === option.key;
            return (
              <li
                key={option.key}
                role="option"
                aria-selected={selectedNow}
                className={styles.item}
                onClick={handleSelect(option)}
              >
                {selectedNow && <CheckmarkIcon isDarkTheme={isDarkTheme} />}
                <span className={styles.itemLabel}>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
