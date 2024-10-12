import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state.js";

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload); // добавление нового сотрудника
    },
    editEmployee: (state, action) => {
      const employee = state.find((emp) => emp.id === action.payload.id);

      if (employee) {
        Object.assign(employee, action.payload); // обновление данных сотрудника
      }
    },
    removeEmployee: (state, action) => {
      const id = action.payload; // получение id для удаления
      return state.filter((emp) => emp.id !== id); // фильтрация списка
    },
  },
});

export default employeesSlice.reducer;
export const { addEmployee, editEmployee, removeEmployee } =
  employeesSlice.actions;
