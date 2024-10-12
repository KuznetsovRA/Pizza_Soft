import React, { memo } from "react";
import styles from "./button.module.scss";

const Button = (props) => {
  const { children, handleClick, styleType, type = `button` } = props;
  return (
    <button type={type} onClick={handleClick} className={styles[styleType]}>
      {children}
    </button>
  );
};

export default memo(Button);
