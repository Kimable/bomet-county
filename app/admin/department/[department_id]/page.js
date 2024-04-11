"use client";
import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar, FiHome, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";

function page() {
  const [department, setDepartment] = useState([]);
  const [departmentHead, setDepartmentHead] = useState([]);
  const [employees, setDepartmentEmployees] = useState([]);
  const { department_id } = useParams();

  useEffect(() => {
    async function getDepatment() {
      const deparment = await fetch(
        `/api/admin/fetchdepartments/fetchsingledepartment`,
        {
          method: "post",
          body: JSON.stringify({ departmentId: department_id }),
        }
      );
      const res = await deparment.json();
      setDepartment(res.department);
      setDepartmentHead(res.departmentHead);
      setDepartmentEmployees(res.users);

      console.log(res);
    }
    getDepatment();
  }, []);

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Department Information" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>
        <div>
          {department.length != 0 ? (
            <div>
              <h1 className="font-bold text-lg my-4 uppercase">
                Department:{" "}
                <span className="text-themeColor">
                  {department.departmentName}
                </span>
              </h1>
              {/* Head of Department Info*/}
              <h1 className="text-lg font-bold my-6">Head of Department</h1>
              <div className="card rounded-lg shadow bg-card p-2 my-2">
                <div className="flex mb-2 items-center">
                  <div>
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src="/assets/kim.jpg"
                      alt="Kim image"
                    />
                  </div>
                  <div className="mx-2">
                    <div className="text-textColor text-lg md:text-2xl mb-2 px-6 py-3">
                      {departmentHead
                        ? departmentHead?.firstName +
                          " " +
                          departmentHead?.lastName
                        : "..."}
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
                              {departmentHead ? departmentHead?.phoneNo : "..."}
                            </th>
                            <th className="px-6 py-4 font-md">
                              {departmentHead ? departmentHead?.email : "..."}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Head of Department Info */}

              {/* Department Employees*/}
              <h1 className="text-lg font-bold my-6">Department Employees</h1>
              {employees.length !== 0 ? (
                <div className="flex flex-wrap my-9">
                  {employees.length !== 0 &&
                    employees.map((employee) => {
                      return (
                        <div
                          key={employee._id}
                          className="card bg-base-100 shadow-2xl  m-3 w-72"
                        >
                          <figure className="px-10 pt-10">
                            <img
                              src="/user.jpg"
                              alt="Shoes"
                              width={100}
                              className="rounded-xl"
                            />
                          </figure>
                          <div className="card-body items-center text-center">
                            <h2 className="font-semibold">
                              Name:{" "}
                              <span className="font-bold text-themeColor">
                                {employee.firstName} {employee.lastName}
                              </span>
                            </h2>
                            <p className="font-normal text-sm">
                              Position:{" "}
                              <span className="font-bold text-themeColor">
                                {employee.designation || "N/A"}
                              </span>
                            </p>
                            <p className="font-normal">
                              Employment No:{" "}
                              <span className="font-bold text-themeColor">
                                {employee.employmentNo || "N/A"}
                              </span>
                            </p>

                            <div className="card-actions">
                              <Link
                                href={`/admin/employee/${employee._id}?id=${employee._id}`}
                                className="btn btn-info"
                              >
                                View Employee
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-slate-500 mb-4">
                    No employees added yet
                  </h2>
                </>
              )}
              <Link
                href="/admin/employees"
                className="btn text-white text-sm text-center bg-themeColor p-2 rounded-lg"
              >
                Add Employees
              </Link>
            </div>
          ) : (
            <h1 className="text-center text-lg font-semibold">Loading...</h1>
          )}
        </div>
      </div>
    </SuperuserLayout>
  );
}

export default page;
