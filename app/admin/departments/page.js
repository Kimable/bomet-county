"use client";

import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar, FiHome, FiPlus } from "react-icons/fi";
import Link from "next/link";

function page() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function getDepatments() {
      const deparments = await fetch(`/api/admin/fetchdepartments`);
      const res = await deparments.json();
      setDepartments(res.departments);
      console.log(res.departments);
    }
    getDepatments();
  }, []);

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Departments" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        {departments.length == 0 ? (
          <p className="font-bold text-center my-8">Loading Departments...</p>
        ) : (
          <div className="flex flex-row flex-wrap">
            {departments.map((dep) => (
              <div key={dep._id}>
                <div className="bg-themeColor py-4 px-6 m-2 w-72 rounded-lg">
                  <h2 className="text-white text-center">
                    {dep.departmentName}
                  </h2>
                </div>
              </div>
            ))}
            <Link
              href="/admin/addDepartment"
              className="flex items-center btn btn-secondary text-white text-sm text-center p-2 rounded-lg my-7"
            >
              Add Department <FiPlus className="text-white mx-2" />
            </Link>
          </div>
        )}
      </div>
    </SuperuserLayout>
  );
}

export default page;
