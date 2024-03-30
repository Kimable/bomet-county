"use client";
import React, { useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import { FiCalendar, FiUserPlus, FiHome } from "react-icons/fi";
import { useForm } from "react-hook-form";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import { showToast } from "@/app/components/toast";
import { ToastContainer } from "react-toastify";

const AddDepartment = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    let response = await fetch(`/api/admin/addDepartment`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    showToast("Department Added Successfully");
    const responseData = await response.json();
    console.log(responseData);
    setLoading(false);
  };

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Add Department" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        {loading ? (
          <div className="text-center modal-box p-4 items-center w-[360px]">
            <h3>Adding Department.</h3>
            <span class="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="departmentName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                {...register("departmentName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Department"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            >
              Add Department <FiHome className="text-white mx-2" />
            </button>
          </form>
        )}
        <ToastContainer />
      </div>
    </SuperuserLayout>
  );
};

export default AddDepartment;
