import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";



//LOGIN
export const loginUser = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No login data received"
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Wrong password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

//REGISTER
export const registerUser = async (req, res) => { 
  try { 
    
    const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password are required",
      });
    }

  // Check if user already exists 
  const existingUser = await User.findOne({ email });
   if (existingUser)
     { return res
       .status(400)
        .json({ success: false, error: "User already exists" }); 
      }

       let imageUrl = "";
       
if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "ems/users",
  });
  imageUrl = result.secure_url;
}


// Hash password 
const hashedPassword = await bcrypt.hash(password,10);

// Create user
const user = await User.create({ 
  name, 
  email, 
  password: hashedPassword, 
  role: role || "employee", 
  profileImage: imageUrl,
}); 

res.status(201).json({ 
  success: true, 
  message: "User registered successfully", 
  user: { 
  id: user._id, 
  name: user.name, 
  email: user.email, 
  role: user.role, 
  profileImage: user.profileImage,
},
 }); 
} catch (err) {
   console.error("Register Error:", err);
  let message = "Server error"; 
  
  // Duplicate email 
  if (err.code === 11000) { 
    message = "Email already exists"; 
  } 
  // Validation errors 
  if (err.name === "ValidationError") 
    { message = Object.values(err.errors).map(e => 
    e.message).join(", ");
   }
    res.status(500).json({ success: false, error: message }); 
     
  } };