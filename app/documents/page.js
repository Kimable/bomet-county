"use client";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
import "./styles/styles.css";
import { useEffect, useState, Suspense } from "react";
import CreatedFiles from "../cloud/components/createdFiles/CreatedFiles";

function Documents() {
  const params = useSearchParams();
  let id = params.get("id");
  if (id == null) {
    id = 0;
  }

  const [uuid, setUuid] = useState(null);
  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  {
    return uuid != null ? (
      <Suspense>
        <div className="container my-8 w-auto">
          <h1 className="font-bold text-left text-2xl pb-4">
            Create A New Document
          </h1>
          <a href={`/documents/${uuid}?id=${id}`}>
            <div className="w-64 h-80 bg-slate-200 flex justify-center items-center border-spacing-1">
              <h2 className="text-8xl text-blue-400">+</h2>
            </div>
          </a>
        </div>
        <div className="container my-10 bg-gray-100 p-5">
          <h2 className="font-bold text-2xl pb-4 text-left">Templates</h2>
          {/* Templates */}
          <div className="templates flex flex-row items-center justify-around">
            <div className="template">
              <a href={`/documents/${uuid}?id=${id}&template=letter`}>
                <img src="/assets/letter-template.png" />
              </a>
              <h2 className="font-semibold text-xl text-center text-green-700 py-3">
                Letter
              </h2>
            </div>
            <div className="template">
              <a href={`/documents/${uuid}?id=${id}&template=cv`}>
                <img src="/assets/cv-template.png" />
              </a>
              <h2 className="font-semibold text-xl text-center text-green-700 py-3">
                Resume
              </h2>
            </div>
            <div className="template">
              <a href={`/documents/${uuid}?id=${id}&template=minutes`}>
                <img src="/assets/minutes.png" />
              </a>
              <h2 className="font-semibold text-xl text-center text-green-700 py-3">
                Minutes
              </h2>
            </div>
          </div>
        </div>
        <div className="container my-8 text-left">
          <CreatedFiles title="Recent Files" />
        </div>
      </Suspense>
    ) : (
      <p className="my-10 font-bold text-lg">Loading...</p>
    );
  }
}

export default Documents;
