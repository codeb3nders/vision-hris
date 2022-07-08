/* This example requires Tailwind CSS v2.0+ */

import { Fragment, useEffect, useRef, useState, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Logo from '../../assets/images/pms-logo.png';
import { AppCtx } from '../../App';
import {
  AdminNavigation,
  EmployeeNavigation,
  HRNavigation,
  ManagerNavigation,
} from './NavigationList';
import NavbarDropdown from './NavbarDropdown';
import ProfileDropdown from './ProfileDropdown';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppCtx);
  const [navigation, setNavigation] = useState(EmployeeNavigation);

  console.log({ location });

  useEffect(() => {
    switch (isLoggedIn.alias) {
      case 'EMPLOYEE':
        setNavigation(EmployeeNavigation);
        break;

      case 'MANAGER':
        setNavigation(ManagerNavigation);
        break;
      case 'HR':
        setNavigation(HRNavigation);
        break;
      case 'ADMIN':
        setNavigation(AdminNavigation);
        break;

      default:
        break;
    }
  }, [isLoggedIn]);

  return (
    <Disclosure as='nav' className='bg-v-red'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                    alt='Workflow'
                  />
                  <img
                    className='hidden lg:block h-8 w-auto'
                    src={Logo}
                    alt='VisionProperties Dev. Corp.'
                  />
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-2'>
                    {navigation.map((item) => {
                      return item.menus ? (
                        <NavbarDropdown menu={item} />
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current || location.pathname === item.href
                              ? 'bg-v-red-hover text-white'
                              : 'text-gray-200 hover:bg-v-red-hover hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <ProfileDropdown />
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-white hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
