"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyUser } from "./verifyLoggedInUser";

function useAuth() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token || token === "") {
        router.push("/");
        return;
      }
      const loggedUser = verifyUser(token);
      if (loggedUser === null) {
        localStorage.setItem("token", "");
        router.push("/");
        return;
      }
      setUser(loggedUser);
    };

    checkAuth();
  }, [router]);

  return user;
}

export default useAuth;
