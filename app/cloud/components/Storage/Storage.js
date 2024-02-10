import React from "react";
import StorageInfo from "./StorageInfo";
import StorageDetailList from "./StorageDetailList";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useRouter } from "next/navigation";

function Storage() {
  const router = useRouter();

  let user = verifyUser();
  if (user === null) {
    return router.push("/");
  }
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
