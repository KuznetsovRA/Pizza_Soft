import React, { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/button/button.jsx";
import EmployeeTable from "../../components/table/table.jsx";
import { Professions } from "../../const.js";
import { removeEmployee } from "../../store/reducer.js";
import Filter from "../../components/filter/filter.jsx";
import CreateEmployee from "../create-employee/create-employee.jsx";
import EditEmployee from "../edit-employee/edit-employee.jsx";
import styles from "./employees-list.module.scss";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const employees = useSelector((state) => state.employees);
  const [sortOrder, setSortOrder] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [archiveFilter, setArchiveFilter] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/edit/")) {
      setIsModalEditOpen(true);
      setIsModalCreateOpen(false);
    } else if (location.pathname === "/add") {
      setIsModalEditOpen(false);
      setIsModalCreateOpen(true);
    } else {
      setIsModalEditOpen(false);
      setIsModalCreateOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const savedSort = localStorage.getItem("sort");
    const savedFilter = localStorage.getItem("filter");
    const savedArchiveFilter = localStorage.getItem("isArchive") === "true";

    if (savedSort) setSortOrder(savedSort);
    if (savedFilter) setRoleFilter(savedFilter);
    setArchiveFilter(savedArchiveFilter);
  }, []);

  // Фильтрация сотрудников по должности и статусу
  const filteredEmployees = employees.filter((employee) => {
    const roleMatch = roleFilter ? employee.role === roleFilter : true;
    const archiveMatch = archiveFilter ? employee.isArchive : true;
    return roleMatch && archiveMatch;
  });

  // Сортировка сотрудников
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else {
      const dateA = new Date(a.birthday.split(".").reverse().join("-"));
      const dateB = new Date(b.birthday.split(".").reverse().join("-"));
      return dateA - dateB;
    }
  });

  const handleEditEmployeeClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddEmployeeClick = () => {
    navigate("/add");
  };

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
    setIsModalCreateOpen(false);
    navigate("/");
  };

  const handleDeleteEmployee = (id) => {
    dispatch(removeEmployee(id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.head}>Список сотрудников</h1>
      <Filter
        setSortOrder={setSortOrder}
        setRole={setRoleFilter}
        setIsArchived={setArchiveFilter}
        sortType={sortOrder}
        role={roleFilter}
        isArchived={archiveFilter}
      >
        <Button styleType={`addButton`} handleClick={handleAddEmployeeClick}>
          Добавить сотрудника
        </Button>
      </Filter>

      {/* Использование нового компонента */}
      <EmployeeTable
        sortedEmployees={sortedEmployees}
        onEdit={handleEditEmployeeClick}
        onDelete={handleDeleteEmployee}
      />

      {(isModalEditOpen || isModalCreateOpen) && (
        <div className={styles.modal} onClick={handleCloseModal}>
          {isModalEditOpen && <EditEmployee onClose={handleCloseModal} />}
          {isModalCreateOpen && <CreateEmployee onClose={handleCloseModal} />}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
