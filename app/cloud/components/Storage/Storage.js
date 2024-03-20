import React, { useEffect, useState } from "react";
import StorageInfo from "./StorageInfo";
import StorageDetailList from "./StorageDetailList";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useRouter } from "next/navigation";

function Storage() {
  const router = useRouter();
  // Get current user
  const [user, setUser] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);
    if (loggedUser === null) {
      localStorage.setItem("token", "");
      return router.push("/");
    }
    setUser(loggedUser);
  }, []);

  return (
    user && (
      <div>
        <StorageInfo />
        <StorageDetailList />
      </div>
    )
  );
}

export default Storage;
