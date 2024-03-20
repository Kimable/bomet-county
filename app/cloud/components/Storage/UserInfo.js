import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function UserInfo() {
  // Get current user
  const [user, setUser] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);
    setUser(loggedUser);
  }, []);

  return (
    <div>
      {user !== "" ? (
        <div className="flex gap-2 items-center">
          {/* <Image
            src={user.image}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <div>
            <h2 className="text-[15px] font-bold">{user.firstName}</h2>
            <h2
              className="text-[13px] text-gray-400
                mt-[-4px]"
            >
              {user.email}
            </h2>
          </div>
          <div
            className="bg-blue-200 p-2 rounded-lg
            cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              onClick={() => console.log("signed out")}
              stroke="currentColor"
              className="w-6 h-6 text-blue-500
                hover:animate-pulse transition-all "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
