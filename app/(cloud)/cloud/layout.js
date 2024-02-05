"use client";
import CreateFolderModal from "./components/Folder/CreateFolderModal";
import SideNavBar from "./components/SideNavBar";
import Toast from "./components/Toast";
import "./styles/globals.css";

import { Suspense, useState } from "react";
import { ShowToastContext } from "./context/ShowToastContext";
import { ParentFolderIdContext } from "./context/ParentFolderIdContext";
import Storage from "./components/Storage/Storage";
function MyApp({ children }) {
  const [showToastMsg, setShowToastMsg] = useState();
  const [parentFolderId, setParentFolderId] = useState();

  return (
    <ParentFolderIdContext.Provider
      value={{ parentFolderId, setParentFolderId }}
    >
      <ShowToastContext.Provider value={{ showToastMsg, setShowToastMsg }}>
        <div className="flex">
          <SideNavBar />
          <Suspense>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              <div className="col-span-2">{children}</div>
              <div className="bg-white p-5 order-first md:order-last">
                <Storage />
              </div>
            </div>
          </Suspense>
        </div>
        {showToastMsg ? <Toast msg={showToastMsg} /> : null}
      </ShowToastContext.Provider>
    </ParentFolderIdContext.Provider>
  );
}

export default MyApp;