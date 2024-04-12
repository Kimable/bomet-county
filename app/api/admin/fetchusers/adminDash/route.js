// pages/api/fetchUsers.js
import { NextResponse } from "next/server";
import UserModel from "@/backend/models/User";
import connectDb from "@/backend/middleware/db";

const fetchUsersHandler = async () => {
  try {
    const employees = await UserModel.find({ teamLead: false });
    const supervisors = await UserModel.find({ teamLead: true });

    return NextResponse.json(
      {
        employees,
        supervisors,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(fetchUsersHandler);
