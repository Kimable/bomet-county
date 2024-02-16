// pages/api/fetchUsers.js
import { NextResponse } from "next/server";
import UserModel from "@/backend/models/User";
import connectDb from "@/backend/middleware/db";

const fetchAllUsers = async () => {
  try {
    // Fetch users
    const users = await UserModel.find();

    console.log(users);

    return NextResponse.json(
      {
        users,
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

export const GET = connectDb(fetchAllUsers);
