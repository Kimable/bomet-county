import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import DocumentModel from "@/backend/models/Document";

const documentHandler = async (request) => {
  try {
    // Get the action from the query parameter instead of request body
    const { parentFolderId, userId } = await request.json();
    const getDocuments = await DocumentModel.find({ parentFolderId, userId });

    return NextResponse.json(
      {
        message: "Success",
        getDocuments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while fetching created documets:", error);
    return NextResponse.json(
      {
        message: "Failed to save document",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(documentHandler);
