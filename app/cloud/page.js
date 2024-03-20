"use client";
import Image from "next/image";
import styles from "./styles/Home.module.css";
import { Suspense, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import FolderList from "./components/Folder/FolderList";
import FileList from "./components/File/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/app/Config/FirebaseConfig";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import CreatedFiles from "./components/createdFiles/CreatedFiles";

export default function Home() {
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const db = getFirestore(app);
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);

    if (loggedUser === null) {
      localStorage.setItem("token", "");
      return router.push("/");
    }
    setUser(loggedUser);
    getFolderList(loggedUser);
    getFileList(loggedUser);
  }, []);

  useEffect(() => {}, []);

  const getFolderList = async (loggedUser) => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("parentFolderId", "==", 0),
      where("createBy", "==", loggedUser?.email || null)
    );

    const querySnapshot = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change.doc.id, " => ", change.doc.data());
        setFolderList((folderList) => [...folderList, change.doc.data()]);
      });
    });
  };

  const getFileList = async (loggedUser) => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("parentFolderId", "==", 0),
      where("createdBy", "==", loggedUser?.email || null)
    );

    const querySnapshot = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setFileList((fileList) => [...fileList, change.doc.data()]);
      });
    });
  };
  return (
    <Suspense>
      <div className="p-5">
        <SearchBar />
        <FolderList folderList={folderList} />
        <CreatedFiles />
        <FileList fileList={fileList} />
      </div>
    </Suspense>
  );
}
