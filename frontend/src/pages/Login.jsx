import axios from 'axios';
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login", 
        { email, password }
      );

      if (response.data.success) {

        if (login) login(response.data.user);

      
        localStorage.setItem("token", response.data.token);

        
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate("/employee-dashboard");
        }
      }

    } 
      catch (err) {
       console.log(err.response); // helpful for debugging

  if (err.response && err.response.data && err.response.data.error) {
    toast.error(err.response.data.error);
  } else {
    toast.error("Server error");
  }
}
finally {
    setLoading(false);
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen
                bg-gradient-to-b from-blue-600 to-blue-300 space-y-6">

      <h2 className="font-pacifico text-3xl text-white">
  Employee Management System
</h2>


      <div className="border shadow p-6 w-80 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className='text-red-500 mb-2'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder='******'
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-blue-600">Forgot password</a>
          </div>

               <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Login"
                )}
              </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                 Don’t have an account?
                  <span
                    onClick={() => navigate("/register")}
                    className="text-blue-600 cursor-pointer ml-1 hover:underline"
                  >
                    Register
                  </span>
                </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
