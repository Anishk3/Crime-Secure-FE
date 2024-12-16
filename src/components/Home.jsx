import React from 'react';
import { Link } from 'react-router-dom';
import murdercard from '../Assets/mudercard.png';
import theftcard from '../Assets/theftcard.png';
import missingpersoncard from '../Assets/missingpersoncard.png';
import abusecard from '../Assets/abusecard.png';
import "../styles/Home.css"
import Learn from './Learn';
import HeroSection from './HeroSection';

const Home = () => {
    return (
        <div className="home">
            <HeroSection/>
            {/* Crime Cards Section */}
            <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">File Your Complaint</h2>
            <div className="flex flex-wrap justify-center gap-16 pt-10">
                <div className="max-w-xs bg-white border rounded-lg shadow-lg">
                    <img src={murdercard} alt="Murder" className="rounded-t-lg h-80" />
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-3 flex items-center justify-center">MURDER</h4>
                        <Link to="/filecomplaint" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center">File Complaint</Link>
                    </div>
                </div>

                <div className="max-w-xs bg-white border rounded-lg shadow-lg">
                    <img src={theftcard} alt="Theft" className="rounded-t-lg h-80" />
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-3 flex items-center justify-center">THEFT</h4>
                        <Link to="/filecomplaint" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center">File Complaint</Link>
                    </div>
                </div>

                <div className="max-w-xs bg-white border rounded-lg shadow-lg">
                    <img src={missingpersoncard} alt="Missing Person" className="rounded-t-lg h-80" />
                    <div className="p-4 ">
                        <h4 className="text-lg font-semibold mb-3 flex items-center justify-center">MISSING PERSON</h4>
                        <Link to="/filecomplaint" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center">File Complaint</Link>
                    </div>
                </div>

                <div className="max-w-xs bg-white border rounded-lg shadow-lg">
                    <img src={abusecard} alt="Abuse" className="rounded-t-lg h-80" />
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-3 flex items-center justify-center">ABUSE</h4>
                        <Link to="/filecomplaint" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center">File Complaint</Link>
                    </div>
                </div>
            </div>
            </div>

            {/* Learning Corner Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-center mb-6">Learning Corner</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="max-w-xs bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Public Safety</h3>
                            <p className="text-gray-600">
                                Stay alert and aware of your surroundings. Avoid isolated areas, and trust your instincts when something feels off. Always share your travel plans with someone you trust.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-xs bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Parental Control</h3>
                            <p className="text-gray-600">
                                Set boundaries for children's online activity. Use parental control tools to monitor screen time and educate them about safe online practices.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-xs bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Cyber Crime</h3>
                            <p className="text-gray-600">
                                Protect your personal information online. Use strong passwords, enable two-factor authentication, and avoid clicking on suspicious links or sharing sensitive data.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-xs bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">General Awareness</h3>
                            <p className="text-gray-600">
                                Be informed about current safety protocols in your area. Attend workshops or read verified guides to stay updated on best practices for personal and community safety.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Learn/>
        </div>

    );
};

export default Home;
