import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        
      {/* Auth routes */}
      <Route path="/login" element={<Login />}> </Route>
      <Route path="/register" element={<Register />} />
      
  {/* Admin Dashboard */}
      <Route
       path="/admin-dashboard" element={
      <PrivateRoutes>
        <RoleBaseRoutes requiredRole={["admin"]}>
          <AdminDashboard />  
        </RoleBaseRoutes>      
      </PrivateRoutes>
     
    }>
      <Route index element={<AdminSummary />} />
      <Route path="employees" element={<EmployeeList />} />
      <Route path="add-employee" element={<AddEmployee />} />
        <Route path="departments" element={<DepartmentList />} />
        <Route path="add-department" element={<AddDepartment />} />
        <Route path="department/:id" element={<EditDepartment />} />
      </Route>

        {/* Employee Dashboard */}
      <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
    </Routes>

    <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
