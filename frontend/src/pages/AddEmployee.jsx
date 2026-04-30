import React, { useEffect, useState } from "react";
import { fetchdepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEmployee = () =>{

const [departments, setDepartments] = useState([]);
const [formData, setFormData] = useState({});

useEffect(() => {
  const getDepartments = async () => {
    const departments = await fetchdepartments();
    setDepartments(departments);
  };
  getDepartments();
}, []);

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "image") {
    setFormData((prevData) => ({...prevData, [name]: files[0]}))
  }
   else {
    setFormData((prevData) => ({...prevData, [name]: value}))
  }
};

const handleSubmit = async (e) => {
e.preventDefault();

  const formDataobj = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataobj.append(key, formData[key]);
  });

 try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/employee/add',
                 formDataobj,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    } 
                }
            );

            if(response.data.success){
                toast.success("Department added successfully!"); // ✅ toast success
                setTimeout(() => {
                    navigate("/admin-dashboard/departments"); // navigate after 1.5s
                }, 1500);
            }
        } catch(error) {
            console.error(error);
            // show toast error
            if(error.response && error.response.data.error){
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to add department");
            }
        }
}
return (
<div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
<h2 className="text-2xl font-bold mb-6 text-center font-serif">
  Add New Employee
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
  {/* name */}
  <label className="block text-sm font-medium text-gray-700">
   Name
  </label>
<input
type="text"
name="name"
placeholder="Employee Name"
className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
required
value={employee.name}
onChange={handleChange}
/>
</div>

{/* /*email*/ }
<div>
  <label className="block text-sm font-medium text-gray-700"
  > Email
  </label>
<input
type="email"
name="email"
placeholder="Employee Email"
className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
required
value={employee.email}
onChange={handleChange}
/>
</div>

{/* Employee ID */}
<div>
  <label className="block text-sm font-medium text-gray-700"> 
    Employee ID
  </label>
<input
type="text"
name="employeeId"
placeholder="Employee ID"
className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
required
value={employee.employeeId}
onChange={handleChange}
/>
</div>

{/* Date of Birth */}
<div>
  <label className="block text-sm font-medium text-gray-700"> 
    Date of Birth
  </label>
<input
type="date"
name="dob"
placeholder="Date of Birth"
className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
required
value={employee.dob}
onChange={handleChange}
/>
</div>

{/* GENDER */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Gender
  </label>
  <select
    name="gender"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
    value={employee.gender}
    onChange={handleChange}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

{/* MARITIAL STATUS */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Marital Status
  </label>
  <select
    name="maritalStatus"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
    value={employee.maritalStatus}
    onChange={handleChange}
  >
    <option value="">Select Marital Status</option>
    <option value="single">Single</option>
    <option value="married">Married</option>
    <option value="divorced">Divorced</option>
  </select>
</div>

{/* DESIGNATION */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Designation
  </label>
<input
type="text"
name="designation"
placeholder="Designation"
className="w-full border p-3 rounded border-gray-300"
required
value={employee.designation}
onChange={handleChange}
/>
</div>

{/* Department */}
<div>
  <label className="block text-sm font-medium text-gray-700"> 
    Department
  </label>
<select
name="department"
className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
required
value={employee.department}
onChange={handleChange}
>
  <option value="">Select Department</option>
  <option value="hr">Human Resources</option>
  <option value="it">Information Technology</option>
  <option value="finance">Finance</option>
</select>
</div>

{/* SALARY */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Salary
  </label>
  <input
    type="number"
    name="salary"
    placeholder="Salary"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
    value={employee.salary}
    onChange={handleChange}
  />
</div>

{/* PASSWORD */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Password
  </label>
  <input
    type="password"
    name="password"
    placeholder="Password"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
    value={employee.password}
    onChange={handleChange}
  />
</div>

{/* ROLE */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Role
  </label>
  <select
    name="role"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
    value={employee.role}
    onChange={handleChange}
  >
    <option value="">Select Role</option>
    <option value="employee">Employee</option>
    <option value="manager">Manager</option>
    <option value="admin">Admin</option>
  </select>
</div>

{/* Image Upload */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Profile Picture
  </label>
  <input
    type="file"
    name="image"
    placeholder="Upload Image"
    accept="image/*"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    required
  />
</div>
</div>

<button
type="submit"
className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
>
Add Employee
</button>
</form>
</div>
);
};

export default AddEmployee;