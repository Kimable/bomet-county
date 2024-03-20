import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import DocumentModel from "@/backend/models/Document";

const documentHandler = async (request) => {
  try {
    // This is for updating File name. Updating files is handled by the server
    const data = await request.json();
    const updateDoc = await DocumentModel.findByIdAndUpdate(data.docId, data);

    return NextResponse.json(
      {
        message: "Success",
        updateDoc,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while updating document:", error);
    return NextResponse.json(
      {
        message: "Failed to update the document",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(documentHandler);
