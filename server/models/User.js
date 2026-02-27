import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// Update updatedAt automatically
userSchema.pre("save", function() {
  this.updatedAt = Date.now();

});

const User = mongoose.model("User", userSchema);
export default User;
