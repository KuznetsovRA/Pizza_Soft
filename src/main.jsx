import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import employeesReducer from "./store/reducer.js";

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
