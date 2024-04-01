"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ShareFileModal({ shareDocument, closeShareModal }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");

  if (loading == true) {
    return (
      <div className="text-center modal-box p-4 items-center w-[360px]">
        <h3>Sharing File</h3>
        <span class="loading loading-dots loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div>
        <form
          method="dialog"
          className="modal-box p-9 items-center w-96"
          onSubmit={handleSubmit(shareDocument)}
        >
          <a
            onClick={closeShareModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </a>
          <p className="text-textColor text-sm pt-2.5 font-bold mb-3">
            Share Document:{" "}
          </p>
          <div className="">
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-card border-none mb-3 rounded-lg text-textColor text-sm focus:outline-none block w-full p-2.5 "
              value={email}
              placeholder="Enter email to share document"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <button
              type="submit"
              className="text-white rounded-lg bg-themeColor focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ShareFileModal;
