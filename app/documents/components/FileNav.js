"use client";
import React from "react";
import { FiDownload, FiEdit, FiShare } from "react-icons/fi";
import ShareFileModal from "./ShareFileModal";
import EditFileNameModal from "./EditFileNameModal";
import DownloadFileModal from "./DownloadFileModal";

function FileNav({
  fileName,
  setFileName,
  editFileName,
  shareDocument,
  downloadPdf,
  downloadWord,
}) {
  return (
    <div className="card shadow bg-card p-2 mb-2 rounded-none sticky top-0 z-10">
      {/* card header start */}
      <div className="flex justify-between items-center my-2">
        <button
          className="flex items-center text-sm text-center text-red-500"
          onClick={() => window.edit_filename_modal.showModal()}
        >
          <span className="text-black">File Name: </span> {fileName}
          <FiEdit className="text-red-500 mx-2" />
        </button>

        <button
          className="flex items-center text-sm text-center text-red-500"
          onClick={() => window.share_modal.showModal()}
        >
          Share File <FiShare className="text-red-500 mx-2" />
        </button>
        <button
          className="flex items-center text-sm text-center text-red-500"
          onClick={() => window.download_modal.showModal()}
        >
          Download File <FiDownload className="text-red-500 mx-2" />
        </button>
      </div>

      {/* Modals */}
      <dialog id="edit_filename_modal" className="modal">
        <EditFileNameModal
          fileName={fileName}
          setFileName={setFileName}
          editFileName={editFileName}
          closeEditModal={() => window.edit_filename_modal.close()}
        />
      </dialog>
      <dialog id="share_modal" className="modal">
        <ShareFileModal
          shareDocument={shareDocument}
          closeShareModal={() => window.share_modal.close()}
        />
      </dialog>

      <dialog id="download_modal" className="modal">
        <DownloadFileModal
          downloadPdf={downloadPdf}
          downloadWord={downloadWord}
          closeDownloadModal={() => window.download_modal.close()}
        />
      </dialog>
    </div>
  );
}

export default FileNav;
