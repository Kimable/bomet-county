import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // User image URL or base64 data
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teamLead: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  teamLeadEmail: { type: String },
  department: { type: String },
  shift: { type: String },
  designation: { type: String }, // Eg. Chief Financial Officer
  IDNumber: { type: String },
  phoneNo: { type: String },
  employmentNo: { type: String },
  avatar: { type: String },
  // Add other fields as needed
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;
