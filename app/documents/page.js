"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import "./styles.css";
import Link from "next/link";

function Documents() {
  const router = useRouter();
  const params = useSearchParams();
  let id = params.get("id");
  if (id == null) {
    id = 0;
  }

  return (
    <>
      <div className="container my-10 bg-gray-100 p-5">
        <div className="my-8">
          <h1 className="font-bold text-3xl pb-4">Create A New Document</h1>
          <Link href={`/documents/${uuidv4()}?id=${id}`}>
            <div className="w-64 h-80 bg-slate-200 flex justify-center items-center border-spacing-1">
              <h2 className="text-8xl text-blue-400">+</h2>
            </div>
          </Link>
        </div>
        <h2 className="font-bold text-2xl pb-4">Templates</h2>
        {/* Templates */}
        <div className="templates flex flex-row items-center justify-around">
          <div className="template">
            <Link href={`/documents/${uuidv4()}?id=${id}&template=letter`}>
              <img src="/assets/letter-template.png" />
            </Link>
            <h2 className="font-semibold text-xl text-center text-green-700 py-3">
              Letter
            </h2>
          </div>
          <div className="template">
            <Link href={`/documents/${uuidv4()}?id=${id}&template=cv`}>
              <img src="/assets/cv-template.png" />
            </Link>
            <h2 className="font-semibold text-xl text-center text-green-700 py-3">
              Resume
            </h2>
          </div>
          <div className="template">
            <Link href={`/documents/${uuidv4()}?id=${id}&template=minutes`}>
              <img src="/assets/minutes.png" />
            </Link>
            <h2 className="font-semibold text-xl text-center text-green-700 py-3">
              Minutes
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Documents;
