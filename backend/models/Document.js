import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    _id: String,
    userId: String,
    fileName: { type: String, default: `Document-${Date.now()}` },
    parentFolderId: String,
    data: Object,
  },
  { timestamps: true }
);

const DocumentModel =
  mongoose.models.document || mongoose.model("document", documentSchema);

export default DocumentModel;
