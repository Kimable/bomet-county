import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import AdminModel from "@/backend/models/Admin";
import connectDb from "@/backend/middleware/db";
require("dotenv").config();

const adminLoginHandler = async (request) => {
  try {
    // Extract the login credentials from the request body
    const { email, password } = await request.json();
    console.log("em", email);
    console.log("pass", password);
    // Check if the email exists in the admin database
    const existingAdmin = await AdminModel.findOne({ email });
    if (!existingAdmin) {
      return NextResponse.json(
        {
          message: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check if the password is correct
    if (existingAdmin.password !== password) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    // Create a payload for the JWT token (you can include additional data here)
    const payload = {
      adminId: existingAdmin._id,
      firstName: existingAdmin.firstName,
      email: existingAdmin.email,
      phoneNo: existingAdmin.phoneNo,
      department: existingAdmin.department,
      isAdmin: existingAdmin.isAdmin,
    };

    // Generate and sign the JWT token
    const token = jwt.sign(
      payload,
      "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=",
      { expiresIn: "7d" }
    );

    // Return the token in the response
    return NextResponse.json(
      {
        message: "Admin login successful",
        token: token,
        isAdmin: existingAdmin.isAdmin,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during admin login:", error);
    return NextResponse.json(
      {
        message: "Failed to perform admin login",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(adminLoginHandler);
