import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  headOfDepartment: { type: String },
  // Add other fields as needed
});

const DepartmentModel =
  mongoose.models.department || mongoose.model("department", departmentSchema);

export default DepartmentModel;
