import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.jsx'; 
import OfficerService from '../../Services/OfficerService.jsx'; 
import '../../styles/OfficerIncidents.css'
import Navbar from './OfficerNavbar.jsx';

const OfficerIncidents = () => {
  const [assignedIncidents, setAssignedIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch incidents
    const fetchIncidents = async () => {
      try {
        const response = await OfficerService.getAssignedIncidents(auth.accessToken); 
        console.log("UseEffect invoked",response.data);
        
        setAssignedIncidents(response.data); 
        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [auth.accessToken]); 


  if (loading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="officerincidents">
      <Navbar/>
      <h2 className="font-extrabold text-gray-800 mb-4 text-center">Assigned Incidents</h2>

      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="head_col-1">Incident Id</div>
            <div className="head_col-2">Type</div>
            <div className="head_col-3">Details</div>
            <div className="head_col-4">Status</div>
          </li>
          {assignedIncidents.map((incident, key) => (
            <li key={key} className="table-row">
              <div className="col col-1" data-label="Incident id">
                {incident.incidentId}
              </div>
              <div className="col col-2" data-label="Incident Type">
                {incident.incidentType}
              </div>
              <div className="col col-3" data-label="Details">
                {incident.incidentDetails}
              </div>
              <div className="col col-4" data-label="Status">
                {incident.status}
              </div>
            </li>
          ))}
        </ul>

        {/* Button group for navigation */}
        <div className="flex justify-center gap-4 mt-6 py-6">
          <button
            onClick={() => navigate('/updatestatustoclosed')}
            className="bg-blue-500 text-white font-semibold bottom-5 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150 ">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficerIncidents;



