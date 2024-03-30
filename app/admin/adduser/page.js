"use client";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { addUser } from "@/store/reducer/admin/addUserReducer";
import { useDispatch } from "react-redux";
import CurrentDate from "@/app/components/common/currentdate/page";
import { fetchTeamLeads } from "@/store/reducer/admin/fetchTeamLeadsReducer";
import { fetchShifts } from "@/store/reducer/admin/fetchShiftsReducer";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useRouter } from "next/navigation";
import { setDoc } from "firebase/firestore";
import { showToast } from "@/app/components/toast";
import { ToastContainer } from "react-toastify";

const AddUser = () => {
  const [userType, setUserType] = useState("");
  const [teamLead, setTeamLead] = useState(false);
  const [teamLeadList, setTeamLeadList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [shiftList, setshiftList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);

    if (loggedUser === null) {
      localStorage.setItem("token", "");
      return router.push("/");
    }

    if (loggedUser.isAdmin !== true) {
      return router.push("/unauthorized");
    }
  }, []);

  // // for image
  // const [image, setImage] = useState(null);
  // const uploadToClient = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const i = event.target.files[0];

  //     setImage(i);
  //   }
  // };

  const handleUserType = (event) => {
    setUserType(event.target.value);

    if (event.target.value === "employee") {
      setTeamLead(false);
    } else {
      setTeamLead(true);
    }
  };

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data.teamLead = teamLead;
    data.employeeType = userType;

    // await dispatch(addUser(data));
    let addUser = await fetch("/api/admin/adduser", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let res = await addUser.json();

    showToast("Successfully Added employee");
    console.log(res);
  };

  // to fetch team leads
  useEffect(() => {
    // Dispatch the action to fetch team leads
    dispatch(fetchTeamLeads())
      .then((response) => {
        // Assuming response.data is an array of team leads
        setTeamLeadList(response.data.allTeamLeads);
      })
      .catch((error) => {
        console.error("Error fetching team leads:", error);
      });
  }, []);
  //  to fetch shifts
  useEffect(() => {
    // Dispatch the action to fetch shifts
    dispatch(fetchShifts())
      .then((response) => {
        // Assuming response.data is an array of shifts
        setshiftList(response.data.allShifts);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shifts:", error);
      });
  }, []);

  // Fetch departments
  useEffect(() => {
    setDepartments([]);
    fetch("/api/common/fetchDepartments", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((deps) => {
        setDepartments(deps.departments);
        console.log(deps.departments);
      });
  }, []);

  return (
    <SuperuserLayout>
      <div className="m-2 p-2">
        <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
          <BreadCrumb text="Add Employee" />
          <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
            <FiCalendar className="text-white mx-2" /> <CurrentDate />
          </button>
        </div>

        <ToastContainer />

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              for="employeeType"
              className="block mb-2 text-sm font-medium text-textColor"
            >
              Select User to Add
            </label>
            <select
              id="employeeType"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              onChange={handleUserType}
            >
              <option disabled selected>
                Select User Type
              </option>
              <option value="Team Leader">Manager/Supervisor</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* <div>
            <label
              className="block mb-2 text-sm font-medium text-textColor "
              for="userImage"
            >
              Upload file
            </label>
            <input
              className="p-2 block w-full text-sm text-textColor border border-card rounded-lg cursor-pointer bg-card  focus:outline-none "
              aria-describedby="userImage_help"
              id="userImage"
              type="file"
              onChange={uploadToClient}
            />
            <p className="mt-1 text-sm text-lightText" id="user_image_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div> */}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="firstName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="John"
              />
            </div>
            <div>
              <label
                for="lastName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="middleName"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                {...register("middleName")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Smith"
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="designation"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Employee Designation
              </label>
              <input
                type="text"
                id="designation"
                {...register("designation")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Eg. Chief Financial Officer"
              />
            </div>
            <div>
              <label
                for="IDNumber"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Employe ID Number
              </label>
              <input
                type="text"
                id="IDNumber"
                {...register("IDNumber")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="ID Number"
              />
            </div>
          </div>

          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="phoneNo"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNo"
                {...register("phoneNo")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label
                for="employmentNo"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Employment ID
              </label>
              <input
                type="text"
                id="employmentNo"
                {...register("employmentNo")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Employment ID"
              />
            </div>
          </div>

          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="nextOfKin"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Next Of Kin Full Name
              </label>
              <input
                type="text"
                id="nextOfKin"
                {...register("nextOfKin")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Jane Smith Doe"
              />
            </div>
            <div>
              <label
                for="nextOfKinPhone"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Next of Kin Phone Number
              </label>
              <input
                type="text"
                id="nextOfKinPhone"
                {...register("nextOfKinPhone")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="Next of Kin Phone Number"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              for="nextOfKinRelationship"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Next of Kin Relationship
            </label>
            <input
              type="text"
              {...register("nextOfKinRelationship")}
              id="nextOfKinRelationship"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              placeholder="Eg. Spouse, mother, father, etc"
            />
          </div>

          {/* <div className="mb-6">
            <label
              for="userEmail"
              className="block mb-2 text-sm font-medium text-textColor "
            >
              Email
            </label>
            <input
              type="email"
              {...register("userEmail")}
              id="userEmail"
              className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              placeholder="John@doe.com"
            />
          </div> */}

          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                for="userPassword"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                {...register("password")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="******"
              />
            </div>
            <div>
              <label
                for="confirmPassword"
                className="block mb-2 text-sm font-medium text-textColor "
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                placeholder="******"
              />
            </div>
          </div>
          {userType === "employee" && (
            <div className="mb-6">
              <label
                htmlFor="teamLeadEmail"
                className="block mb-2 text-sm font-medium text-textColor"
              >
                Select Head of Department
              </label>
              <select
                id="teamLeadEmail"
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
                {...register("teamLeadEmail")}
              >
                <option value="" disabled selected>
                  Choose Head of Department
                </option>
                {teamLeadList &&
                  teamLeadList.map((teamLead) => (
                    <option key={teamLead._id} value={teamLead.email}>
                      {teamLead.firstName} {teamLead.lastName}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="mt-2 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="department"
                className="block mb-2 text-sm font-medium text-textColor"
              >
                Department
              </label>
              <select
                id="department"
                {...register("department")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              >
                <option selected>Choose a department</option>

                {departments.length !== 0 &&
                  departments.map((department) => (
                    <option
                      key={department?._id}
                      value={department?.departmentName}
                    >
                      {department?.departmentName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                for="shift"
                className="block mb-2 text-sm font-medium text-textColor"
              >
                Shift
              </label>
              <select
                id="shift"
                {...register("shift")}
                className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5"
              >
                <option selected>Choose a shift</option>
                {shiftList &&
                  shiftList.map((shiftList) => (
                    <option key={shiftList._id} value={shiftList.shiftName}>
                      {shiftList.shiftName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
          >
            <FiUserPlus className="text-white mx-2" /> Add Employee
          </button>
        </form>
      </div>
    </SuperuserLayout>
  );
};

export default AddUser;
