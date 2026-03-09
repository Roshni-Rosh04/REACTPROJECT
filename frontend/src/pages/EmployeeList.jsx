import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
    const navigate = useNavigate();
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
<button
  onClick={() => navigate("/admin-dashboard/add-employee")}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Add Employee
</button>

      <div className="mt-5">
        <p>Employee list will appear here.</p>
      </div>
    </div>
  );
};

export default EmployeeList;