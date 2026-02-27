import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "80px" },
  { name: "Department Name", selector: (row) => row.dep_name, sortable: true },
  { name: "Action", selector: (row) => row.action },
];

export const DepartmentButtons = ({ DepId, refreshList }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
        if (!window.confirm("Are you sure you want to delete this department?")) return;

    if (!token) return toast.error("You are not logged in");

    // Optional: use toast for confirmation instead of window.confirm
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3000/api/department/${DepId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Department deleted successfully");
        refreshList && refreshList(); // refresh table without reload
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
      >
        Edit
      </button>
        
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
    
  );
};
