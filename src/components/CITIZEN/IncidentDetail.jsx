import React, { useContext, useEffect, useState } from 'react';
import "../../styles/IncidentDetails.css";
import { useParams } from 'react-router-dom';
import CitizenService from '../../Services/CitizenService.jsx';
import AuthContext from '../../context/AuthProvider.jsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from './CitizenNavbar.jsx';


const IncidentDetail = () => {
    const [incident, setIncident] = useState(" ");
    const { id } = useParams();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        CitizenService.getIncidentById(auth.id, id, auth.accessToken)
            .then((response) => {
                console.log("UseEffect invoked",response.data)
                setIncident(response.data);
            })
            .catch((error) => {
                console.error("Error from getIncidentById API:", error);
            });
    }, [auth.id, id, auth.accessToken]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Incident Details", 14, 20);
        doc.setFontSize(12);

        const details = [
            ["Full Name", auth.username],
            ["Application For", incident.incidentType || "N/A"],
            ["Officers Assigned", incident.officers?.map(o => o.officerName).join(", ") || "No officers assigned"],
            ["Incident Status", incident.status || "N/A"],
            ["Incident Date", incident.dateCreated || "N/A"],
            ["Email Address", auth.email],
            ["Incident Detail", incident.incidentDetails || "N/A"]
        ];

        doc.autoTable({
            head: [["Field", "Details"]],
            body: details,
            startY: 30,
            theme: "grid",
        });

        doc.save("IncidentDetails.pdf");
    };

    return (
        <div className="incidentbg h-screen">
            <Navbar/>
            <div className="incident">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">Applicant Information</h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        {/* Incident details go here */}
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.username}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Application for</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.incidentType}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Officers Assigned</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {incident.officers && incident.officers.length > 0 ? (
                                    incident.officers.map((officer, index) => (
                                        <div key={index}>{officer.officerName}<br /></div>
                                    ))
                                ) : (
                                    <div>No officers assigned</div>
                                )}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Incident Status</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.status}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Incident Date</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.dateCreated}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Incident Detail</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {incident.incidentDetails}
                            </dd>
                        </div>
                    </dl>
                </div>
                <button
                    onClick={downloadPDF}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default IncidentDetail;










