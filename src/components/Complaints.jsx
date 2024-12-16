import React, { useContext, useEffect, useState } from 'react'
import "../styles/Complaints.css"
import CitizenService from '../Services/CitizenService'
import AuthContext from '../context/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom'

function Complaints() {
    const navigate = useNavigate()
    const [complaint, setComplaint] = useState([])
    const { auth } = useContext(AuthContext)


    
    useEffect(() => {
        console.log(auth.accessToken);
        console.log(auth.id);
        
        
        CitizenService.getAllIncidents(auth.id, auth.accessToken).then(response => {
            console.log("response", response.data);
            
            setComplaint(response.data)
            console.log("response received from getAllIncidents", response.data);
            
        })
    }, [])

    const handleSubmit = (id) =>{
        navigate("/details/"+ id)
    }
    return (
        <div className="Mycomplaint ">
            <h2 className='font-extrabold text-gray-800 mb-2 text-center'>My Complaints</h2>
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="topic1">Incident Id</div>
                        <div className="head_col-2">Incident type</div>
                        <div className="head_col-3">Officer Assigned</div>
                        <div className="head_col-4">Incident Status</div>
                        <div className="head_col-5">Details</div>
                    </li>
                    {complaint.map((complaint,index) => (
                        <li className="table-row">
                            <div className="col col-1" data-label="Incident Id">
                                {index+1}
                            </div>
                            <div className="col col-2" data-label="Incident type">
                                {complaint.incidentType}
                            </div>
                            <div className="col col-3" data-label="Officer Name">
                                {complaint.officers && complaint.officers.length > 0 ? (
                                    complaint.officers.map((officer, index) => (
                                        <div key={index}>{officer.officerName}<br/></div>
                                    ))
                                ) : (
                                    <div>No officers assigned</div>
                                )}</div>
                            <div className="col col-4" data-label="Incident Status">
                                {complaint.status}
                            </div>
                            <button className="col_btn flex items-center justify-center" onClick={()=>handleSubmit(complaint.incidentId)} data-label="Payment Status">
                                <a className='flex items-center justify-center'>
                                    View Details
                                </a>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Complaints







