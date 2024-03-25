"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import menu from "../data/menu";
import CreateFolderModal from "./Folder/CreateFolderModal";
import UploadFileModal from "./File/UploadFileModal";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { v4 as uuidv4 } from "uuid";

import Link from "next/link";

function SideNavBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const params = useSearchParams();
  let id = params.get("id");
  if (id == null) {
    id = 0;
  }

  // Get current user
  const [user, setUser] = useState("");

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
  }, []);

  const onMenuClick = (item, index) => {
    setActiveIndex(index);
    router.push("/cloud");
  };
  return (
    user && (
      <div className="w-[200px] bg-white h-screen sticky top-0 z-10 p-5">
        <div className="flex justify-center">
          <Image
            src="/bomet-logo.jpg"
            alt="logo"
            className="cursor-pointer"
            width={80}
            height={60}
            onClick={() => router.push("/cloud")}
          />
        </div>
        <button
          onClick={() => window.upload_file.showModal()}
          className="flex gap-2 items-center text-[13px]
        bg-blue-500 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 w-full justify-center"
        >
          Add New File
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
        <button
          className="flex gap-2 items-center text-[13px]
        bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
          onClick={() => window.my_modal_3.showModal()}
        >
          Create Folder
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

        <Link
          href={`/documents?id=${id}`}
          className="flex gap-2 items-center text-[13px]
        bg-blue-700 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
        >
          Create Document
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
        </Link>

        <div className="mt-7">
          {menu.list.map((item, index) => (
            <h2
              key={index}
              onClick={() => onMenuClick(item, index)}
              className={`flex gap-2 items-center
            p-2 mt-3 text-gray-500 rounded-md cursor-pointer
            hover:bg-blue-500 hover:text-white
            ${activeIndex == index ? "bg-blue-500 text-white" : null}`}
            >
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
                  d={item.logo}
                />
              </svg>
              {item.name}
            </h2>
          ))}
        </div>

        <dialog id="my_modal_3" className="modal">
          <CreateFolderModal closeModal={() => window.upload_file.close()} />
        </dialog>
        <dialog id="upload_file" className="modal">
          <UploadFileModal closeModal={() => window.upload_file.close()} />
        </dialog>
      </div>
    )
  );
}

export default SideNavBar;
