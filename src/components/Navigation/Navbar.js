/* This example requires Tailwind CSS v2.0+ */

import { useEffect, useState, useContext } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';
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
import NavDrawer from './nav.drawer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn } = useContext(AppCtx);
  const [navigation, setNavigation] = useState(EmployeeNavigation);
  const [openDrawer, setOpenDrawer] = useState(false);

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
          <NavDrawer
            open={openDrawer}
            setOpen={setOpenDrawer}
            navigation={navigation}
          />

          <div className='max-w-7xl mx-auto px-2 phone:px-6 laptop:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 phone:flex items-center laptop:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button
                  onClick={() => setOpenDrawer(true)}
                  className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 '
                >
                  <span className='sr-only'>Open main menu</span>
                  {openDrawer ? (
                    <XIcon
                      className='block h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  ) : (
                    <MenuIcon
                      className='block h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center phone:justify-center phone:items-stretch laptop:justify-start'>
                <div className='tablet:flex-shrink-0 flex items-center justify-center'>
                  <img
                    className='phone:block laptop:hidden h-8 w-auto'
                    src={Logo}
                    alt='VisionProperties Dev. Corp.'
                  />
                  <img
                    className='phone:hidden laptop:block h-8 w-auto'
                    src={Logo}
                    alt='VisionProperties Dev. Corp.'
                  />
                </div>
                <div className='laptop:block phone:hidden phone:ml-6'>
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
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
