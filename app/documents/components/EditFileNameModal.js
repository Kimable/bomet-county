"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function EditFileNameModal({
  fileName,
  setFileName,
  editFileName,
  closeEditModal,
}) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  if (loading == true) {
    return (
      <div className="text-center modal-box p-4 items-center w-[360px]">
        <h3>Creating Folder</h3>
        <span class="loading loading-dots loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div>
        <form
          method="dialog"
          className="modal-box p-9 items-center w-96"
          onSubmit={handleSubmit(editFileName)}
        >
          <a
            onClick={closeEditModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </a>
          <p className="text-textColor text-sm pt-2.5 font-bold mb-4">
            File Name:{" "}
          </p>
          <div className="">
            <div>
              <input
                type="text"
                id="fileName"
                {...register("fileName")}
                className="bg-card rounded-lg border-none text-textColor text-sm focus:outline-none block w-full p-2.5 mb-2"
                value={fileName}
                onChange={(event) => {
                  setFileName(event.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-themeColor focus:outline-none font-medium text-sm px-5 py-2.5 text-center rounded-lg"
            >
              Change Name
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditFileNameModal;
