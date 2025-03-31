import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.jsx';
import StationHeadService from "../../Services/StationHeadService.jsx";
import "../../styles/AssignOfficer.css";
import Navbar from './StationheadNavbar.jsx';

const AssignOfficer = () => {
    const { auth } = useContext(AuthContext);
    const [incidents, setIncidents] = useState([]);
    const [availableOfficers, setAvailableOfficers] = useState([]);
    const [selectedOfficers, setSelectedOfficers] = useState({});
    const navigate = useNavigate();

    // Fetch incidents with status 'INITIATED'
    useEffect(() => {
        StationHeadService.getInitiatedIncidents(auth.accessToken)
            .then((response) => {
                console.log("UseEffect invoked", response.data);
                setIncidents(response.data);
            })
            .catch((error) => console.error("Error fetching incidents:", error));
    }, [auth.accessToken]);

    // Fetch available officers
    useEffect(() => {
        StationHeadService.getAllOfficers(auth.accessToken)
            .then((response) => {
                console.log("UseEffect invoked for get officers", response.data);
                setAvailableOfficers(response.data);
            })
            .catch((error) => console.error("Error fetching officers:", error));
    }, [auth.accessToken]);

    const handleOfficerSelect = (incidentId, officerId) => {
        setSelectedOfficers((prev) => ({ ...prev, [incidentId]: officerId }));
    };

    const handleSave = async () => {
        if (incidents.length === 0) {
            alert('No incidents to assign officers.');
            navigate('/officerlist');
            return;
        }

        const allOfficersSelected = incidents.every((incident) =>
            selectedOfficers[incident.incidentId]
        );

        if (!allOfficersSelected) {
            alert('Please select an officer for all incidents.');
            return;
        }

        try {
            const updatedIncidents = await Promise.all(
                incidents.map((incident) => {
                    const officerId = selectedOfficers[incident.incidentId];
                    return StationHeadService.assignOfficerToIncident(
                        incident.incidentId,
                        officerId,
                        auth.accessToken
                    ).then(() => ({
                        ...incident,
                        status: 'ACTIVE',
                    }));
                })
            );

            setIncidents(updatedIncidents);
            alert('Officers assigned and incident statuses updated successfully!');
            navigate('/incidentsummary');
        } catch (error) {
            console.error("Error updating incidents:", error);
            alert('Error saving assignments. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="Assignofficer">
                <h2 className="font-extrabold text-gray-800 mb-2 text-center">
                    Assign Officer To Incident
                </h2>
                <div className="container">
                    {incidents.length === 0 ? (
                        <div className="no-records">
                            <p className="text-center text-gray-600 text-lg font-medium">
                                No initiated records found.
                            </p>
                        </div>
                    ) : (
                        <>
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="head_col-1">Incident ID</div>
                                    <div className="head_col-2">Incident Type</div>
                                    <div className="head_col-3">Status</div>
                                    <div className="head_col-4">Action</div>
                                </li>
                                {incidents.map((incident) => (
                                    <li key={incident.incidentId} className="table-row">
                                        <div className="col col-1" data-label="Incident ID">
                                            {incident.incidentId}
                                        </div>
                                        <div className="col col-2" data-label="Incident Type">
                                            {incident.incidentType}
                                        </div>
                                        <div className="col col-3" data-label="Status">
                                            {incident.status}
                                        </div>
                                        <div className="col col-4" data-label="Action">
                                            {incident.status === 'INITIATED' && (
                                                <select
                                                    className="ml-2 w-32 p-2 border rounded-md"
                                                    value={selectedOfficers[incident.incidentId] || ''}
                                                    onChange={(e) => handleOfficerSelect(incident.incidentId, e.target.value)}
                                                >
                                                    <option value="">Select Officer</option>
                                                    {availableOfficers.map((officer) => (
                                                        <option key={officer.id} value={officer.id}>
                                                            {officer.officerName}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-center items-center h-20">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-green-700 transition duration-150"
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignOfficer;
