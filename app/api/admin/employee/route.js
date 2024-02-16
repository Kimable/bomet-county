// pages/api/fetchUsers.js
import { NextResponse } from "next/server";
import UserModel from "@/backend/models/User";
import connectDb from "@/backend/middleware/db";

const fetchSingleUser = async (request) => {
  try {
    // Fetch users

    const { employee } = await request.json();

    const user = await UserModel.findById(employee);

    console.log(user);

    return NextResponse.json(
      {
        user,
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

export const POST = connectDb(fetchSingleUser);
