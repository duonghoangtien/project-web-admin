import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import AddEditDepartment from "./components/AddEditDepartment";
import AddEditEmployee from "./components/AddEditEmployee";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import AdminLayout from "./pages/Admin/AdminLayout";
import DepartmentPage from "./pages/Admin/DepartmentPage";
import EmployeePage from "./pages/Admin/EmployeePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/" to="/admin" exact />
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin" exact>
          <AdminLayout />
        </PrivateRoute>
        <PrivateRoute path="/admin/department" exact>
          <DepartmentPage />
        </PrivateRoute>
        <PrivateRoute path="/admin/department/add" exact>
          <AddEditDepartment />
        </PrivateRoute>
        <PrivateRoute path="/admin/department/:departmentId" exact>
          <AddEditDepartment />
        </PrivateRoute>
        <PrivateRoute path="/admin/employee" exact>
          <EmployeePage />
        </PrivateRoute>
        <PrivateRoute path="/admin/employee/add" exact>
          <AddEditEmployee />
        </PrivateRoute>
        <PrivateRoute path="/admin/employee/:employeeId" exact>
          <AddEditEmployee />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
