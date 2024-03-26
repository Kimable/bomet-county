"use client";
import React, { useState, useEffect } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import LineChart from "@/app/components/attendancechart/page";
import { FiUserCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
const Dashboard = () => {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);

    if (loggedUser === null) {
      localStorage.setItem("isAdmin", "");
      localStorage.setItem("teamLead", "");
      localStorage.setItem("token", "");
      return router.push("/");
    }
    setUser(loggedUser);
  }, []);

  return (
    user !== null && (
      <SuperuserLayout>
        <div className="md:flex ">
          {/* Use the CustomSidebar component with the necessary props */}
          <div className="w-full md:w-9/12">
            <div className=" mx-2  my-2 flex justify-center bg-card rounded-lg shadow  ">
              <LineChart
                role="Employees"
                color="#29CC6A"
                shadowColor="#dcfce7"
              />
            </div>
            <div className="mx-2  my-2 flex justify-center bg-card rounded-lg shadow">
              <LineChart
                role="Supervisors"
                color="#F2C94C"
                shadowColor="#fef9c3"
              />
            </div>
          </div>
          <div className="w-full md:w-3/12 mx-3 p-3 border border-r-0 border-t-0 border-b-0 border-gray-300">
            {/* total attendance  */}
            <div className="mt-5">
              <div className="text-textColor font-bold mb-2">
                Today's Attendance{" "}
              </div>
              <div className="text-gray-500 font-light text-sm mb-5 ">
                03 July 2023{" "}
              </div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <FiUserCheck className="text-greenColor w-[25px] h-[25px]" />
                </div>
                <div className="mx-3">
                  <div className="text-textColor font-light mb-2">
                    Employees
                  </div>
                  <div className="text-greenColor font-medium text-sm  ">
                    22/43
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <FiUserCheck className="text-yellowColor w-[25px] h-[25px]" />
                </div>
                <div className="mx-3">
                  <div className="text-textColor font-medium mb-2">
                    Supervisors
                  </div>
                  <div className="text-yellowColor font-light text-sm  ">
                    18/23
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SuperuserLayout>
    )
  );
};

export default Dashboard;
