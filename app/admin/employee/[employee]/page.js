"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FaBars, FaDownload, FaSignInAlt, FaSort } from "react-icons/fa";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { useParams } from "next/navigation";
import { FiCalendar, FiHome, FiShield } from "react-icons/fi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { showToast } from "@/app/components/toast";
import { ToastContainer } from "react-toastify";
import CurrentDate from "@/app/components/common/currentdate/page";

export default function Page() {
  const [employee, setEmployee] = useState({});
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  let [departments, setDepartments] = useState([]);

  const onSubmit = async (data) => {
    setLoading(true);
    let response = await fetch(`/api/admin/adduser/updateuser`, {
      method: "post",
      body: JSON.stringify({
        _id: employee?.user._id,
        department: data.department,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    setLoading(false);
    showToast("Employee department updated successfully");
  };

  // Fetch departments
  useEffect(() => {
    fetch(`/api/admin/fetchdepartments`, { method: "post" })
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        setDepartments(e.departments);
      });
  }, []);

  const router = useParams();
  console.log(router.employee);

  // Fetch employee
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
          <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
            <BreadCrumb text="Employee Details" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiCalendar className="text-white mx-2" /> <CurrentDate />
            </button>
          </div>
          <div className="card rounded-lg shadow bg-card p-2 my-2">
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
          </div>
          {/* Assign Department */}
          <div>
            {loading ? (
              <div>
                <h3 className="text-center font-bold py-5">Updating...</h3>
              </div>
            ) : (
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6">
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-bold text-textColor "
                  >
                    Assign or Change Department
                  </label>

                  <select
                    id="department"
                    className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block p-2.5 "
                    {...register("department")}
                    required
                  >
                    <option className="text-slate-500" selected>
                      Choose Department
                    </option>
                    {departments &&
                      departments.map((department) => {
                        return (
                          <option key={department._id} value={department._id}>
                            {department.departmentName}
                          </option>
                        );
                      })}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
                >
                  Assign Department
                </button>
              </form>
            )}
          </div>
          <ToastContainer />
        </div>
      </SuperuserLayout>
    </div>
  );
}
