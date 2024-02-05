"use client";

import Head from "next/head";
import Image from "next/image";
import styles from "./styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import FolderList from "./components/Folder/FolderList";
import FileList from "./components/File/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/app/Config/FirebaseConfig";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";

export default function Home() {
  const router = useRouter();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const user = verifyUser();

  if (user === null) {
    return router.push("/");
  }

  const db = getFirestore(app);

  useEffect(() => {
    setFolderList([]);
    getFolderList();
    getFileList();
  }, []);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("parentFolderId", "==", 0),
      where("createBy", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("parentFolderId", "==", 0),
      where("createdBy", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };
  return (
    <div className="p-5">
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
