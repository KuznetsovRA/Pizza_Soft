import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.jsx";
import { Professions } from "../../const.js";
import styles from "./table.module.scss";
const EmployeeTable = ({ sortedEmployees, onEdit, onDelete }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.tableContainer}>
      {isMobile ? (
        <table className={styles.table}>
          <thead>
            <tr className={styles.header}>
              <th>Имя</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr
                className={styles.row}
                key={employee.id}
                onClick={() => onEdit(employee.id)}
              >
                <td data-label="Имя" className={styles.rowName}>
                  {employee.name} <br />
                  {Professions[employee.role]}
                  <br />
                  {employee.phone}
                </td>
                <td data-label="Действия">
                  <Button
                    handleClick={(e) => {
                      e.stopPropagation();
                      onDelete(employee.id);
                    }}
                    styleType="deleteButton"
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.header}>
              <th>Имя</th>
              <th>Должность</th>
              <th>Телефон</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr
                className={styles.row}
                key={employee.id}
                onClick={() => onEdit(employee.id)}
              >
                <td data-label="Имя" className={styles.rowName}>
                  {employee.name}
                </td>
                <td data-label="Должность">{Professions[employee.role]}</td>
                <td data-label="Телефон" className={styles.rowPhone}>
                  {employee.phone}
                </td>
                <td data-label="Действия">
                  <Button
                    handleClick={(e) => {
                      e.stopPropagation();
                      onDelete(employee.id);
                    }}
                    styleType="deleteButton"
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeTable;
