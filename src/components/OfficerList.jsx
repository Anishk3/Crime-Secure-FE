import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import StationHeadService from '../Services/StationHeadService'
import "../styles/OfficerList.css"

const OfficerList = () => {
    const {auth} = useContext(AuthContext)

    const [officers, setOfficers] = useState([])
    const[deleteStatus, setDeleteStatus] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        console.log("useEffect invoked.....")
        console.log(auth.accessToken)
        StationHeadService.getAllOfficers(auth.accessToken).then((response)=>{
            console.log("Response from getAllOfficers API..", response.data)
            setOfficers(response.data)
        }).catch((error)=>{console.log("Error from API", error)})
    },[deleteStatus])

    const deleteOfficer = (id) =>{
        console.log("Officer ID received in Delete Handler: " + id);
        StationHeadService.deleteOfficer(id,auth.accessToken).then((response)=>{
            console.log("response from delete Api ", response.data)
            setDeleteStatus(!deleteStatus)
            navigate("/officerlist")
        }).catch((error)=>{
            console.log("Error From Delete API ", error)
        })
    }
  return (
    <div>
        <div className="Officerlist">
            <h2 className='font-extrabold text-gray-800 mb-2 text-center'>Officer List</h2>
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="head_col-1">Id</div>
                        <div className="head_col-2">Name</div>
                        <div className="head_col-3">DOB</div>
                        <div className="head_col-4">PhoneNo.</div>
                        <div className="head_col-5">Address</div>
                        <div className="head_col-6">AadhaarNo.</div>
                        <div className="head_col-8">Email</div>
                        {/* <div className="head_col-7">PancardNo.</div> */}
                        <div className="head_col-9">Action</div>
                    </li>
                    {officers.map((officer, index) => (
                        <li className="table-row">
                            <div className="col col-1" data-label="officer id">
                                {index+1}
                            </div>
                            <div className="col col-2" data-label="officerName">
                                {officer.officerName}
                            </div>
                            <div className="col col-3" data-label="officerDob">
                                {officer.officerDob}
                            </div>
                            <div className="col col-4" data-label="officerPhoneNumber">
                                {officer.officerPhoneNumber}
                            </div>
                            <div className="col col-5" data-label="officerAddress">
                                {officer.officerAddress}
                            </div>
                            <div className="col col-6" data-label="officerAadhaarNumber">
                                {officer.officerAadhaarNumber}
                            </div>
                            <div className="col col-8" data-label="officerEmail">
                                {officer.officerEmail}
                            </div>
                            {/* <div className="col col-7" data-label="officerPancard">
                                {officer.officerPancard}
                            </div> */}
                                <div className='col-9'>
                            <button className="col_btn " onClick={() => deleteOfficer(officer.id)} data-label="Payment Status">
                                    Delete
                            </button>
                                </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center gap-4 mt-6">
            <Link to="/addofficer" className='bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:bg-gray-700 transition duration-150'>Add Officer</Link>
            <Link to="/assignofficer" className='bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150 '>Assign Officer To Incident</Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OfficerList