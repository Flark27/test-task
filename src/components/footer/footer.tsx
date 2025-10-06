import { useDispatch } from "react-redux";
import { CONTACTS } from "../../utils/constants/contacts";
import { FILTERS } from "../../utils/constants/filters";
import { USEFUL_LINKS } from "../../utils/constants/useful-links";
import { Filter } from "../../utils/types/filters";
import { Logo } from "../icons/logo";
import { Contact } from "./elems/contact/contact";
import { FooterBlock } from "./elems/footer-block";
import styles from "./footer.module.css";
import {
  suppliersFiltersSelector,
  suppliersRemoveFilter,
  suppliersSetFilter,
} from "../../redux/modules/suppliers";
import { useTypedSelector } from "../../utils/hooks/typed-react-redux-hooks";

export const Footer = () => {
  const filters = useTypedSelector(suppliersFiltersSelector);
  const dispatch = useDispatch();

  const handleCategoryClick = (filter?: Filter) => () => {
    if (!filter) return;

    if (
      filters.some(
        ({ columnName, value }) =>
          columnName === filter.columnName && value === filter.value,
      )
    ) {
      dispatch(suppliersRemoveFilter(filter));
      return;
    }
    dispatch(suppliersSetFilter(filter));
  };
  return (
    <div className={styles.container}>
      <div className={styles.textBlock}>
        <div className={styles.contactsBlock}>
          <Logo isDarkTheme={true} />
          <p className={styles.contactsTitle}>Контакты</p>
          <div className={styles.contacts}>
            {CONTACTS.map(({ id, number, icon, title }) => (
              <Contact key={id} number={number} icon={icon} title={title} />
            ))}
          </div>
        </div>
        <FooterBlock
          title="Категории"
          containerClassName={styles.categoriesContainer}
          handleItemClick={handleCategoryClick}
          items={FILTERS[0].options}
          headerClassname={styles.categoriesHeader}
        />
        <FooterBlock
          title="Полезно"
          items={USEFUL_LINKS}
          headerClassname={styles.usefulHeader}
        />
      </div>
      <div className={styles.disclaimer}>
        <p className={styles.disclaimerText}>© 2025 Все права защищены</p>
      </div>
    </div>
  );
};
