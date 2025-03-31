import React, { useContext, useEffect, useState } from 'react';
import "../../styles/Complaints.css";
import AuthContext from '../../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from './CitizenNavbar.jsx';
import CitizenService from '../../Services/CitizenService.jsx';

function Complaints() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const { auth } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchStatus, setSearchStatus] = useState(""); // State for search input
    const complaintsPerPage = 5;

    useEffect(() => {
        console.log("useEffect() Invoked...");
        CitizenService.getAllIncidents(auth.id, auth.accessToken).then(response => {
            console.log("Response Received From getAllIncidents() API..", response.data);
            setComplaints(response.data);
        });
    }, [auth.id, auth.accessToken]);

    const handleSubmit = (id) => {
        console.log("Inside View Details Handler...");
        navigate("/details/" + id);
    };

    const handleSearch = (e) => {
        setSearchStatus(e.target.value);
    };

    // Filter complaints based on search status input
    const filteredComplaints = complaints.filter(complaint =>
        complaint.status.toLowerCase().includes(searchStatus.toLowerCase())
    );

    // Pagination logic
    const indexOfLastComplaint = currentPage * complaintsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
    const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredComplaints.length / complaintsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxPageNumbers = 4;
    let startPage, endPage;

    if (pageNumbers.length <= maxPageNumbers) {
        startPage = 1;
        endPage = pageNumbers.length;
    } else {
        if (currentPage <= Math.ceil(maxPageNumbers / 2)) {
            startPage = 1;
            endPage = maxPageNumbers;
        } else if (currentPage + Math.floor(maxPageNumbers / 2) >= pageNumbers.length) {
            startPage = pageNumbers.length - maxPageNumbers + 1;
            endPage = pageNumbers.length;
        } else {
            startPage = currentPage - Math.floor(maxPageNumbers / 2);
            endPage = currentPage + Math.floor(maxPageNumbers / 2);
        }
    }

    const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

    return (
        <div className="Mycomplaint">
            {console.log("App Rendered..")}
            <Navbar />
            <h2 className='mt-20 font-extrabold text-gray-800 mb-2 text-center'>My Complaints</h2>

            <div className="container">
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Status..."
                        value={searchStatus}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                </div>

                <ul className="responsive-table">
                    <li className="table-header">
                        <div>Incident Id</div>
                        <div>Incident type</div>
                        <div>Officer Assigned</div>
                        <div>Incident Status</div>
                        <div>Details</div>
                    </li>
                    {currentComplaints.map((complaint, index) => (
                        <li className="table-row" key={complaint.incidentId}>
                            <div>{indexOfFirstComplaint + index + 1}</div>
                            <div>{complaint.incidentType}</div>
                            <div>
                                {complaint.officers?.length > 0
                                    ? complaint.officers.map((officer) => (
                                        <div key={officer.officerId}>{officer.officerName}</div>
                                    ))
                                    : "No officers assigned"}
                            </div>
                            <div>{complaint.status}</div>
                            <button className="col_btn" onClick={() => handleSubmit(complaint.incidentId)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                <nav>
                    <ul className="pagination">
                        {currentPage > Math.ceil(maxPageNumbers / 2) && pageNumbers.length > maxPageNumbers && (
                            <li className="page-item">
                                <button onClick={() => paginate(1)} className="page-link">
                                    &lt;&lt;
                                </button>
                            </li>
                        )}
                        {currentPage > Math.ceil(maxPageNumbers / 2) && pageNumbers.length > maxPageNumbers && (
                            <li className="page-item">
                                <button onClick={() => paginate(currentPage - 1)} className="page-link">
                                    &lt;
                                </button>
                            </li>
                        )}
                        {visiblePageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button
                                    onClick={() => paginate(number)}
                                    className={`page-link ${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        {currentPage + Math.floor(maxPageNumbers / 2) < pageNumbers.length && pageNumbers.length > maxPageNumbers && (
                            <li className="page-item">
                                <button onClick={() => paginate(currentPage + 1)} className="page-link">
                                    &gt;
                                </button>
                            </li>
                        )}
                        {currentPage + Math.floor(maxPageNumbers / 2) < pageNumbers.length && pageNumbers.length > maxPageNumbers && (
                            <li className="page-item">
                                <button onClick={() => paginate(pageNumbers.length)} className="page-link">
                                    &gt;&gt;
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Complaints;