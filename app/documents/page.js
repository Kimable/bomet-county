"use client";
import { useSearchParams } from "next/navigation";
import "./styles.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreatedFiles from "../cloud/components/createdFiles/CreatedFiles";

function Documents() {
  const params = useSearchParams();
  let id = params.get("id");
  if (id == null) {
    id = 0;
  }

  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    function generateUniqueCode(length) {
      // Define characters allowed in the code
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let code = "";
      for (let i = 0; i < length; i++) {
        // Generate random index and pick character from chars
        code += chars[Math.floor(Math.random() * chars.length)];
      }

      // For better uniqueness, consider adding a timestamp:
      const timestamp = Date.now().toString(36).toUpperCase();
      code = timestamp + code.slice(0, length - timestamp.length);

      return code.toLowerCase();
    }

    // Example usage:
    const uniqueCode = generateUniqueCode(20);
    console.log(uniqueCode); // Output: Example: 1A2B3C4D5E67
    setUuid(uniqueCode);
  }, []);

  {
    return uuid != null ? (
      <>
        <div className="container my-8 w-auto">
          <h1 className="font-bold text-left text-2xl pb-4">
            Create A New Document
          </h1>
          <Link href={`/documents/${uuid}?id=${id}`}>
            <div className="w-64 h-80 bg-slate-200 flex justify-center items-center border-spacing-1">
              <h2 className="text-8xl text-blue-400">+</h2>
            </div>
          </Link>
        </div>
        <div className="container my-10 bg-gray-100 p-5">
          <h2 className="font-bold text-2xl pb-4 text-left">Templates</h2>
          {/* Templates */}
          <div className="templates flex flex-row items-center justify-around">
            <div className="template">
              <Link href={`/documents/${uuid}?id=${id}&template=letter`}>
                <img src="/assets/letter-template.png" />
              </Link>
              <h2 className="font-semibold text-xl text-center text-green-700 py-3">
                Letter
              </h2>
            </div>
            <div className="template">
              <Link href={`/documents/${uuid}?id=${id}&template=cv`}>
                <img src="/assets/cv-template.png" />
              </Link>
              <h2 className="font-semibold text-xl text-center text-green-700 py-3">
                Resume
              </h2>
            </div>
            <div className="template">
              <Link href={`/documents/${uuid}?id=${id}&template=minutes`}>
                <img src="/assets/minutes.png" />
              </Link>
              <h2 className="font-semibold text-xl text-center text-green-700 py-3">
                Minutes
              </h2>
            </div>
          </div>
        </div>
        <div className="container my-8 text-left">
          <CreatedFiles title="Recent Files" />
        </div>
      </>
    ) : (
      <p className="my-10 font-bold text-lg">Loading...</p>
    );
  }
}

export default Documents;
