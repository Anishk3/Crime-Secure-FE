import React, { useContext, useEffect, useState } from 'react'
import "../styles/IncidentDetails.css"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import CitizenService from '../Services/CitizenService'
import AuthContext from '../context/AuthProvider'



const IncidentDetail = () => {

    const [incident,setIncident] = useState(" ")
    const {id} = useParams()
    const {auth} = useContext(AuthContext)

    useEffect(()=>{
        console.log(auth.id);
        console.log(id);
        

        CitizenService.getIncidentById(auth.id,id,auth.accessToken).then((response)=>{
            setIncident(response.data)
        }).catch((error)=>{
            console.log("error from getIncidentById api",error);
            
        })
    },[])

    return (
        <div className="incidentbg h-screen ">
            <div className="incident">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">Applicant Information</h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.username}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Application for</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.incidentType}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Officers Assigned</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.officers && incident.officers.length > 0?(
                                incident.officers.map((officer,index) =>(
                                    <div key={index}>{officer.officerName}<br/></div>
                                ))
                            ):(
                                <div>No officers assigned</div>
                            )}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Incident Status</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.status}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Incident Date</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{incident.dateCreated}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Incident Detail</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {incident.incidentDetails}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">    
                                                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                <span className="shrink-0 text-gray-400">2.4mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default IncidentDetail