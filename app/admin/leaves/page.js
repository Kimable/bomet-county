"use client";
import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import LeavesList from "@/app/components/admin/leaves/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import Toast from "@/app/cloud/components/Toast";
import { ToastContainer } from "react-toastify";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);

  //  to fetch leaves
  useEffect(() => {
    fetchLeaves();
  }, []);

  function fetchLeaves() {
    fetch(`/api/admin/fetchleaves`, { method: "post" })
      .then((response) => {
        return response.json();
      })
      .then((fetchedLeaves) => {
        setLeaves(fetchedLeaves.allLeaves);
        Toast("Status Updated Successfully");
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
        Toast("Status Failed to Update");
      });
  }

  return (
    <SuperuserLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2 ">
            <BreadCrumb text="Leave Requests" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiCalendar className="text-white mx-2" /> <CurrentDate />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full p-2">
          {leaves.length > 0 ? (
            <LeavesList leaves={leaves} fetchLeaves={fetchLeaves} />
          ) : (
            <p className="mx-2 text-xs">Loading...</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </SuperuserLayout>
  );
};

export default Leaves;
