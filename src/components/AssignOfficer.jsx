import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import AuthContext from '../context/AuthProvider';
import StationHeadService from '../Services/StationHeadService';
import "../styles/AssignOfficer.css"


const AssignOfficer = () => {
    const { auth } = useContext(AuthContext)
    const [incidents, setIncidents] = useState([]);
    const [availableOfficers, setAvailableOfficers] = useState([]);
    const [selectedOfficers, setSelectedOfficers] = useState({}); // Map incident IDs to selected officer IDs
    const navigate = useNavigate(); // Instance for navigation

    // FETCHING INCIDENTS WITH STATUS INITIATED
    useEffect(() => {
        StationHeadService.getInitiatedIncidents(auth.accessToken).then((response) => {
            console.log("useEffect invoked to fetch initiated incidents......", response.data);
            setIncidents(response.data);
        }).catch((error) => {
            console.log("Error From getInitiatedIncidents() API....", error);
        });
    }, []);

    // FETCHING AVAILABLE OFFICERS
    useEffect(() => {
        StationHeadService.getAvailableOfficersList(auth.accessToken).then((response) => {
            console.log("useEffect invoked to fetch Available Officers...", response.data);
            setAvailableOfficers(response.data);
        }).catch((error) => {
            console.log("Error From getAvailableOfficersList() API....", error);
        });
    }, []);

    const handleOfficerSelect = (incidentId, officerId) => {
        setSelectedOfficers({ ...selectedOfficers, [incidentId]: officerId });
        console.log("handleofficer");

    };

    const handleSave = async () => {
        // Check if all officers are selected before saving
        const allOfficersSelected = incidents.every(incident => selectedOfficers[incident.incidentId]);
        if (!allOfficersSelected) {
            alert('Please select an officer for all incidents.');
            return;
        }

        // Update incident statuses and assign officers in one API call 
        const updatePromises = incidents.map(incident => {
            const officerId = selectedOfficers[incident.incidentId];
            return StationHeadService.assignOfficerToIncident(incident.incidentId, officerId, auth.accessToken)
                .then(() => ({ ...incident, status: 'ACTIVE' })); // Update status in response
        });

        try {
            const updatedIncidents = await Promise.all(updatePromises);
            setIncidents(updatedIncidents);
            alert('Officers assigned and incident statuses updated successfully!');
            navigate('/incidentsummary'); // Redirect to incidentsummary page
        } catch (error) {
            console.error('Error updating incidents:', error);
            alert('Error saving assignments. Please try again.');
        }
    };

    return (
        <div>
            <div>
                <div className="Assignofficer">
                    <h2 className='font-extrabold text-gray-800 mb-2 text-center'>Assign Officer To Incident</h2>
                    <div className="container">
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="head_col-1">Incident ID</div>
                                <div className="head_col-2">Incident Type</div>
                                <div className="head_col-3">Status</div>
                                <div className="head_col-4">Action</div>
                            </li>
                            {incidents.map((incident) => (
                                <li className="table-row">
                                    <div className="col col-1" data-label="officer id">
                                        {incident.incidentId}
                                    </div>
                                    <div className="col col-2" data-label="officerName">
                                        {incident.incidentType}
                                    </div>
                                    <div className="col col-3" data-label="officerDob">
                                        {incident.status}
                                    </div>
                                    <div className="col col-4" data-label="officerPhoneNumber">
                                        {incident.status === 'INITIATED' && (
                                            <div className="relative inline-block">
                                                <div className="dropdown-content flex items-center">
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
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                        onClick={() => handleOfficerSelect(incident.incidentId, '')}
                                                    >
                                                        Assign Officer
                                                    </button>
                                                </div>
                                            </div>
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
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AssignOfficer;


