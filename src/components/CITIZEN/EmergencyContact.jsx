import React from 'react';
import Lottie from 'react-lottie';

// Import Lottie animation JSON files
import animation1 from "../../Assets/animations/Animation - 1.json";
import animation2 from "../../Assets/animations/Animation - 2.json";
import animation3 from "../../Assets/animations/Animation - 3.json";
import animation4 from "../../Assets/animations/Animation - 4.json";
import animation5 from "../../Assets/animations/Animation - 5.json";
import Navbar from './CitizenNavbar';

const EmergencyContacts = () => {
    const animations = [animation1, animation2, animation3,  animation4, animation5];

    const defaultOptions = (animationData) => ({
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    });

    const emergencyContacts = [
        { name: 'Police', number: '100',  animation: animations[0] },
        { name: 'Fire Department', number: '101',  animation: animations[1] },
        { name: 'Ambulance', number: '102', animation: animations[3] },
        { name: 'Women Helpline', number: '1091',  animation: animations[2] },
        { name: 'Child Helpine', number: '1098', animation: animations[4] },
    ];

    return (
        <div>
            <Navbar/>
            <div className="bg-gray-100 min-h-screen py-6 px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Emergency Contacts</h1>
                    <p className="text-gray-600 mb-6">Keep these numbers handy for emergencies.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {emergencyContacts.map((contact, index) => (
                        <div
                            key={contact.name}
                            className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition"
                        >
                            <Lottie options={defaultOptions(contact.animation)} height={100} width={100} />
                            <span className="text-4xl mt-4">{contact.icon}</span>
                            <div className="text-center mt-2">
                                <h2 className="text-xl font-semibold text-gray-800">{contact.name}</h2>
                                <p className="text-lg text-gray-600">📞 {contact.number}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
       
    );
};

export default EmergencyContacts;
