/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AppCtx } from "../../App";
import { Link, useHistory } from "react-router-dom";
import { Path } from "constants/Path";
import { useDispatch } from "react-redux";
import { clearAuthData, setUserGroup } from "slices/userAccess/authSlice";
import { clearEmployeesData, clearEnumsData } from "slices";
import ChangePassword from "components/Auth/ChangePassword/change.password";
import {
  AccountCircle,
  ListAlt,
  Logout,
  SwitchAccessShortcut,
  SyncLock,
  ToggleOff,
  ToggleOn,
} from "@mui/icons-material";
import { getAvatar } from "utils/functions";
import { Avatar } from "@mui/material";
import { EMPLOYEE, HR_ADMIN, MANAGER, SYSAD } from "constants/Values";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData, userGroup, isHRLogin, isManagerLogin, isSysAdLogin } = useContext(AppCtx);
  const [changePassword, setChangePassword] = useState(false);

  const handleLogout = () => {
    dispatch(clearAuthData());
    window.location.href = Path.Dashboard;
  };

  const getEmployeeLink = (active) => (
    <Link
      to={Path.Employee.Profile}
      className={classNames(
        active ? "bg-gray-100" : "",
        "block p-4 py-3 text-sm text-gray-700 group"
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        <AccountCircle fontSize="small" className="dropdown-icon" />
        <span className="dropdown-text">My Profile</span>
      </div>
    </Link>
  );

  const switchToEmployee = async () => {
    await dispatch(setUserGroup(EMPLOYEE));
    history.push(Path.Dashboard);
  };

  const switchToHR = async () => {
    await dispatch(setUserGroup(HR_ADMIN));
    history.push(Path.Dashboard);
  };

  const switchToManager = async () => {
    await dispatch(setUserGroup(MANAGER));
    history.push(Path.Dashboard);
  };

  const switchToSysAd = async () => {
    await dispatch(setUserGroup(SYSAD));
    history.push(Path.Dashboard);
  };
      console.log({isManagerLogin})
  const getSwitchLink = (active) => {
    if (isHRLogin && userGroup === EMPLOYEE) {
      return (
        <Link
          component={"button"}
          onClick={switchToHR}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block p-4 py-3 text-sm text-gray-700 w-full group"
          )}
        >
          <div className="flex flex-row gap-2 items-center">
            <ToggleOff fontSize="small" className="dropdown-icon" />
            <span className="text-left dropdown-text">
              <small className="block">Switch to</small> { HR_ADMIN} PORTAL
            </span>
          </div>
        </Link>
      );
    }
    if (isManagerLogin && userGroup === EMPLOYEE) {
      return (
        <Link
          component={"button"}
          onClick={switchToManager}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block p-4 py-3 text-sm text-gray-700 w-full group"
          )}
        >
          <div className="flex flex-row gap-2 items-center">
            <ToggleOff fontSize="small" className="dropdown-icon" />
            <span className="text-left dropdown-text">
              <small className="block">Switch to</small> {MANAGER} PORTAL
            </span>
          </div>
        </Link>
      );
    }
    if (isSysAdLogin && userGroup === EMPLOYEE) {
      return (
        <Link
          component={"button"}
          onClick={switchToSysAd}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block p-4 py-3 text-sm text-gray-700 w-full group"
          )}
        >
          <div className="flex flex-row gap-2 items-center">
            <ToggleOff fontSize="small" className="dropdown-icon" />
            <span className="text-left dropdown-text">
              <small className="block">Switch to</small> {SYSAD} PORTAL
            </span>
          </div>
        </Link>
      );
    }
    return (
      <Link
        component={"button"}
        onClick={switchToEmployee}
        className={classNames(
          active ? "bg-gray-100" : "",
          "p-4 py-3 text-sm text-gray-700 text-left w-full group"
        )}
      >
        <div className="flex flex-row gap-2 items-center ">
          <ToggleOn fontSize="small" className="dropdown-icon" />
          <span className="dropdown-text">
            <small className="block">Switch to</small> EMPLOYEE PORTAL
          </span>
        </div>
      </Link>
    );
  };

  return (
    <Fragment>
      <ChangePassword show={changePassword} setShow={setChangePassword} />
      <Menu as="div" className="ml-3 relative z-10">
        <div>
          <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-gray-80">
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 rounded-full flex justify-center items-center font-medium hover:text-red-600">
              <Avatar src={getAvatar(userData?.gender?.code)} />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-[250px] rounded-md shadow-2xl overflow-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="w-full p-2 bg-slate-100 text-xs text-center">
              {userData.firstName} {userData.lastName}
            </div>
            {userData.userGroup.code !== EMPLOYEE && (
              <Menu.Item>
                {({ active }) => <div>{getSwitchLink(active)}</div>}
              </Menu.Item>
            )}
            {userGroup?.toLocaleLowerCase() === "employee" && (
              <Menu.Item>{({ active }) => getEmployeeLink(active)}</Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block p-4 py-3 text-sm text-gray-700 group transition-all duration-150"
                  )}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <ListAlt fontSize="small" className="dropdown-icon" />
                    <span className="dropdown-text">My Activities</span>
                  </div>
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={() => setChangePassword(true)}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block p-4 py-3 text-sm text-gray-700 cursor-pointer group transition-all duration-150"
                  )}
                >
                  <div className="flex flex-row gap-2">
                    <SyncLock fontSize="small" className="dropdown-icon" />{" "}
                    <span className="dropdown-text">Change Password</span>
                  </div>
                </span>
              )}
            </Menu.Item>
            {/* <Menu.Item>
            {({ active }) => (
              <a
                href='#'
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block p-4 py-3 text-sm text-gray-700 w-full text-left group transition-all duration-150"
                  )}
                  onClick={handleLogout}
                >
                  <div className="flex flex-row gap-2">
                    <Logout className="dropdown-icon" fontSize="small" />{" "}
                    <span className="dropdown-text">Sign out</span>
                  </div>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  );
};

export default ProfileDropdown;
