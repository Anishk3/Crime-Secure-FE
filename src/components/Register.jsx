import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/AuthService'

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pancard, setPancard] = useState('')
  const [aadharcard, setAadharcard] = useState('')
  const [phoneno, setPhoneno] = useState('')
  const [role, setRole] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
  
    if (!username) newErrors.username = "Name is required"
    if (!dob) newErrors.dob = "Date of birth is required"
    if (!email) newErrors.email = "Email is required";
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) newErrors.email = "Enter a valid email address";
    if (!address) newErrors.address = "Address is required"
    if (!phoneno) newErrors.phoneno = "Phone number is required"
    else if (!/^\d{10}$/.test(phoneno)) newErrors.phoneno = "Phone number must be 10 digits"
    if (!aadharcard) newErrors.aadharcard = "Aadhaar number is required"
    else if (!/^\d{12}$/.test(aadharcard)) newErrors.aadharcard = "Aadhaar number must be 12 digits"
    if (!pancard) newErrors.pancard = "PAN card is required"
    if (!password) newErrors.password = "Password is required"
    else if (!/^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/.test(password)) {
      newErrors.password = "Password must be at least 6 characters long, include a symbol and a number"
    }
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required"
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!role) newErrors.role = "Role is required"
  
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const obj = {
      username,
      dob,
      phoneNumber: phoneno,
      address,
      aadhaarNumber: aadharcard,
      pancard,
      email,
      password,
      role,
    }
    console.log("Payload sent to backend", obj)

    AuthService.RegisterUser(obj)
      .then((response) => {
        console.log("Response received from register API", response.data)
        navigate("/login")
      })
      .catch((error) => {
        console.log("Error from register API", error)
      })
  }

  return (
    <div className="register">
      <div className="flex min-h-screen w-full">
        {/* Left Section: Image */}
        <div className="w-3/5 bg-gray-200">
          <img
            src="https://media.istockphoto.com/id/1166697314/photo/detective-board-with-photos-of-suspected-criminals-crime-scenes-and-evidence-with-red-threads.jpg?s=612x612&w=0&k=20&c=1vAd3vZMNpcP4PDBs14Zf5ENILtQrn8Y5K_fePduMOI="
            alt="Crime Board"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Registration Form */}
        <div className="w-2/5 h-full flex flex-col justify-center px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome to Crime-Secure
          </h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            Register your account below
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setPhoneno(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.phoneno && <p className="text-red-500 text-sm">{errors.phoneno}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Aadhaar Card</label>
                <input
                  type="text"
                  placeholder="Aadhaar Number"
                  onChange={(e) => setAadharcard(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.aadharcard && <p className="text-red-500 text-sm">{errors.aadharcard}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PAN Card</label>
                <input
                  type="text"
                  placeholder="PAN Number"
                  onChange={(e) => setPancard(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.pancard && <p className="text-red-500 text-sm">{errors.pancard}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="STATION_HEAD">Station Head</option>
                <option value="CITIZEN">Citizen</option>

              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

            {/* Register Button */}
            <div className="mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
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
