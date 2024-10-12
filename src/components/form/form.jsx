import React, { memo, useState } from "react";
import {
  formatDateFromInput,
  formatDateForInput,
  formatPhoneNumber,
} from "../../utils.js";
import Button from "../button/button.jsx";
import styles from "./form.module.scss";

const Form = (props) => {
  const {
    onSubmit,
    employee = {
      name: "",
      phone: "",
      birthday: "",
      role: "не выбрано",
      isArchive: false,
    },
  } = props;
  const [employeeData, setEmployeeData] = useState(employee);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "date") {
      newValue = formatDateFromInput(value);
    } else if (name === "phone") {
      newValue = formatPhoneNumber(value);
    } else {
      newValue = value;
    }

    setEmployeeData({
      ...employeeData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.checkValidity();
    const newEmployeeData = !employeeData.id
      ? {
          ...employeeData,
          id: Date.now(),
        }
      : {
          ...employeeData,
        };
    setEmployeeData(newEmployeeData);
    onSubmit(newEmployeeData);
  };

  return (
    <div className={styles.employeeForm} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.head}>
        {employee.id ? "Редактировать сотрудника" : "Добавить сотрудника"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
          placeholder="Имя"
          required
        />
        <input
          type="tel"
          name="phone"
          value={employeeData.phone}
          onChange={handleChange}
          placeholder="Телефон"
          required
          pattern="\+7 \(\d{3}\) \d{3}-\d{4}"
          title="Формат: +7 (XXX) XXX-XXXX"
        />
        <input
          type="date"
          name="birthday"
          value={
            employeeData.birthday
              ? formatDateForInput(employeeData.birthday)
              : ""
          }
          onChange={handleChange}
          placeholder="Дата рождения"
          required
        />
        <select
          name="role"
          value={employeeData.role}
          onChange={handleChange}
          required
        >
          <option value="">Не выбрано</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
        <div className={styles.archive}>
          <input
            type="checkbox"
            name="isArchive"
            checked={employeeData.isArchive}
            onChange={handleChange}
          />
          <label>В архиве</label>
        </div>

        <Button type="submit" styleType={`addButton`}>
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default memo(Form);
