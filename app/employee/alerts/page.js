"use client";
import React, { useState, useEffect } from "react";
import AlertsList from "@/app/components/common/alerts/page";
import EmployeeLayout from "@/app/components/layouts/employeelayout/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiCalendar } from "react-icons/fi";
import { fetchAlerts } from "@/store/reducer/admin/fetchAlertReducer";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  const dispatch = useDispatch();
  //  to fetch alerts
  useEffect(() => {
    fetch("/api/admin/fetchalerts", { method: "post" })
      .then((response) => {
        return response.json();
      })
      .then((data) => setAlerts(data.alerts))
      .catch((error) => {
        console.error("Error fetching alerts:", error);
      });
  }, []);
  return (
    <EmployeeLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2 ">
            <BreadCrumb text="Alerts" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiCalendar className="text-white mx-2" /> <CurrentDate />
            </button>
          </div>
        </div>
        {alerts.length > 0 ? (
          <AlertsList alerts={alerts} />
        ) : (
          <p className="m-2 text-lg text-center font-bold">
            Loading Notifications...
          </p>
        )}
      </div>
    </EmployeeLayout>
  );
};

export default Alerts;
