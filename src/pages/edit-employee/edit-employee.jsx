import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/form/form.jsx";
import { editEmployee } from "../../store/reducer.js";
import { useParams } from "react-router-dom";

const EditEmployee = ({ onClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [employeeData, setEmployeeData] = useState(null);

  useLayoutEffect(() => {
    if (id) {
      const employee = employees.find(
        (employee) => employee.id === parseInt(id),
      );
      if (employee) {
        setEmployeeData(employee);
      } else {
        throw new Error("Employee not found/problem with id");
      }
    }
  }, [id, employees]);

  const handleSubmit = (data) => {
    setEmployeeData(data);
    dispatch(editEmployee(data));
    onClose();
  };
  return employeeData ? (
    <Form onSubmit={handleSubmit} employee={employeeData} />
  ) : (
    <p>Загрузка...</p>
  );
};

export default EditEmployee;
