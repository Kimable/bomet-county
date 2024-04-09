"use client";
import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import LeavesList from "@/app/components/admin/leaves/page";
import CurrentDate from "@/app/components/common/currentdate/page";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);

  //  to fetch leaves
  useEffect(() => {
    fetch(`/api/admin/fetchleaves`, { cache: "no-cache" })
      .then((response) => {
        return response.json();
      })
      .then((fetchedLeaves) => setLeaves(fetchedLeaves.allLeaves))
      .catch((error) => {
        console.error("Error fetching leaves:", error);
      });
  }, []);

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
            <LeavesList leaves={leaves} />
          ) : (
            <p className="mx-2 text-xs">Loading...</p>
          )}
        </div>
      </div>
    </SuperuserLayout>
  );
};

export default Leaves;
