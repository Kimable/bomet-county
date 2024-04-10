"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAlert = ({ fetchAlerts, closeAlertModal }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const add = await fetch(`/api/admin/addalert`, {
      method: "post",
      body: JSON.stringify(data),
    });
    const response = await add.json();
    console.log(response);
    fetchAlerts();
    setLoading(false);
    closeAlertModal(true);
  };

  return loading ? (
    <h2 className="modal-box p-9 items-center w-96 text-center text-lg text-green-600">
      Saving Alert...
    </h2>
  ) : (
    <div>
      <form
        method="dialog"
        className="modal-box p-9 items-center w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <a
          onClick={closeAlertModal}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </a>
        <div className="my-4">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Alert Type
          </label>

          <select
            id="status"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("status")}
          >
            <option defaultValue="Info" className="text-slate-500">
              Choose Alert Type
            </option>
            <option value="Success">Success</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Danger">Danger</option>
          </select>
        </div>
        <div className="w-full my-4 ">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("title")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Message
          </label>
          <textarea
            rows={4}
            id="message"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("message")}
          />
        </div>

        <div className="flex justify-end">
          <button className="mx-1 text-white text-sm text-center bg-textColor p-2 rounded-lg">
            Cancel
          </button>
          <button
            className="mx-1  text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            type="submit"
          >
            Add Alert
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddAlert;
