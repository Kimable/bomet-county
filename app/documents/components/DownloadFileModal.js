"use client";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

function DownloadFileModal({ closeDownloadModal, downloadPdf, downloadWord }) {
  const [loading, setLoading] = useState(false);

  if (loading == true) {
    return (
      <div className="text-center modal-box p-4 items-center w-[360px]">
        <h3>Sharing File</h3>
        <span class="loading loading-dots loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div>
        <form method="dialog" className="p-9 items-center modal-box w-96">
          <a
            onClick={closeDownloadModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </a>
          <div className="mb-3">
            <button
              onClick={downloadWord}
              className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            >
              <FaDownload className="text-white mx-2" /> Download Word Document
            </button>
          </div>
          <div className="mt-1">
            <button
              onClick={downloadPdf}
              className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            >
              <FaDownload className="text-white mx-2" /> Download PDF Document
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DownloadFileModal;
