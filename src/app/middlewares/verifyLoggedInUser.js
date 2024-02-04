"use client";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
require("dotenv").config();

export const verifyUser = () => {
  const router = useRouter();
  let user, token;
  try {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      if (token == "" || token == null) {
        token = localStorage.setItem("token", "");
        user = null;
        return user;
      }
      user = jwt.verify(token, "bometSystem1290");

      console.log(user);
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
