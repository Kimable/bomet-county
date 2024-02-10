import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import DepartmentModel from "@/backend/models/Departments";
require("dotenv").config();

const fetchDepartmentsHandler = async (request) => {
  try {
    const departments = await DepartmentModel.find();

    return NextResponse.json(
      {
        departments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch departments.",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchDepartmentsHandler);
