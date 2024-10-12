import React from "react";
import Select from "../select/select.jsx";
import styles from "./filter.module.scss";

const Filter = ({
  setSortOrder,
  sortType,
  role,
  setRole,
  isArchived,
  setIsArchived,
  children,
}) => {
  const sortOptions = [
    { value: "name", label: "Сортировать по имени" },
    { value: "birthday", label: "Сортировать по дате рождения" },
  ];

  const roleOptions = [
    { value: "", label: "Все должности" },
    { value: "cook", label: "Повар" },
    { value: "waiter", label: "Официант" },
    { value: "driver", label: "Водитель" },
  ];

  function onChangeSort(e) {
    setSortOrder(e.target.value);
    localStorage.setItem("sort", e.target.value);
  }

  function onChangeFilter(e) {
    setRole(e.target.value);
    localStorage.setItem("filter", e.target.value);
  }

  function onChangeArchive(e) {
    if (!e.target.checked) {
      localStorage.setItem("isArchive", ``);
    }
    if (e.target.checked) {
      localStorage.setItem("isArchive", `true`);
    }
    setIsArchived(e.target.checked);
  }

  return (
    <div className={styles.filter}>
      <Select options={sortOptions} value={sortType} onChange={onChangeSort} />
      <Select options={roleOptions} value={role} onChange={onChangeFilter} />
      <div className={styles.container}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isArchived}
            onChange={onChangeArchive}
          />
          В архиве
        </label>

        {children}
      </div>
    </div>
  );
};

export default Filter;
