import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import UserModel from "@/backend/models/User";

const updateUser = async (request) => {
  try {
    // Extract the field values from the request body
    const user = await request.json();
    console.log(user);

    // Update User
    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      department: user.department,
    });
    if (updateUser) {
      return NextResponse.json(
        {
          updateUser,
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error saving User:", error);
    return NextResponse.json(
      {
        message: "Failed to add user",
        errorMessage: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(updateUser);
