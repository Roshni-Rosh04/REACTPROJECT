import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                 // remove token + clear user
    navigate("/login");       // redirect to login page
  };

  return (
    <div className="flex items-center text-white font-bold justify-between h-12 bg-blue-500 px-5">
      <p>Welcome {user?.name}</p>

      <button
        onClick={handleLogout}
        className="px-4 py-1 bg-blue-800 hover:bg-blue-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;