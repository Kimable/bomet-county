"use client";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
require("dotenv").config();

export const verifyUser = () => {
  const router = useRouter();
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const user = jwt.verify(token, "bometSystem1290");
    return user;
  }
};
