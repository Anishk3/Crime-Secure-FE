import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import StationHeadService from '../Services/StationHeadService';
import "../styles/VerifyIncident.css"

const VerifyIncident = () => {
    const { auth } = useContext(AuthContext)
    const [incidents, setIncidents] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    //TO FETCH ALL INCIDENTS WITH STATUS TYPE CLOSED
    useEffect(() => {
        StationHeadService.getClosedIncidents(auth.accessToken).then(response => {
            console.log("useEffect invoked for fetching CLOSED STATUS incidents......", response.data)
            setIncidents(response.data);
        }).catch(error => {
            console.error("Error from getClosedIncidents() API...", error);
        });
    }, [isUpdated]);

    const updateStatusHandler = async () => {
        try {
            console.log("Inside updateStatusHandler()......");
            const response = await StationHeadService.updateStatusClosedToVerify(auth.accessToken);
            console.log('Incident statuses updated successfully:', response.data);
    
            setIsUpdated(true);
            console.log("useEffect invoked again....")
            navigate('/incidentsummary');
        } catch (error) {
            console.error('Error from updateStatusClosedToVerify() API....', error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate); // Parse the ISO string to a Date object
        const day = String(date.getDate()).padStart(2, '0'); // Extract and pad day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Extract and pad month (Months are zero-indexed)
        const year = date.getFullYear(); // Extract year
        return `${day}-${month}-${year}`; // Return formatted date
    };
    
  return (
    <div>
    <div>
        <div className="VerifyIncident  ">
            <h2 className='font-extrabold text-gray-800 mb-2 text-center'>Verify Incidents</h2>
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="head_col-1">Incident Id</div>
                        <div className="head_col-2">Type</div>
                        <div className="head_col-3">Incident Date</div>
                        <div className="head_col-4">Details</div>
                        <div className="head_col-5">Status</div>
                    </li>
                    {incidents.map((incident, key) => (
                        <li className="table-row">
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
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center items-center h-40">
                <button 
    className="bg-blue-500 text-white font-semibold py-2 px-4  rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150" 
    onClick={updateStatusHandler}
>
    Change Status of All to Verified
</button>

            </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default VerifyIncident