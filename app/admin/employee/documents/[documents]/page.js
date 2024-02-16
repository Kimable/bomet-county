"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FaBars, FaDownload, FaSignInAlt, FaSort } from "react-icons/fa";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import UploadFilesModal from "../EmployeeDocsModal";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/app/Config/FirebaseConfig";
import { FiCalendar } from "react-icons/fi";
import CurrentDate from "@/app/components/common/currentdate/page";

export default function Page() {
  const [employee, setEmployee] = useState({});
  const [fileList, setFileList] = useState([]);

  // get dynamic path employee documents
  const router = useParams();
  const params = useSearchParams();

  const db = getFirestore(app);

  console.log(router.documents);

  useEffect(() => {}, []);

  useEffect(() => {
    setFileList([]);
    const q = query(
      collection(db, "employeeDocs"),
      where("employeeId", "==", router.documents)
    );

    const querySnapshot = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setFileList((fileList) => [...fileList, change.doc.data()]);
      });
    });
  }, []);

  return (
    <div>
      <SuperuserLayout>
        <div className="m-4">
          <div className="flex justify-between items-center mx-3 my-2 bg-card p-2  rounded-lg mb-5">
            <BreadCrumb text="Employees Documents" />
            <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
              <FiCalendar className="text-white mx-2" /> <CurrentDate />
            </button>
          </div>

          <p className="font-bold text-xl text-center">
            Employee:{" "}
            <span className="text-primary">{params.getAll("employee")}</span>
          </p>

          {/* Docs List */}
          <div className="flex flex-row flex-wrap m-6">
            {fileList.length === 0 ? (
              <h3 className="text-center font-semibold text-slate-500">
                No documents added yet
              </h3>
            ) : (
              fileList.map((file) => {
                return (
                  <div className="card w-96 bg-base-100 shadow-xl m-3">
                    {file.type === "pdf" ? (
                      <div className="card-body my-4">
                        <img src="/pdf.png" width={40} />
                        <p className="card-title">
                          {file.type === "pdf" && file.name}
                        </p>
                        <Link href={file.fileUrl}>
                          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
                            <FaDownload className="text-white mx-2" /> Download{" "}
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="card-body m-4">
                        <img src="/docx.png" width={40} />
                        <p className="card-title">{file.name}</p>
                        <Link href={file.fileUrl}>
                          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
                            <FaDownload className="text-white mx-2" /> Download{" "}
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Docs List end */}
          <button
            onClick={() => window.upload_file.showModal()}
            className="flex gap-2 items-center text-[13px]
        bg-blue-500 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 justify-center"
          >
            Add Files
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <dialog id="upload_file" className="modal">
            <UploadFilesModal closeModal={() => window.upload_file.close()} />
          </dialog>
        </div>
      </SuperuserLayout>
    </div>
  );
}
