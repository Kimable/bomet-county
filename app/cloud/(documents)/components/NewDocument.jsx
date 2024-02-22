"use client";

import React from "react";
import Link from "next/link";

function NewDocument() {
  return (
    <div className="h-80 bg-gray-50">
      <div className="flex pl-20 pr-20 pt-10 justify-between card">
        <div className="flex">
          <p>Create a new document</p>
        </div>
      </div>
      <div className="flex pl-20 pr-20 pt-2 justify-between card-body">
        <Link href="/documents/editor">
          <div className="flex img-div">
            <img
              src="/assets/create.png"
              alt=""
              className="h-48  padding-img hover:border hover:border-purple-700 cursor-pointer"
            />
            <div className="relative top-48 right-36 card-text">
              <p>Blank</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NewDocument;
