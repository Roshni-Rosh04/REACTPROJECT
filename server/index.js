import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import departmentRoutes from "./routes/department.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));