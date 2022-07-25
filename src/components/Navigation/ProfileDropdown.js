/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AppCtx } from '../../App';
import { Link } from 'react-router-dom';
import { Path } from 'constants/Path';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProfileDropdown = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppCtx);
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
            {isLoggedIn.alias ? isLoggedIn.alias?.split('')[0] : 'U'}
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
            {isLoggedIn.username}
          </div>
          <Menu.Item>
            {({ active }) => (
              <Link
                to={Path.Employee.Profile}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                My Profile
              </Link>
            )}
          </Menu.Item>
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
              <a
                href='#'
                onClick={() => setIsLoggedIn(null)}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
