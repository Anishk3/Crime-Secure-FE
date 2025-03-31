import React, { useContext, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import user_icon from '../../Assets/user.png';
import AuthContext from '../../context/AuthProvider';
import CitizenService from '../../Services/CitizenService';

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { auth } = useContext(AuthContext);
  const [unseenIncidents, setUnseenIncidents] = useState([]);
  const [alertShown, setAlertShown] = useState(false); // New state to track alert display
  
  const citizenId = auth?.id; // Get citizen ID from auth
  console.log(citizenId);
  
  const token = auth?.accessToken; // Get token from auth
  console.log(token);
  console.log(auth);
  

  // 🔹 Fetch unseen incidents when navbar loads
  useEffect(() => {
    if (citizenId && token) {
      fetchUnseenIncidents();
    }
  }, [citizenId, token]);

  const fetchUnseenIncidents = async () => {
    try {
      const response = await CitizenService.getUnseenIncidents(citizenId, token);
      setUnseenIncidents(response.data);
  
      if (response.data.length > 0 && !alertShown) { 
        alert(`🔔 You have ${response.data.length} new incident(s). Status: Active.`);
        setAlertShown(true); // Set flag to prevent duplicate alerts
      }
    } catch (error) {
      console.error("Error fetching unseen incidents:", error);
    }
  };

  // 🔹 Mark incidents as seen when the bell icon is clicked
  const markAllAsSeen = async () => {
    try {
      await CitizenService.markIncidentsAsSeen(citizenId, token);
      setUnseenIncidents([]); // Clear the badge
    } catch (error) {
      console.error("Error marking incidents as seen:", error);
    }
  };

  const navigation = [
    { name: 'Home', href: '/complaints' },
    { name: 'File a Complaint', href: '/filecomplaint' },
    { name: 'Services', href: '/servicespage' },
    { name: 'Emergency Contacts', href: '/emergency-contacts' },
    { name: 'Crime Statistics', href: '/crime-statistics' },
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
              <div className="logo relative right-72 text-indigo-500 font-bold">
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

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                type="button"
                onClick={markAllAsSeen}
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
                {unseenIncidents.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {unseenIncidents.length}
                  </span>
                )}
              </button>
            </div>

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
                      to="/citizenprofile"
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
