"use client";
import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar, FiHome, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddDepartment from "../addDepartment/page";

function page() {
  const [departments, setDepartments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getDepartments();
  }, []);

  // Fetch departments
  async function getDepartments() {
    const deparments = await fetch(`/api/admin/fetchdepartments`, {
      method: "post",
    });
    const res = await deparments.json();
    setDepartments(res.departments);
    console.log(res.departments);
  }

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Departments" />
          <button
            onClick={() => window.add_department_modal.show()}
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
          >
            <FiPlus className="text-white mx-2" /> Add Department
          </button>
        </div>
        {departments.length == 0 ? (
          <p className="font-bold text-center my-8">Loading Departments...</p>
        ) : (
          <div className="flex flex-row flex-wrap">
            {departments.map((dep) => (
              <div
                key={dep._id}
                className="cursor-pointer"
                onClick={() => router.push(`/admin/department/${dep._id}`)}
              >
                <div className="bg-themeColor py-4 px-6 m-2 w-72 rounded-lg">
                  <h2 className="text-white text-center">
                    {dep.departmentName}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => window.add_department_modal.show()}
          className="text-white text-sm text-center p-2 rounded-lg my-7 btn btn-info"
        >
          Add Department <FiPlus className="text-white mx-2" />
        </button>
      </div>

      {/* Add Department */}
      <dialog id="add_department_modal" className="modal">
        <div className="shadow mb-2">
          <AddDepartment
            getDepartments={getDepartments}
            closeModal={() => window.add_department_modal.close()}
          />
        </div>
      </dialog>
      {/* End Add Department */}
    </SuperuserLayout>
  );
}

export default page;
