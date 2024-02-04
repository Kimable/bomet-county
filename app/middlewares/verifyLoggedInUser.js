"use client";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
require("dotenv").config();

export const verifyUser = () => {
  let user, token;
  try {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      if (token == "" || token == null) {
        user = null;
        return user;
      }
      user = jwt.verify(token, "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=");

      return user;
    }
  } catch (error) {
    console.log("JWT ERROR: ", error);
    if (typeof window !== "undefined") {
      token = localStorage.setItem("token", "");
    }
    user = null;
    return user;
  }
};
