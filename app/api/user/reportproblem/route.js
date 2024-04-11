import { NextResponse } from "next/server";
import ReportModel from "@/backend/models/Report";
import connectDb from "@/backend/middleware/db";

const reportProblemHandler = async (request) => {
  try {
    // Extract the field values from the request body
    const { userId, message } = await request.json();

    console.log("Received report data:", {
      userId,
      message,
    });

    // Create a new instance of the 'Report' model and assign the field values
    const newReport = new ReportModel({
      userId,
      message,
    });

    // Save the new problem report to the database
    const savedReport = await newReport.save();

    console.log("new problem report", savedReport);
    return NextResponse.json(
      {
        savedReport,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error reporting problem:", error);
    return NextResponse.json(
      {
        message: "Failed to report problem",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(reportProblemHandler);
