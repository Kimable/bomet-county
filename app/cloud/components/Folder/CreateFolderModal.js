"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { app } from "@/app/Config/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ShowToastContext } from "../../context/ShowToastContext";
import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useRouter, useSearchParams } from "next/navigation";

function CreateFolderModal({ closeModal }) {
  const docId = Date.now().toString();
  const [folderName, setFolderName] = useState();
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);

  const [loading, setLoading] = useState(false);

  const user = verifyUser();
  let router = useRouter();
  if (user === null) {
    return router.push("/");
  }

  const params = useSearchParams();
  let id = params.get("id");

  if (id == null) {
    id = 0;
  }

  const db = getFirestore(app);

  const onCreate = async () => {
    setLoading(true);
    console.log(folderName);

    await setDoc(doc(db, "Folders", docId), {
      name: folderName,
      id: docId,
      createBy: user.email,
      parentFolderId: id,
    });

    setLoading(false);
    closeModal(true);
    setShowToastMsg("Folder Created!");
  };
  if (loading == true) {
    return (
      <div className="text-center modal-box p-4 items-center w-[360px]">
        <h3>Creating Folder</h3>
        <span class="loading loading-dots loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div>
        <form method="dialog" className="modal-box p-9 items-center">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div
            className="w-full items-center 
        flex flex-col justify-center gap-3"
          >
            <Image src="/folder.png" alt="folder" width={50} height={50} />
            <input
              type="text"
              placeholder="Folder Name"
              className="p-2 border-[1px] outline-none
                rounded-md"
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button
              className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
              onClick={() => onCreate()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateFolderModal;
