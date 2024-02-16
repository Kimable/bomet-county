"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FaBars, FaDownload, FaSignInAlt, FaSort } from "react-icons/fa";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { useParams } from "next/navigation";
import { FiShield } from "react-icons/fi";
import Link from "next/link";

export default function Page() {
  const [employee, setEmployee] = useState({});

  const router = useParams();
  console.log(router.employee);

  useEffect(() => {
    fetch(`/api/admin/employee`, {
      method: "POST",
      body: JSON.stringify(router),
    })
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        console.log(e);
        setEmployee(e);
      });
  }, []);

  return (
    <div>
      <SuperuserLayout>
        <div className="mx-2">
          <div className="card rounded-lg shadow bg-card p-2 my-2">
            {/* card header start */}

            {/* card header ends  */}

            {/* basic info start  */}
            <div className="flex mb-2 items-center">
              <div>
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="/user.jpg"
                  alt=""
                />
              </div>
              <div className="mx-2">
                <div className="text-textColor text-xl md:text-2xl mb-2 px-6 py-3 flex items-center">
                  {Object.keys(employee).length !== 0 && employee
                    ? employee?.user?.firstName + " " + employee?.user?.lastName
                    : "Loading Employee..."}{" "}
                  {employee?.user?.teamLead && (
                    <div className="mx-2 rounded-full bg-themeColor p-2">
                      {" "}
                      <FiShield className="text-white" />
                    </div>
                  )}
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
                        <td scope="col" className="px-6 py-3">
                          Employee Documents
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-transparent text-textColor">
                        <th className="px-6 py-4 font-md">
                          {employee?.user?.designation || "Not Assigned"}
                        </th>
                        <th className="px-6 py-4 font-md">
                          {employee?.user?.phoneNo || "Not provided"}
                        </th>
                        <th className="px-6 py-4 font-md">
                          {employee?.user?.email}
                        </th>
                        <th className="px-6 py-4 font-md">
                          <Link
                            href={`/admin/employee/documents/${employee?.user?._id}?employee=${employee?.user?.firstName} ${employee?.user?.lastName}`}
                          >
                            <img src="/folder.png" width={40} />
                          </Link>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* basic info end  */}
          </div>{" "}
          <div></div>
        </div>
      </SuperuserLayout>
    </div>
  );
}
