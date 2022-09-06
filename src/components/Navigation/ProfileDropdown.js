/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AppCtx } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { Path } from 'constants/Path';
import { useDispatch } from 'react-redux';
import { clearAuthData, setUserGroup } from 'slices/userAccess/authSlice';
import { clearEmployeesData, clearEnumsData } from 'slices';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData, userGroup, isHRLogin } = useContext(AppCtx);

  const handleLogout = () => {
    dispatch(clearAuthData());
    window.location.href = Path.Dashboard;
  };

  const getEmployeeLink = (active) => <Link
    to={Path.Employee.Profile}
    className={classNames(
      active ? 'bg-gray-100' : '',
      'block px-4 py-2 text-sm text-gray-700'
    )}
  >
    My Profile
  </Link>

  const switchToEmployee = async () => {
    await dispatch(setUserGroup("EMPLOYEE"))
    history.push(Path.Dashboard);
  }

  const switchToHR = async () => {
    await dispatch(setUserGroup("HR ADMIN"))
    history.push(Path.Dashboard);
  }

  const getSwitchLink = (active) => {
    if (isHRLogin && userGroup == "EMPLOYEE") {
      return <Link
        component={"button"}
        onClick={switchToHR}
        className={classNames(
          active ? 'bg-gray-100' : '',
          'block px-4 py-2 text-sm text-gray-700'
        )}
      >
        Switch to HR ADMIN Portal
      </Link>
    }
    return <Link
      component={"button"}
      onClick={switchToEmployee}
      className={classNames(
        active ? 'bg-gray-100' : '',
        'block px-4 py-2 text-sm text-gray-700'
      )}
    >
      Switch to EMPLOYEE Portal
    </Link>
  }

  return (
    <Menu as='div' className='ml-3 relative z-10'>
      <div>
        <Menu.Button className='bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-gray-80'>
          <span className='sr-only'>Open user menu</span>
          {/* <img
            className='h-8 w-8 rounded-full'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          /> */}
          <div className='w-8 h-8 rounded-full flex justify-center items-center font-medium hover:text-red-600'>
            {userData?.firstName
              ? userData?.firstName?.split('')[0]
              : 'V'}
            {userData?.lastName
              ? userData?.lastName?.split('')[0]
              : 'S'}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='w-full p-2 bg-slate-100 text-xs text-center'>
            {userData.firstName} {userData.lastName}
          </div>
          {isHRLogin &&
            <Menu.Item>
              {({ active }) => getSwitchLink(active)}
            </Menu.Item>
          }
          {userGroup.toLocaleLowerCase() === "employee" &&
            <Menu.Item>
              {({ active }) => getEmployeeLink(active)}
            </Menu.Item>
          }
          <Menu.Item>
            {({ active }) => (
              <a
                href='#'
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                My Activities
              </a>
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
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                )}
                onClick={handleLogout}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
