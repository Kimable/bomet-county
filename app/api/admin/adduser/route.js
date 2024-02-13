import { NextResponse } from "next/server";
import connectDb from "@/backend/middleware/db";
import UserModel from "@/backend/models/User";

const addUserHandler = async (request) => {
  try {
    // Extract the field values from the request body
    const employee = await request.json();

    console.log("Received data:", employee);

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email: employee.email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        {
          status: 400,
        }
      );
    }

    // Create a new instance of the 'User' model and assign the field values
    const newUser = new UserModel(employee);

    // Save the new User to the database
    const savedUser = await newUser.save();

    console.log("new user", savedUser);
    return NextResponse.json(
      {
        savedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving User:", error);
    return NextResponse.json(
      {
        message: "Failed to add user",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addUserHandler);
