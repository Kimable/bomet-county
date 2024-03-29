import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/backend/models/User";
import connectDb from "@/backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const userLoginHandler = async (request) => {
  try {
    // Extract the login credentials from the request body
    const { userEmail, userPassword } = await request.json();

    // Check if the email exists in the database
    const existingUser = await UserModel.findOne({ email: userEmail });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check if the password is correct
    if (existingUser.password !== userPassword) {
      return NextResponse.json(
        {
          message: "Invalid credential",
        },
        {
          status: 401,
        }
      );
    }

    // Create a payload for the JWT token (you can include additional data here)
    const payload = {
      userId: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      teamLead: existingUser.teamLead,
      phoneNo: existingUser.phoneNo,
      department: existingUser.department,
      isAdmin: existingUser.isAdmin,
    };

    // Generate and sign the JWT token
    const token = jwt.sign(
      payload,
      "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=",
      { expiresIn: "7d" }
    ); // Token expires in 9 hours

    // Return the token in the response
    return NextResponse.json(
      {
        message: "Login successful",
        token: token,
        teamLead: existingUser.teamLead,
        isAdmin: existingUser.isAdmin,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      {
        message: "Failed to perform login",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(userLoginHandler);
