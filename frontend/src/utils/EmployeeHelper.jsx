import axios from "axios";

export const fetchDepartments = async () => {
  let departments 
      try {
        const responnse = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (responnse.data.success) {
          departments = responnse.data.departments;
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
      return departments; 
    };