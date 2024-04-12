import { NextResponse } from "next/server";
import ReportModel from "@/backend/models/Report";
import connectDb from "@/backend/middleware/db";

const fetchReportsHandler = async (request) => {
  try {
    const rep = await request.json();

    // Fetch reports submitted by the specific employee
    const reports = await ReportModel.find({ userId: rep.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        reports,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching reports:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch reports",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(fetchReportsHandler);
