import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import CitizenService from '../Services/CitizenService';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';

const Login = () => {

  const navigate = useNavigate()
  const {setAuth} = useContext(AuthContext)
  const [username,setUsername]= useState('')
  const [password,setPassword]= useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("credentials received from form",username+password)
    const obj ={"username":username,"password":password}
    setUsername("")
    setPassword("")
    AuthService.loginUser(obj).then(response=>{
        console.log("response received from login api",response.data);
        const accessToken=response.data.accessToken
        const username=response.data.userDto.username
        const id = response.data.userDto.id
        const email = response.data.userDto.email
        const role=response.data.userDto.role
        setAuth({username,role,accessToken,id,email})

        navigate("/home")
    })
}

  return (
    <div className="flex h-full w-full">
      {/* Left Section: Image */}
      <div className="w-10/12 bg-gray-200">
        <img
          src="https://media.istockphoto.com/id/1166697314/photo/detective-board-with-photos-of-suspected-criminals-crime-scenes-and-evidence-with-red-threads.jpg?s=612x612&w=0&k=20&c=1vAd3vZMNpcP4PDBs14Zf5ENILtQrn8Y5K_fePduMOI="
          alt="Crime Board"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section: Login Form */}
      <div className="w-2/5 bg-white flex flex-col justify-center px-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Login to Crime Management Service
        </p>
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              onChange={(e)=>{setUsername(e.target.value)}}
              value={username}
              required
              id="username"
              name="username"
              placeholder="Username"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
 
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <a href="/" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Login
          </button>
        </div>
        <p className="mt-8 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up now
          </a>
        </p>
      </div>

    </div>
  );
};

export default Login;
