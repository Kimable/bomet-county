import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import DepartmentModel from "@/backend/models/Departments";

const addDepartmentHandler = async (request) => {
  try {
    // Extract the field values from the request body
    const { departmentName, headOfDepartment } = await request.json();

    console.log("Received data:", { departmentName });

    // Create a new instance of the 'Alert' model and assign the field values
    const newDepartment = await new DepartmentModel({
      departmentName,
      headOfDepartment,
    });

    // Save the new Alert to the database
    const saveDepartment = await newDepartment.save();

    console.log("New Department", saveDepartment);
    return NextResponse.json(
      {
        saveDepartment,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving Alert:", error);
    return NextResponse.json(
      {
        message: "Failed to add department",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addDepartmentHandler);
