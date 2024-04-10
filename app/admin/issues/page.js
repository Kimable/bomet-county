"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiAlertCircle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProblemLists from "@/app/components/common/issues/page";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { getHostUrl } from "@/app/middlewares/getHostUrl";

const ReportProblem = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredReportId, setHoveredReportId] = useState(null);
  // Function to show a toast message
  const showToast = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //  to fetch reports
  useEffect(() => {
    setLoading(true);

    fetchReports();

    setLoading(false);
  }, []);

  // Custom function for fetching reports
  function fetchReports() {
    fetch(`/api/admin/fetchproblems`, { method: "post" })
      .then((response) => {
        // Assuming response.data is an array of reports
        return response.json();
      })
      .then((response) => {
        setReports(response.reports);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }

  // fetch the value for update alert
  const handleResolveClick = async (id) => {
    try {
      await updateAlertStatus(id, "Resolved");
    } catch (error) {
      console.error("Error updating alert status:", error);
      showToast("Failed to update alert status");
    }
  };

  const handleUnresolveClick = async (id) => {
    try {
      await updateAlertStatus(id, "Unresolved");
    } catch (error) {
      console.error("Error updating alert status:", error);
      showToast("Failed to update alert status");
    }
  };

  // update alert status
  const updateAlertStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/admin/updateproblem`, {
        method: "post",
        body: JSON.stringify({
          id,
          newStatus,
        }),
      });
      fetchReports();
      showToast("Issue status updated");
    } catch (error) {
      console.error("Error updating alert status:", error);
      showToast("Failed to update alert status");
    }
  };
  return (
    <SuperuserLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2">
            <BreadCrumb text="Issues" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiAlertCircle className="text-white mx-2" /> Issues
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-xl py-2">Loading...</p>
        ) : (
          <div className="relative">
            {reports.map((report) => (
              <div
                key={report._id}
                className="mb-4"
                onMouseEnter={() => setHoveredReportId(report._id)}
                onMouseLeave={() => setHoveredReportId(null)}
              >
                <ProblemLists reports={[report]} />
                {hoveredReportId === report._id && (
                  <div className="flex items-center">
                    {report.status === "Unresolved" ? (
                      <button
                        className="mx-1 md:text-sm text-xs text-center bg-greenColor text-white px-4 py-2 rounded-lg"
                        onClick={() => handleResolveClick(report._id)}
                      >
                        Mark Resolve
                      </button>
                    ) : (
                      <button
                        className="mx-1 md:text-sm text-xs text-center bg-redColor text-white px-4 py-2 rounded-lg"
                        onClick={() => handleUnresolveClick(report._id)}
                      >
                        Mark Unresolve
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </SuperuserLayout>
  );
};

export default ReportProblem;
