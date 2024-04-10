import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    _id: String,
    userId: String,
    fileName: { type: String, default: `Untitled Document` },
    parentFolderId: String,
    data: Object,
    sharedWith: [String],
  },
  { timestamps: true }
);

const DocumentModel =
  mongoose.models.document || mongoose.model("document", documentSchema);

export default DocumentModel;
