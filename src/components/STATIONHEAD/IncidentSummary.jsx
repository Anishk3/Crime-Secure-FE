import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.jsx';
import StationHeadService from '../../Services/StationHeadService.jsx';
import "../../styles/IncidentSummary.css";
import Navbar from './StationheadNavbar.jsx';

const IncidentSummary = () => {
    const { auth } = useContext(AuthContext);
    const [incidents, setIncidents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRows, setExpandedRows] = useState({});
    const incidentsPerPage = 5;

    useEffect(() => {
        if (auth.accessToken) {
            StationHeadService.getIncidentSummary(auth.accessToken)
                .then((response) => {
                    setIncidents(response.data);
                })
                .catch((error) => {
                    console.log("Error from API: ", error);
                });
        }
    }, [auth.accessToken]);

    const toggleExpand = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const totalPages = Math.max(1, Math.ceil(incidents.length / incidentsPerPage));
    const indexOfLastIncident = currentPage * incidentsPerPage;
    const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
    const currentIncidents = incidents.slice(indexOfFirstIncident, indexOfLastIncident);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="incidentsummary">
                <h2 className="mt-7 font-extrabold text-gray-800 mb-4 text-center">Incident Summary</h2>
                <div className="container">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="head_col-1">Incident Id</div>
                            <div className="head_col-2">Type</div>
                            <div className="head_col-3">Details</div>
                            <div className="head_col-4">Status</div>
                        </li>
                        {currentIncidents.map((incident) => (
                            <li key={incident.incidentId} className="table-row">
                                <div className="col col-1" data-label="Incident id">{incident.incidentId}</div>
                                <div className="col col-2" data-label="Incident Type">{incident.incidentType}</div>
                                <div className="col col-3" data-label="Details">
                                    {expandedRows[incident.incidentId] ? (
                                        <>
                                            {incident.incidentDetails} 
                                            <span className="show-less" onClick={() => toggleExpand(incident.incidentId)}>less</span>
                                        </>
                                    ) : (
                                        <>
                                            {incident.incidentDetails.length > 50 
                                                ? `${incident.incidentDetails.substring(0, 50)}... `
                                                : incident.incidentDetails}
                                            {incident.incidentDetails.length > 50 && (
                                                <span className="show-more" onClick={() => toggleExpand(incident.incidentId)}>Show more</span>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="col col-4" data-label="Status">{incident.incidentStatus}</div>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Pagination */}
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(1)} className="page-link">«</button>
                            </li>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage - 1)} className="page-link">‹</button>
                            </li>
                            {[...Array(totalPages).keys()].map(page => (
                                <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(page + 1)} className="page-link">{page + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(currentPage + 1)} className="page-link">›</button>
                            </li>
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button onClick={() => paginate(totalPages)} className="page-link">»</button>
                            </li>
                        </ul>
                    </nav>
                    
                    <div className="flex justify-center gap-4 mt-6">
                        <Link to="/updatestatus" className="bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600">Update Status</Link>
                        <Link to="/officerlist" className="bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-gray-600">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentSummary;
