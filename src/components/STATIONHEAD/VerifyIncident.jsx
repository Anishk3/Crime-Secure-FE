    import React, { useState, useEffect, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import AuthContext from '../../context/AuthProvider.jsx';
    import StationHeadService from '../../Services/StationHeadService.jsx';
    import "../../styles/VerifyIncident.css";
    import Navbar from './StationheadNavbar.jsx';

    const VerifyIncident = () => {
        const { auth } = useContext(AuthContext);
        const [incidents, setIncidents] = useState([]);
        const [isUpdated, setIsUpdated] = useState(false);
        const navigate = useNavigate();

        // Fetch all incidents with CLOSED status
        useEffect(() => {
            StationHeadService.getClosedIncidents(auth.accessToken)
                .then((response) => {
                    console.log("UseEffect invoked",response.data);
                    
                    setIncidents(response.data);
                })
                .catch((error) => {
                    console.error("Error from getClosedIncidents() API...", error);
                });
        }, [isUpdated]);

        // Handler for VERIFY STATUS button
        const verifyStatusHandler = (incidentId) => {
            setIncidents((prevIncidents) =>
                prevIncidents.map((incident) =>
                    incident.incidentId === incidentId
                        ? { ...incident, status: "VERIFIED" }
                        : incident
                )
            );
        };

        // Filter for verified incidents
        const verifiedIncidents = incidents.filter(
            (incident) => incident.status === "VERIFIED"
        );

        // Handler for SAVE CHANGES button
        const updateStatusHandler = async () => {
            if (verifiedIncidents.length === 0) {
                alert("No CLOSED incidents to update.");
                navigate("/incidentsummary");
                return;
            }

            try {
                const response = await StationHeadService.updateStatusClosedToVerify(
                    auth.accessToken,
                    verifiedIncidents
                );
                alert("Status updated successfully!");
                navigate("/incidentsummary");
            } catch (error) {
                console.error("Error from updateStatusClosedToVerify() API...", error);
            }
        };

        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        return (
            <div>
                <Navbar/>
                <div className="VerifyIncident">
                    <h2 className="font-extrabold text-gray-800 mb-2 text-center">
                        Verify Incidents
                    </h2>
                    <div className="container">
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="head_col-1">Incident Id</div>
                                <div className="head_col-2">Type</div>
                                <div className="head_col-3">Incident Date</div>
                                <div className="head_col-4">Details</div>
                                <div className="head_col-5">Status</div>
                                <div className="head_col-6">Action</div>
                            </li>
                            {incidents.map((incident, key) => (
                                <li className="table-row" key={key}>
                                    <div className="col col-1" data-label="Incident id">
                                        {incident.incidentId}
                                    </div>
                                    <div className="col col-2" data-label="incidentType">
                                        {incident.incidentType}
                                    </div>
                                    <div className="col col-3" data-label="incident dateCreated">
                                        {formatDate(incident.dateCreated)}
                                    </div>
                                    <div className="col col-4" data-label="incidentDetails">
                                        {incident.incidentDetails}
                                    </div>
                                    <div className="col col-5" data-label="incidentStatus">
                                        {incident.status}
                                    </div>
                                    <div
                                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150 col col-6"
                                        data-label="verifyIncident"
                                        onClick={() => verifyStatusHandler(incident.incidentId)}
                                    >
                                        VERIFY STATUS
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center items-center h-40">
                            <button
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150"
                                onClick={updateStatusHandler}
                            >
                                SAVE CHANGES
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default VerifyIncident;






