import React from "react";
import styles from "./select.module.scss";

const Select = ({ options, value, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
