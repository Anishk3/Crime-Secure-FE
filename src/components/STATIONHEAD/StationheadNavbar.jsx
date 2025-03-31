import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import user_icon from "../../Assets/user.png";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const navigation = [
    { name: "Officer List", href: "/officerlist" },
    { name: "Add Officer", href: "/addofficer" },
    { name: "Assign Officer", href: "/assignofficer" },
    { name: "Incident Summary", href: "/incidentsummary" },
    { name: "Verify Incident", href: "/updatestatus" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Side (Logo & Navigation) */}
            <div className="flex items-center justify-center flex-grow space-x-4">
              <div className="logo relative right-72 text-indigo-500 font-bold">
                CRIME-SECURE
              </div>
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      active === item.href
                        ? "text-white border-b-2 border-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    onClick={() => setActive(item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right-Side (Profile Dropdown) */}
            <div className="ml-auto flex items-center pr-0">
              <Menu as="div" className="relative ml-4">
                <MenuButton className="relative flex items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 translate-y-[-8px]">
                  <span className="sr-only">Open user menu</span>
                  <img alt="User Avatar" src={user_icon} className="h-8 w-8 rounded-full" />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem as="div">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem as="div">
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
