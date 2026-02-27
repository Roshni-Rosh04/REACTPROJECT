import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons DepId={dep._id} refreshList={fetchDepartments} />,
          }));

          setDepartments(data);
          setFilterData(data);
        }
      } catch (error) {
        alert("Failed to load departments");
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);


  useEffect(() => {
    const result = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterData(result);
  }, [search, departments]);

  return (
    <>
      <div className="p-5">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">Manage Departments</h3>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by department name"
            className="px-4 py-1 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link
            to="/admin-dashboard/add-department"
            className="px-4 py-1 bg-blue-500 rounded text-white"
          >
            Add New Department
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={filterData}
          progressPending={depLoading}
          pagination
          highlightOnHover
        />
      </div>
    </>
  );
};

export default DepartmentList;
