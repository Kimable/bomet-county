"use client";
import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FiBell, FiLogOut, FiCloud } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get current user
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);
    setUser(loggedUser);
  }, []);

  return (
    <div>
      {/* for header  */}
      <header>
        <nav className="bg-themeColor  px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                className="hidden md:block"
                onClick={console.log("clicked")}
              >
                <FaBars className="text-white mx-2" />
              </button>
              <button className="block md:hidden" onClick={toggleDrawer}>
                <FaBars className="text-white mx-2" />
              </button>

              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white mx-2">
                <Image
                  src="/bomet-logo.jpg"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
              </span>
            </div>
            <div className="flex items-center lg:order-2">
              <Link
                className="flex items-center py-2 px-4 text-xl text-white"
                href="/cloud"
              >
                DOCUMENTS <FiCloud className="mx-2" />
              </Link>

              <button
                href="#"
                className="block py-2 px-4 text-sm  rounded text-white "
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FiBell className="mx-2 text-xl" />
              </button>

              <button
                type="button"
                className="relative flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the state on click
              >
                <span className="sr-only">Open user menu</span>
                <div className="text-themeColor rounded-full p-2 bg-card">
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </div>
              </button>

              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } z-50 my-4 absolute top-[35px]  right-[10px] w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg `}
                id="dropdown"
              >
                <div className="py-3 px-4 ">
                  <span className="block text-sm font-semibold text-gray-900 ">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="block text-sm font-light text-gray-500 truncate ">
                    {user?.email}
                  </span>
                </div>

                <ul
                  className="py-1 font-light text-gray-500 "
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 "
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 "
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* end header  */}
    </div>
  );
};

export default Navbar;
