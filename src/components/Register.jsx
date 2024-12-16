import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/AuthService'

function Register() {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [pancard,setPancard] = useState('')
  const [aadharcard,setAadharcard] = useState('')
  const [phoneno,setPhoneno]= useState('')
  const [role,setRole] = useState('')
  const [dob,setDob] = useState('')
  const [email,setEmail] = useState('')
  const [address,setAddress] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault()
    const obj = {  
      "username": username,
      "dob": dob,
      "phoneNumber": phoneno,
      "address": address,
      "aadhaarNumber": aadharcard,
      "pancard": pancard,
      "email": email,
      "password": password,
      "role" : role 
    }
    console.log("payload sent to backend",obj);
    
    AuthService.RegisterUser(obj).then(response=>{
      console.log("response received from register api",response.data);
      navigate("/")
      
    }).catch(error =>{
      console.log("error from register api",error);
      
    })
    
  } 

  return (
    <div className="register">
    <div className="flex min-h-screen w-full"> {/* Ensure the page takes full screen height */}
      {/* Left Section: Image */}
      <div className="w-3/5 bg-gray-200">
        <img
          src="https://media.istockphoto.com/id/1166697314/photo/detective-board-with-photos-of-suspected-criminals-crime-scenes-and-evidence-with-red-threads.jpg?s=612x612&w=0&k=20&c=1vAd3vZMNpcP4PDBs14Zf5ENILtQrn8Y5K_fePduMOI="
          alt="Crime Board"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-2/5 h-full flex flex-col justify-center px-8 "> {/* Full height form */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome to Crime-Secure
        </h1>
        <p className="text-lg text-gray-600 mb-4 text-center">
          Register your account below
        </p>

        <div action="#" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e)=>{setUsername(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                placeholder="Date of Birth"
                onChange={(e)=>{setDob(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e)=>{setEmail(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="address"
              placeholder="Address"
              onChange={(e)=>{setAddress(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e)=>{setPhoneno(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhaar Card</label>
              <input
                type="text"
                placeholder="Aadhaar Number"
                onChange={(e)=>{setAadharcard(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN Card</label>
              <input
                type="text"
                placeholder="PAN Number"
                onChange={(e)=>{setPancard(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e)=>{setPassword(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
            onChange={(e)=>{setRole(e.target.value)}}
            value={role}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value=""  disabled selected>
                Select your role
              </option>
              <option value="STATION_HEAD">Station Head</option>
              <option value="CITIZEN">Citizen</option>
            </select>
          </div>

          {/* Register Button */}
          <div className="mt-4">
            <button
              type="submit"
              onClick={(e)=>{handleSubmit(e)}}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register