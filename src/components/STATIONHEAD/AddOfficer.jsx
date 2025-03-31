import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider.jsx'
import StationHeadService from '../../Services/StationHeadService.jsx'
import Navbar from './StationheadNavbar.jsx'


const AddOfficer = () => {
  const { auth } = useContext(AuthContext);
  const [username, setUserName] = useState("")
  const [dob, setDob] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [pancard, setPancard] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    console.log("Inside validateForm() Handler..")
    const newErrors = {};

    if (!username) newErrors.username = "Name is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) newErrors.email = "Enter a valid email address";
    
    if (!address) newErrors.address = "Address is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits";
    
    if (!aadhaarNumber) newErrors.aadhaarNumber = "Aadhaar number is required";
    else if (!/^\d{12}$/.test(aadhaarNumber)) newErrors.aadhaarNumber = "Aadhaar number must be 12 digits"
    
    if (!pancard) newErrors.pancard = "PAN card is required";
    if (!password) newErrors.password = "Password is required";
    else if (!/^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/.test(password)) {
      newErrors.password = "Password must be at least 6 characters long, include a symbol and a number";
    }
    
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (!role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOfficer = (e) => {
    console.log("Inside saveOfficer() Handler....")
    e.preventDefault();
    if (!validateForm()) return;

    const officer = {
      username,
      dob,
      phoneNumber,
      address,
      aadhaarNumber,
      pancard,
      email,
      password,
      role,
    };

    StationHeadService.addOfficer(officer, auth.accessToken).then((response) => {
      console.log("Response Received From addOfficer() API..", response.data)
      alert('Officer Added Successfully');
      navigate("/officerlist");
    }).catch((error) => {
      console.error('Error From addOfficer() API:', error);
    });
  };


return (
    <div className="register">
      {console.log("App Rendered...")}
      <Navbar/>
    <div className="flex min-h-screen w-full}"> {/* Ensure the page takes full screen height */}
      {/* Left Section: Image */}
      <div className="w-3/5 bg-gray-200">
        <img
          src="https://media.istockphoto.com/id/1166697314/photo/detective-board-with-photos-of-suspected-criminals-crime-scenes-and-evidence-with-red-threads.jpg?s=612x612&w=0&k=20&c=1vAd3vZMNpcP4PDBs14Zf5ENILtQrn8Y5K_fePduMOI="
          alt="Crime Board"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="mt-7 w-2/5 h-full flex flex-col justify-center px-8 "> {/* Full height form */}
        <h1 className="mt-7 text-3xl font-bold text-gray-800 mb-2 text-center">
          <br/>
          Welcome to Crime-Secure
        </h1>
        <p className="text-lg text-gray-600 mb-4 text-center">
          Register New Officer Below
        </p><br/>

        <div action="#" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="-mt-2 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e)=>{setUserName(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div>
              <label className="-mt-2 block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                placeholder="Date of Birth"
                onChange={(e)=>{setDob(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e)=>{setPhoneNumber(e.target.value)}}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhaar Card</label>
              <input
                type="text"
                placeholder="Aadhaar Number"
                onChange={(e)=>{setAadhaarNumber(e.target.value)}}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.aadhaarNumber && <p className="text-red-500 text-sm">{errors.aadhaarNumber}</p>}
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
              {errors.pancard && <p className="text-red-500 text-sm">{errors.pancard}</p>}
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
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
              <option value="OFFICER">Officer</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          {/* Register Button */}
          <div className="mt-4">
            <button
              type="submit"
              onClick={(e)=>{saveOfficer(e)}}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>
            <p/><br/>
          </div>
        </div>
      </div>
    </div>
    </div>
  
)
}

export default AddOfficer