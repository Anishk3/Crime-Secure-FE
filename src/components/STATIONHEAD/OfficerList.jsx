import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.jsx';
import StationHeadService from '../../Services/StationHeadService.jsx';
import "../../styles/OfficerList.css";
import Navbar from './StationheadNavbar.jsx';

const OfficerList = () => {
    const { auth } = useContext(AuthContext);
    const [officers, setOfficers] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const officersPerPage = 5;

    useEffect(() => {
        console.log("useEffect Invoked...");
        StationHeadService.getAllOfficers(auth.accessToken)
            .then((response) => {
                console.log("Response Received From getAllOfficers() API...", response.data);
                setOfficers(response.data);
            })
            .catch((error) => {
                console.log("Error from API", error);
            });
    }, [deleteStatus]);

    const deleteOfficer = (id) => {
        StationHeadService.deleteOfficer(id, auth.accessToken)
            .then(() => {
                setDeleteStatus(!deleteStatus);
                alert("Officer Removed Successfully.");
            })
            .catch((error) => {
                console.log("Error From Delete API", error);
                if (error.response && error.response.status === 500) {
                    alert("This officer is assigned to an incident and cannot be removed.");
                } else {
                    alert("An error occurred while removing the officer. Please try again.");
                }
            });
    };

    // Pagination logic
    const indexOfLastOfficer = currentPage * officersPerPage;
    const indexOfFirstOfficer = indexOfLastOfficer - officersPerPage;
    const currentOfficers = officers.slice(indexOfFirstOfficer, indexOfLastOfficer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(officers.length / officersPerPage); i++) {
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
        <div>
            {console.log("App Rendered...")}
            <Navbar />
            <div className="Officerlist">
                <h2 className='font-extrabold text-gray-800 mb-2 text-center'>Officer List</h2>
                <div className="container">
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Phone No.</th>
                                <th>Address</th>
                                <th>Aadhaar No.</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOfficers.map((officer, index) => (
                                <tr key={officer.id}>
                                    <td>{indexOfFirstOfficer + index + 1}</td>
                                    <td>{officer.officerName}</td>
                                    <td>{officer.officerDob}</td>
                                    <td>{officer.officerPhoneNumber}</td>
                                    <td>{officer.officerAddress}</td>
                                    <td>{officer.officerAadhaarNumber}</td>
                                    <td>{officer.officerEmail}</td>
                                    <td>
                                        <button className="col_btn" onClick={() => deleteOfficer(officer.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
        </div>
    );
};

export default OfficerList;