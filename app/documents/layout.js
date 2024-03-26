"use client";
import Toast from "../cloud/components/Toast";
import "../globals.css";

import { Suspense, useState } from "react";
import { ShowToastContext } from "../cloud/context/ShowToastContext";
import { ParentFolderIdContext } from "../cloud/context/ParentFolderIdContext";
import Navbar from "../components/navbar/page";

function EditorLayout({ children }) {
  const [showToastMsg, setShowToastMsg] = useState();
  const [parentFolderId, setParentFolderId] = useState();

  return (
    <ParentFolderIdContext.Provider
      value={{ parentFolderId, setParentFolderId }}
    >
      <ShowToastContext.Provider value={{ showToastMsg, setShowToastMsg }}>
        <Suspense>
          <Navbar />
          <div className="flex justify-center">
            <div className="">{children}</div>
          </div>

          {showToastMsg ? <Toast msg={showToastMsg} /> : null}
        </Suspense>
      </ShowToastContext.Provider>
    </ParentFolderIdContext.Provider>
  );
}

export default EditorLayout;
