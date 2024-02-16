import React from "react";
import Link from "next/link";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import CurrentDate from "@/app/components/common/currentdate/page";

const Employees = async () => {
  let employees = [];

  const url = process.env.URL || process.env.VERCEL_URL;

  const fetchUsers = async () => {
    const response = await fetch(`${url}/api/admin/fetchAllUsers`);

    let users = await response.json();
    return users.users;
  };

  employees = await fetchUsers();

  console.log(employees);
  return (
    <SuperuserLayout>
      <div className="flex justify-between items-center mx-3 my-2 bg-card p-2  rounded-lg mb-5">
        <BreadCrumb text="Employees" />
        <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
          <FiCalendar className="text-white mx-2" /> <CurrentDate />
        </button>
      </div>
      <div className="flex flex-wrap m-3 bg-base-200 my-9">
        {employees.length === 0 ? (
          <h2 className="text-center m-5">Loading...</h2>
        ) : (
          employees.map((employee) => {
            return (
              <div
                key={employee._id}
                className="card w-65 bg-base-100 shadow-xl  m-3"
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
                  <h2 className="card-title">
                    Name: {employee.firstName} {employee.lastName}
                  </h2>
                  <p className="font-bold uppercase">
                    ({employee.designation || "N/A"})
                  </p>
                  <p className="font-bold">
                    Employment No.: {employee.employmentNo || "N/A"}
                  </p>

                  <div className="card-actions">
                    <Link
                      href={`/admin/employee/${employee._id}?id=${employee._id}`}
                      className="btn btn-primary"
                    >
                      View Employee
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </SuperuserLayout>
  );
};

export default Employees;
