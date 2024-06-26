import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Info" },

    // Add other fields as needed
  },
  { timestamps: true }
);

const AlertModel =
  mongoose.models.alerts || mongoose.model("alerts", alertSchema);

export default AlertModel;
