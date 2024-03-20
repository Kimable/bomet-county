"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FaBars, FaDownload, FaSignInAlt, FaSort } from "react-icons/fa";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useRouter } from "next/navigation";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";

export default function Page() {
  let [user, setUser] = useState("");
  let router = useRouter();

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
    <div>
      <SuperuserLayout>
        <div className="mx-2">
          <div className="card rounded-lg shadow bg-card p-2 my-2">
            {/* card header start */}
            <div className="flex justify-between items-center my-2">
              <BreadCrumb text="Employee Details" />
              <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
                <FaDownload className="text-white mx-2" /> Download Info
              </button>
            </div>
            {/* card header ends  */}

            {/* basic info start  */}
            <div className="flex mb-2 items-center">
              <div>
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="/assets/kim.jpg"
                  alt="Kim image"
                />
              </div>
              <div className="mx-2">
                <div className="text-textColor text-xl md:text-2xl mb-2 px-6 py-3">
                  {user ? user?.firstName + " " + user?.lastName : "..."}
                </div>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left ">
                    <thead className="text-xs  text-gray-500 uppercase bg-transparent">
                      <tr>
                        <td scope="col" className="px-6 py-3 ">
                          Role
                        </td>
                        <td scope="col" className="px-6 py-3">
                          Phone No
                        </td>
                        <td scope="col" className="px-6 py-3">
                          Email Address
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-transparent text-textColor">
                        <th className="px-6 py-4 font-md">Admin</th>
                        <th className="px-6 py-4 font-md">
                          {user ? user?.phoneNo : "..."}
                        </th>
                        <th className="px-6 py-4 font-md">
                          {user ? user?.email : "..."}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* basic info end  */}
          </div>
        </div>
      </SuperuserLayout>
    </div>
  );
}
