//sidebar
"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FiAlertCircle,
  FiBell,
  FiCalendar,
  FiClock,
  FiFile,
  FiHome,
  FiPlusCircle,
  FiUser,
  FiUserPlus,
  FiUsers,
  FiBook,
  FiLayout,
} from "react-icons/fi";
import Link from "next/link";

const CustomSidebar = ({ userRole, toggle, pathname }) => {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    console.log(pathname);
    setActiveItem(pathname);
  }, [pathname]);

  // Function to handle click event on a menu item
  const handleMenuItemClick = (link) => {
    setActiveItem(link);
  };
  return (
    <div className="flex h-screen  ">
      <Sidebar
        collapsed={toggle}
        transitionDuration={500}
        onBackdropClick={() => setToggled(false)}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        backgroundColor={`rgba(255, 255, 255,0.9)`}
      >
        {/* for superuser  */}

        {userRole === "superuser" && (
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (!active) {
                  return {
                    color: "#4b5563",
                    fontWeight: "300",
                  };
                } else {
                  return {
                    color: "#7e22ce",
                    fontWeight: "500",
                  };
                }
              },
            }}
          >
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/admin/dashboard"}
              onClick={() => handleMenuItemClick("/admin/dashboard")}
              component={<Link href="/admin/dashboard" />}
            >
              {" "}
              Dashboard{" "}
            </MenuItem>
            <MenuItem
              icon={<FiUserPlus />}
              active={activeItem === "/admin/adduser"}
              onClick={() => handleMenuItemClick("/admin/add-user")}
              component={<Link href="/admin/adduser" />}
            >
              {" "}
              Add Employee{" "}
            </MenuItem>
            <MenuItem
              icon={<FiUsers />}
              active={activeItem === "/admin/employees"}
              onClick={() => handleMenuItemClick("/admin/employees")}
              component={<Link href="/admin/employees" />}
            >
              {" "}
              Employees{" "}
            </MenuItem>
            <MenuItem
              icon={<FiFile />}
              active={activeItem === "/admin/users"}
              onClick={() => handleMenuItemClick("/admin/users")}
              component={<Link href="/admin/users" />}
            >
              Employees Attendance
            </MenuItem>
            {/* <SubMenu icon={<FiClock />} label="Shift Management">
              <MenuItem
                icon={<FiClock />}
                active={activeItem === "/admin/shifts"}
                onClick={() => handleMenuItemClick("/admin/shifts")}
                component={<Link href="/admin/shifts" />}
              >
                {" "}
                Shifts{" "}
              </MenuItem>
              <MenuItem
                icon={<FiPlusCircle />}
                active={activeItem === "/admin/addshift"}
                onClick={() => handleMenuItemClick("/admin/addshift")}
                component={<Link href="/admin/addshift" />}
              >
                {" "}
                Add Shift{" "}
              </MenuItem>
            </SubMenu> */}

            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/admin/departments"}
              onClick={() => handleMenuItemClick("/admin/departments")}
              component={<Link href="/admin/departments" />}
            >
              Departments{" "}
            </MenuItem>

            <MenuItem
              icon={<FiCalendar />}
              active={activeItem === "/admin/leaves"}
              onClick={() => handleMenuItemClick("/admin/leaves")}
              component={<Link href="/admin/leaves" />}
            >
              {" "}
              Leave Applications{" "}
            </MenuItem>
            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/admin/alerts"}
              onClick={() => handleMenuItemClick("/admin/alerts")}
              component={<Link href="/admin/alerts" />}
            >
              {" "}
              Alerts{" "}
            </MenuItem>
            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/admin/issues"}
              onClick={() => handleMenuItemClick("/admin/issues")}
              component={<Link href="/admin/issues" />}
            >
              {" "}
              Issues{" "}
            </MenuItem>
          </Menu>
        )}

        {/* for supervisor  */}
        {userRole === "supervisor" && (
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (!active) {
                  return {
                    color: "#4b5563",
                    fontWeight: "300",
                  };
                } else {
                  return {
                    color: "#7e22ce",
                    fontWeight: "500",
                  };
                }
              },
            }}
          >
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/supervisor/dashboard"}
              onClick={() => handleMenuItemClick("/supervisor/dashboard")}
              component={<Link href="/supervisor/dashboard" />}
            >
              {" "}
              Dashboard{" "}
            </MenuItem>
            <MenuItem
              icon={<FiUser />}
              active={activeItem === `/supervisordetail/`}
              onClick={() => handleMenuItemClick(`/supervisordetail/`)}
              component={<Link href={`/supervisordetail/`} />}
            >
              {" "}
              Profile{" "}
            </MenuItem>
            <MenuItem
              icon={<FiUsers />}
              active={activeItem === "/supervisor/users"}
              onClick={() => handleMenuItemClick("/supervisor/users")}
              component={<Link href="/supervisor/users" />}
            >
              {" "}
              Employees{" "}
            </MenuItem>
            <MenuItem
              icon={<FiBell />}
              active={activeItem === "/supervisor/alerts"}
              onClick={() => handleMenuItemClick("/supervisor/alerts")}
              component={<Link href="/supervisor/alerts" />}
            >
              {" "}
              Notifications{" "}
            </MenuItem>
            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/supervisor/reportproblem"}
              onClick={() => handleMenuItemClick("/supervisor/reportproblem")}
              component={<Link href="/supervisor/reportproblem" />}
            >
              {" "}
              Report a Problem{" "}
            </MenuItem>
          </Menu>
        )}

        {/* for employee  */}

        {userRole === "employee" && (
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (!active) {
                  return {
                    color: "#4b5563",
                    fontWeight: "300",
                  };
                } else {
                  return {
                    color: "#7e22ce",
                    fontWeight: "500",
                  };
                }
              },
            }}
          >
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/employee/dashboard"}
              onClick={() => handleMenuItemClick("/employee/dashboard")}
              component={<Link href="/employee/dashboard" />}
            >
              {" "}
              Dashboard{" "}
            </MenuItem>

            <MenuItem
              icon={<FiUser />}
              active={activeItem === `/userdetail`}
              onClick={() => handleMenuItemClick(`/employee/profile`)}
              component={<Link href={`/employee/profile`} />}
            >
              {" "}
              Profile{" "}
            </MenuItem>

            <MenuItem
              icon={<FiCalendar />}
              active={activeItem === "/employee/leaves"}
              onClick={() => handleMenuItemClick("/employee/leaves")}
              component={<Link href="/employee/leaves" />}
            >
              {" "}
              Leave Applications{" "}
            </MenuItem>
            <MenuItem
              icon={<FiBell />}
              active={activeItem === "/employee/alerts"}
              onClick={() => handleMenuItemClick("/employee/alerts")}
              component={<Link href="/employee/alerts" />}
            >
              {" "}
              Notifications{" "}
            </MenuItem>
            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/employee/reportproblem"}
              onClick={() => handleMenuItemClick("/employee/reportproblem")}
              component={<Link href="/employee/reportproblem" />}
            >
              {" "}
              Report a Problem{" "}
            </MenuItem>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
