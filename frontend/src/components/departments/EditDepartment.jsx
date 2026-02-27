import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: ""
  });

  const [depLoading, setDepLoading] = useState(false);

  // Fetch department by ID
  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        toast.error("Failed to load department");
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  // Update department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/department/${id}`,
        department,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Department updated successfully!"); 
        setTimeout(() => {
          navigate("/admin-dashboard/departments"); 
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update department"); 
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="text-center mt-20">Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-xl font-bold mb-6">Edit Department</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                value={department.dep_name}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={department.description}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
