import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<RoleBaseRoutes requiredRole={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminSummary />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="add-employee" element={<AddEmployee />} />
              <Route path="departments" element={<DepartmentList />} />
              <Route path="add-department" element={<AddDepartment />} />
              <Route path="department/:id" element={<EditDepartment />} />
              <Route path="edit-employee/:id" element={<EditEmployee />} />
            </Route>
          </Route>
        </Route>

        {/* Protected Employee Routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<RoleBaseRoutes requiredRole={["employee"]} />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          </Route>
        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App; o