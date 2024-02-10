"use client";
import { useRouter } from "next/navigation";
import React from "react";

function unauthorized() {
  const router = useRouter();
  return (
    <div className="text-center m-7">
      <h1 className=" text-red-700 text-3xl">Unauthorized</h1>
      <p>You are not authorized to view this pags</p>
      <button className="my-3 btn btn-error" onClick={() => router.push("/")}>
        Go Back
      </button>
    </div>
  );
}

export default unauthorized;
