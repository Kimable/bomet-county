import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import DocumentModel from "@/backend/models/Document";

const documentHandler = async (request) => {
  try {
    // This is for sharing document.
    const data = await request.json();
    const updateDoc = await DocumentModel.findByIdAndUpdate(
      data.docId,
      { $push: { sharedWith: { $each: data.email } } },
      { new: true }
    );

    return NextResponse.json(
      {
        message: `Shared document successfully with ${data.email}`,
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
