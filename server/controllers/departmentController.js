import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try {
    const departments = await Department.find()
    return res.status(200).json({success: true, departments})
  } catch(error) {
    return res.status(500).json({success:false, error: "get department server error"})
    }
}

const addDepartment = async(req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep})
    } catch(error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params; 
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params; 
    const { dep_name, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true } 
    );

    if (!updatedDepartment) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: updatedDepartment });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Edit department server error" });
  }
};



const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Delete department server error" });
  }
};



export {addDepartment, getDepartments, editDepartment, deleteDepartment, getDepartmentById}