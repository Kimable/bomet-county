import React from "react";
import UserInfo from "./UserInfo";
import StorageInfo from "./StorageInfo";
import StorageDetailList from "./StorageDetailList";
import StorageUpgradeMsg from "./StorageUpgradeMsg";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";

function Storage() {
  let user = verifyUser();
  return (
    user && (
      <div>
        <UserInfo />
        <StorageInfo />
        <StorageDetailList />
        <StorageUpgradeMsg />
      </div>
    )
  );
}

export default Storage;
