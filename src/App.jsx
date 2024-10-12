import "./App.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployee from "./pages/create-employee/create-employee.jsx";
import EditEmployee from "./pages/edit-employee/edit-employee.jsx";
import EmployeesList from "./pages/main/empoyees-list.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<EmployeesList />} />
            <Route path="/edit/:id" element={<EmployeesList />} />
            <Route path="/add" element={<EmployeesList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
