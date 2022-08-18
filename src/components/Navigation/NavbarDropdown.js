import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link, useLocation } from 'react-router-dom';

const NavbarDropdown = ({ menu }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className='text-right phone:hidden tablet:block'>
      <Menu
        as='div'
        className='relative inline-block text-left z-10'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-v-red hover:bg-v-red-hover'>
            {menu.name}
            <ChevronDownIcon
              className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          show={open}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute w-56 left-0 right-0 mt-1 origin-center divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='p-2 '>
              {menu.menus.map((menu, i) => {
                return (
                  <Link
                    key={`${menu.href}~${i}`}
                    to={menu.href}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-v-red text-white'
                              : location.pathname === menu.href
                              ? 'text-v-red'
                              : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {/* {active ? (
                              <EditActiveIcon
                                className='mr-2 h-5 w-5'
                                aria-hidden='true'
                              />
                            ) : (
                              <EditInactiveIcon
                                className='mr-2 h-5 w-5'
                                aria-hidden='true'
                              />
                            )} */}
                          {menu.label}
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavbarDropdown;
