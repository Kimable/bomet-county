import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import DepartmentModel from "@/backend/models/Departments";
import UserModel from "@/backend/models/User";

const fetchDepartment = async (req) => {
  try {
    // Find all users who are team leads
    const { departmentId } = await req.json();
    const department = await DepartmentModel.findById(departmentId);

    const users = await UserModel.find({ department: departmentId });

    const departmentHead = await UserModel.findById(
      department.headOfDepartment
    );

    return NextResponse.json(
      {
        department,
        departmentHead,
        users,
      },

      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch departments",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(fetchDepartment);
