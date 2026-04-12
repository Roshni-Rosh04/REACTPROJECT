import axios from 'axios';
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/department/add',
                department,
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
        <div className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label 
                        htmlFor="dep_name" 
                        className="text-sm font-medium text-gray-700"
                    >
                        Department Name
                    </label>
                    <input 
                        type="text" 
                        name="dep_name" 
                        onChange={handleChange}
                        placeholder="Department Name" 
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mt-3">
                    <label
                        htmlFor="description"
                        className="mt-1 p-2 block w-full border-gray-700"
                    >
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        placeholder="Description" 
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        rows="4"
                    ></textarea>
                </div>

                <button
                    type="submit" 
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
