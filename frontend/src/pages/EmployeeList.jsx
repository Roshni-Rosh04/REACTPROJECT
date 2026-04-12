import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  const deleteEmployee = (index) => {

    const updatedEmployees = [...employees];

    updatedEmployees.splice(index, 1);

    setEmployees(updatedEmployees);

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

  };

  return (
    <div className="p-5">

      <div className="flex justify-between mb-5">

        <h1 className="text-2xl font-bold">Employees</h1>

        <button
          onClick={() => navigate("/admin-dashboard/add-employee")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>

      </div>

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-200">

          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>

        </thead>

        <tbody>

          {employees.length === 0 ? (

            <tr>
              <td colSpan="5" className="text-center p-4">
                No Employees Found
              </td>
            </tr>

          ) : (

            employees.map((emp, index) => (

              <tr key={index} className="hover:bg-gray-100">

                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2">{emp.department}</td>
                <td className="border px-4 py-2">{emp.salary}</td>

                <td className="border px-4 py-2 space-x-2">

                <button
 onClick={() => navigate(`/admin-dashboard/edit-employee/${index}`)}
 className="bg-green-500 text-white px-3 py-1 rounded"
>
 Edit
</button>

                  <button
                    onClick={() => deleteEmployee(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default EmployeeList;