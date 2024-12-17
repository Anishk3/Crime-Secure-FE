import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import StationHeadService from '../Services/StationHeadService'
import "../styles/IncidentSummary.css"


const IncidentSummary = () => {

    const { auth } = useContext(AuthContext)
    const [incident, setIncident] = useState([])

    useEffect(() => {
        console.log("useEffect() Invoked....")
        //console.log(auth.accessToken)
        StationHeadService.getIncidentSummary(auth.accessToken).then((response) => {
            console.log("Response Received From getIncidentSummary() API...", response.data)
            setIncident(response.data)
        }).catch((error) => {
            console.log("Error from API, ", error)
        })
    }, [])


    return (

<div>
    <div>
        <div className="incidentsummary">
            <h2 className="font-extrabold text-gray-800 mb-4 text-center">Incident Summary</h2>
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="head_col-1">Incident Id</div>
                        <div className="head_col-2">Type</div>
                        <div className="head_col-3">Details</div>
                        <div className="head_col-4">Status</div>
                    </li>
                    {incident.map((incident, key) => (
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
                                {incident.incidentStatus}
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Button group for navigation */}
                <div className="flex justify-center gap-4 mt-6">
                    <Link
                        to="/updatestatus"
                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150"
                    >
                        Update Status
                    </Link>
                    <Link
                        to="/getallofficers"
                        className="bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:bg-gray-700 transition duration-150"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>



    )
}

export default IncidentSummary
