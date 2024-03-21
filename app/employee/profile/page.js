"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FaBars, FaDownload, FaSignInAlt, FaSort } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmployeeLayout from "@/app/components/layouts/employeelayout/page";
import useAuth from "@/app/middlewares/useAuth";

export default function Page() {
  const user = useAuth();
  console.log(user);

  return (
    <div>
      <EmployeeLayout>
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
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="Bonnie image"
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
                        <th className="px-6 py-4 font-md">Web Dev</th>
                        <th className="px-6 py-4 font-md">(+92) 312 1211232</th>
                        <th className="px-6 py-4 font-md">
                          {" "}
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
      </EmployeeLayout>
    </div>
  );
}
