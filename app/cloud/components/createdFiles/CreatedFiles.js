"use client";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function CreatedFiles() {
  const [files, setFiles] = useState([]);
  const params = useSearchParams();
  const router = useRouter();

  // Get User
  const [user, setUser] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);
    getFiles(loggedUser.userId);
    setUser(loggedUser);
  }, []);

  // Parent Folder id

  let folderId = params.get("id");

  if (folderId == null) {
    folderId = 0;
  }

  async function getFiles(userId) {
    let files = await fetch(`/api/user/getdocument`, {
      method: "POST",
      body: JSON.stringify({ parentFolderId: folderId, userId }),
    });
    let response = await files.json();

    setFiles(response.getDocuments);
  }

  console.log(files);

  const onFileClick = (index, item) => {
    router.push("/documents/" + item._id);
  };

  return (
    <div className="bg-white mt-5 p-5 rounded-lg">
      <h2 className="text-[18px] font-bold">Created Files</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4">
        {files.length !== 0 ? (
          files.map((item, index) => (
            <div key={item._id} onClick={() => onFileClick(index, item)}>
              <div
                className={`w-full flex flex-col justify-center items-center h-[120px] border-[1px]  rounded-lg p-5 bg-white hover:scale-105 hover:shadow-md cursor-pointer `}
              >
                <Image
                  src="/assets/icons8/icons8-document-144.png"
                  alt="folder"
                  width={75}
                  height={75}
                />
              </div>
              <h2 className="truncate text-[12px] text-center">
                {item.fileName}
              </h2>
            </div>
          ))
        ) : (
          <p>No created Files yet!</p>
        )}
      </div>
    </div>
  );
}

export default CreatedFiles;
