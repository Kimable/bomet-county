"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { ParentFolderIdContext } from "../context/ParentFolderIdContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/app/Config/FirebaseConfig";
import FolderList from "../components/Folder/FolderList";
import { ShowToastContext } from "../context/ShowToastContext";
import FileList from "../components/File/FileList";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import CreatedFiles from "../components/createdFiles/CreatedFiles";

function FolderDetails() {
  const searchParams = useSearchParams();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [user, setUser] = useState("");
  let router = useRouter();

  const db = getFirestore(app);

  let id = searchParams.get("id");

  if (id == null) {
    id = 0;
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);
    getFolderList(loggedUser);
    getFileList(loggedUser);
    setUser(loggedUser);
  }, []);

  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );

  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);

  const deleteFolder = async () => {
    await deleteDoc(doc(db, "Folders", id)).then((resp) => {
      setShowToastMsg("Folder Deleted !");
      router.back();
    });
  };

  const getFolderList = async (loggedUser) => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("parentFolderId", "==", id),
      where("createBy", "==", loggedUser?.email)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setFolderList((folderList) => [...folderList, change.doc.data()]);
      });
    });
    console.log(folderList);
  };

  const getFileList = async (loggedUser) => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("parentFolderId", "==", id),
      where("createdBy", "==", loggedUser?.email)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setFileList((fileList) => [...fileList, change.doc.data()]);
      });
    });
  };

  return (
    <div className="p-5">
      <SearchBar />
      <h2 className="text-[20px] font-bold mt-5">
        {fileList?.name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => deleteFolder()}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </h2>

      {folderList.length > 0 ? (
        <FolderList folderList={folderList} isBig={false} />
      ) : (
        <h2
          className="text-gray-400
        text-[16px] mt-5"
        >
          No Folder Found
        </h2>
      )}

      <CreatedFiles />
      <FileList fileList={fileList} />
    </div>
  );
}

export default FolderDetails;
