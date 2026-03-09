import React from "react";
import { useAuth } from "../context/authContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>

      <div className="mt-4 bg-white p-4 shadow rounded">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;