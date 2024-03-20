"use client";
import React, { useCallback, useState } from "react";
import FolderItem from "./FolderItem";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FolderItemSmall from "./FolderItemSmall";

function FolderList({ folderList, isBig = true }) {
  const [activeFolder, setActiveFolder] = useState();
  const router = useRouter();

  const searchParams = useSearchParams();
  //   const folderList=[
  //     {
  //         id:1,
  //         name:'Folder 1 to Test Big Text'
  //     },
  //     {
  //         id:2,
  //         name:'Folder 2'
  //     },
  //     {
  //         id:3,
  //         name:'Folder 3'
  //     },
  //     {
  //         id:4,
  //         name:'Folder 4'
  //     },
  //     {
  //         id:5,
  //         name:'Folder 4'
  //     },
  // ]
  // const createQueryString = useCallback(
  //   (name, value) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  const onFolderClick = (index, item) => {
    setActiveFolder(index);

    router.push("/cloud/" + item.name + "?" + "id=" + item.id);
  };

  return (
    <div
      className="p-5 mt-5 
    bg-white rounded-lg"
    >
      {isBig ? (
        <h2 className="text-[17px] font-bold items-center">
          Recent Folders
          <span className="float-righttext-blue-400 font-normal text-[13px]">
            View All
          </span>
        </h2>
      ) : null}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4">
        {folderList.map((item, index) => (
          <div key={index} onClick={() => onFolderClick(index, item)}>
            <FolderItem folder={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderList;
