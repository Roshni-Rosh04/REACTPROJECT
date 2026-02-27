import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers
} from "react-icons/fa";

const AdminSidebar = () => {
  const linkStyle = ({ isActive }) =>
    `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-500`;

  return (
    <div className="bg-blue-400 text-white font-bold h-screen fixed left-0 top-0 bottom-0 w-64">
      <div className="bg-blue-600 h-12 flex items-center justify-center">
        <h3 className="text-xl font-pacifico">Employee MS</h3>
      </div>

      <div className="px-4 mt-4 space-y-2">
        <NavLink to="/admin-dashboard" className={linkStyle} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={linkStyle}>
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={linkStyle}>
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={linkStyle}>
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary" className={linkStyle}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/admin-dashboard/settings" className={linkStyle}>
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
