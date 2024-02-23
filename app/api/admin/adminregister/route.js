import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "@/backend/middleware/db";
import UserModel from "@/backend/models/User";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const adminRegisterHandler = async (request) => {
  try {
    // Check if there's already an admin registered
    // const existingAdminCount = await AdminModel.countDocuments();
    // if (existingAdminCount > 0) {
    //   return NextResponse.json(
    //     {
    //       message: "Admin already registered",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    // Extract the registration details from the request body
    const { firstName, lastName, email, password } = await request.json();

    // Create a new admin
    const newUser = await new UserModel({
      firstName,
      lastName,
      email,
      password,
    });

    // Save the new admin to the database
    await newUser.save();

    // Create a payload for the JWT token
    const payload = {
      adminId: newUser._id,
      firstName: newUser.firstName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };

    // Generate and sign the JWT token
    const token = jwt.sign(
      payload,
      "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=",
      { expiresIn: "9h" }
    ); // Token expires in 9 hours

    // Return the token in the response
    return NextResponse.json(
      {
        message: "Admin registered successfully",
        token: token,
        isAdmin: newUser.isAdmin,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error during admin registration:", error);
    return NextResponse.json(
      {
        message: "Failed to register admin",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(adminRegisterHandler);
