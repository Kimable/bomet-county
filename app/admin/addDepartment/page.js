"use client";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiUserPlus, FiHome } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { showToast } from "@/app/components/toast";
import { ToastContainer } from "react-toastify";

const AddDepartment = ({ closeModal, getDepartments }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  let [employees, setEmployees] = useState([]);

  const onSubmit = async (data) => {
    setLoading(true);
    let response = await fetch(`/api/admin/addDepartment`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    showToast("Department Added Successfully");
    const responseData = await response.json();
    console.log(responseData);

    getDepartments();
    setLoading(false);
    closeModal(true);
  };

  useEffect(() => {
    setEmployees([]);
    fetch(`/api/admin/fetchAllUsers`, { method: "post" })
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        setEmployees(e.users);
      });
  }, []);

  return loading ? (
    <div className="text-center modal-box p-4 items-center w-[360px]">
      <h3>Adding Department.</h3>
      <span class="loading loading-dots loading-lg"></span>
    </div>
  ) : (
    <div>
      <form
        method="dialog"
        className="modal-box p-9 items-center w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <a
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </a>
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
            required
          />
        </div>

        <div className="my-4">
          <label
            htmlFor="headOfDepartment"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Department Head
          </label>

          <select
            id="headOfDepartment"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("headOfDepartment")}
            required
          >
            <option className="text-slate-500" selected>
              Select Head of Department
            </option>
            {employees &&
              employees.map((employee) => {
                return (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                );
              })}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
        >
          Add Department <FiHome className="text-white mx-2" />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddDepartment;
