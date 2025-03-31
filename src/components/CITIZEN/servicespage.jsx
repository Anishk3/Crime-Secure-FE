import React from 'react';
import Navbar from './CitizenNavbar.jsx'

const Services = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar/>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Services</h1>

                {/* Description */}
                <p className="text-gray-700 text-lg mb-8">
                    Provide access to other services such as:
                </p>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lost Property */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Lost Property</h2>
                        <p className="text-gray-600">
                            Property that cannot be located; does not include property that you think was taken from your possession.
                            <br />
                            <span className="font-medium">Example:</span> Forgetting a package on the subway.
                        </p>
                    </div>

                    {/* Petit Larceny */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Petit Larceny</h2>
                        <p className="text-gray-600">
                            Property that was taken without permission valued at Rs.1000 or less. Does not include property that was forcibly taken from you.
                            <br />
                            <span className="font-medium">Example:</span> Bike being stolen in front of a store.
                        </p>
                    </div>

                    {/* Criminal Mischief */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Criminal Mischief</h2>
                        <p className="text-gray-600">
                            Intentional damage to property by a person.
                            <br />
                            <span className="font-medium">Example:</span> Intentionally breaking a car window.
                        </p>
                    </div>

                    {/* Graffiti */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Graffiti</h2>
                        <p className="text-gray-600">
                            Intentionally drawing, scratching, or etching on property.
                            <br />
                            <span className="font-medium">Example:</span> Spray painting a storefront. If reporting graffiti, upload a picture of the graffiti.
                        </p>
                    </div>
                </div>

                {/* Community Safety Tips */}
                <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-2">Community Safety Tips</h2>
                    <p className="text-gray-600 mb-4">
                        Safety guidelines and alerts to keep your community safe.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                            <strong>Stay Alert:</strong> Be aware of your surroundings, especially in unfamiliar areas or late at night.
                        </li>
                        <li>
                            <strong>Emergency Contacts:</strong> Keep a list of important emergency numbers readily available, including local police and fire departments.
                        </li>
                        <li>
                            <strong>Community Watch Programs:</strong> Join or establish a neighborhood watch program to collectively enhance safety.
                        </li>
                        <li>
                            <strong>Secure Your Property:</strong> Lock all doors and windows, install security cameras, and use outdoor lighting.
                        </li>
                        <li>
                            <strong>Online Safety:</strong> Avoid sharing personal information on public platforms, and be cautious of phishing scams.
                        </li>
                        <li>
                            <strong>Road Safety:</strong> Follow traffic rules, use crosswalks, and stay visible while walking or biking at night.
                        </li>
                        <li>
                            <strong>Fire Safety:</strong> Install smoke detectors and fire extinguishers in your home and review evacuation plans regularly.
                        </li>
                        <li>
                            <strong>Disaster Preparedness:</strong> Create an emergency kit with essentials like water, non-perishable food, first aid supplies, and flashlights.
                        </li>
                        <li>
                            <strong>Child Safety:</strong> Teach children how to dial emergency numbers and identify safe adults they can approach in emergencies.
                        </li>
                        <li>
                            <strong>Report Suspicious Activity:</strong> Immediately inform authorities of unusual or suspicious activities in your area.
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Services;
