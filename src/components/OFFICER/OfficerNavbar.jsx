import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline'
import user_icon from '../../Assets/user.png'

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const [active, setActive] = useState(location.pathname); // Initialize active state with the current route

  const navigation = [
    { name: 'View Incident', href: '/assignedincidents' },
    { name: 'Close Incident', href: '/updatestatustoclosed' },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left side (logo and navigation links) */}
            <div className="flex items-center justify-center flex-grow space-x-4">
            <div className="logo relative right-96  text-indigo-500 font-bold">
              CRIME-SECURE
              </div>
              {/* Navigation links */}
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      active === item.href
                        ? 'text-white border-b-2 border-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    onClick={() => setActive(item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
                          <button
                                type="button"
                                className=" bottom-2 left-5 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                              </button>

            {/* Right-side actions (profile dropdown) */}
            <div className="ml-auto flex items-center pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-4">
                <div>
                  <MenuButton className="relative flex items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 translate-y-[-8px]">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User Avatar"
                      src={user_icon}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <Link
                      to="/officerprofile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;