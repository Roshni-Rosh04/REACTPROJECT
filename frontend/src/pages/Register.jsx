
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("employee");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  } catch (err) {
    const errorMsg =
      err.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen
      bg-gradient-to-b from-blue-600 to-blue-300">

      <div className="border shadow p-6 w-80 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="mb-3">
            <label className="block text-gray-700 mb-1">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          <select
            className="w-full mb-4 px-3 py-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center disabled:opacity-70"
            >
            {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
                "Register"
            )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
