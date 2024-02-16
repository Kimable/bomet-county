"use client";
import React, { useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/app/Config/FirebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useParams } from "next/navigation";

function UploadFilesModal({ closeModal }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");

  const params = useParams();
  const employeeId = params.documents;

  const docId = Date.now();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const onFileUpload = async (file) => {
    if (file) {
      if (file?.size > 10000000) {
        setMsg("File is too large");
        return;
      }
      const fileRef = ref(storage, "file/" + file.name);
      setLoading(true);

      uploadBytes(fileRef, file)
        .then((snapshot) => {
          console.log(snapshot);
        })
        .then((resp) => {
          getDownloadURL(fileRef).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await setDoc(doc(db, "employeeDocs", docId.toString()), {
              name: file.name,
              type: file.name.split(".")[1],
              size: file.size,
              modifiedAt: file.lastModified,
              employeeId: employeeId,
              fileUrl: downloadURL,
              id: docId,
            });
            console.log("Uploaded a file!");
            setLoading(false);
            closeModal(true);
          });
        });
    }
  };

  if (loading == true) {
    return (
      <div className="text-center modal-box p-4 items-center w-[360px]">
        <h3>Uploading</h3>
        <span class="loading loading-dots loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div>
        <form method="dialog" className="modal-box p-9 items-center w-[360px]">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div
            className="w-full items-center 
              flex flex-col justify-center gap-3"
          >
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, DOCX, DOC, PNG, JPG (MAX 9MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => onFileUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadFilesModal;
