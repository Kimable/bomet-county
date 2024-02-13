import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // User image URL or base64 data
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  email: { type: String, required: true, unique: true },
  teamLead: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  teamLeadEmail: { type: String },
  department: { type: String },
  shift: { type: String },
  designation: { type: String }, // Eg. Chief Financial Officer
  IDNumber: { type: String },
  phoneNo: { type: String },
  employmentNo: { type: String },
  nextOfKin: { type: String },
  nextOfKinPhone: { type: String },
  nextOfKinRelationship: { type: String },
  avatar: { type: String },
  password: { type: String, required: true },
  // Add other fields as needed
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;
