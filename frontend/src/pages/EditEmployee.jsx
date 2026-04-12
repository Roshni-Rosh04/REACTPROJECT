import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {

const { id } = useParams();
const navigate = useNavigate();

const [employee, setEmployee] = useState({
name: "",
email: "",
department: "",
salary: ""
});

useEffect(() => {

const employees =
JSON.parse(localStorage.getItem("employees")) || [];

setEmployee(employees[id]);

}, [id]);

const handleChange = (e) => {

setEmployee({
...employee,
[e.target.name]: e.target.value
});

};

const handleSubmit = (e) => {

e.preventDefault();

const employees =
JSON.parse(localStorage.getItem("employees")) || [];

employees[id] = employee;

localStorage.setItem("employees", JSON.stringify(employees));

alert("Employee Updated");

navigate("/admin-dashboard/employees");

};

return (

<div className="flex justify-center mt-10">

<div className="bg-white p-8 shadow-lg rounded w-[500px]">

<h1 className="text-2xl font-bold mb-6 text-center">
Edit Employee
</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
name="name"
value={employee.name}
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<input
type="email"
name="email"
value={employee.email}
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<input
type="text"
name="department"
value={employee.department}
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<input
type="number"
name="salary"
value={employee.salary}
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<button
className="w-full bg-green-500 text-white py-3 rounded"
>
Update Employee
</button>

</form>

</div>

</div>

);

};

export default EditEmployee;