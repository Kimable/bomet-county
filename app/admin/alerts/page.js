"use client";
import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import AlertsList from "@/app/components/common/alerts/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiAlertOctagon } from "react-icons/fi";
import AddAlert from "@/app/components/admin/addalert/page";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  //  to fetch alerts
  useEffect(() => {
    fetchAlerts();
  }, []);

  // Fetch Alerts after add a new alert
  function fetchAlerts() {
    fetch("/api/admin/fetchalerts", { method: "post" })
      .then((response) => {
        return response.json();
      })
      .then((data) => setAlerts(data.alerts))
      .catch((error) => {
        console.error("Error fetching alerts:", error);
      });
  }

  return (
    <SuperuserLayout>
      <div className="bg-card p-2 m-2 rounded-lg mb-5">
        <div className="flex justify-between items-center my-2 ">
          <BreadCrumb text="Alerts" />
          <button
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            onClick={() => window.alert_modal.showModal()}
          >
            <FiAlertOctagon className="text-white mx-2" /> Add Alert
          </button>
        </div>
      </div>
      {alerts.length > 0 ? (
        <AlertsList alerts={alerts} />
      ) : (
        <p className="text-center text-xl py-2">Loading...</p>
      )}
      {/* Add Alert */}
      <dialog id="alert_modal" className="modal">
        <div className="shadow p-2 mb-2">
          <AddAlert
            fetchAlerts={fetchAlerts}
            closeAlertModal={() => window.alert_modal.close()}
          />
        </div>
      </dialog>
    </SuperuserLayout>
  );
};

export default Alerts;
