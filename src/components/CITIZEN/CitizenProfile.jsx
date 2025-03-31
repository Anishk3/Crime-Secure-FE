import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthProvider';
import CitizenService from '../../Services/CitizenService';
import { PhotoIcon } from '@heroicons/react/24/solid';
import "../../styles/CitizenProfile.css"
import Navbar from './CitizenNavbar';
import { useNavigate } from 'react-router-dom';

const CitizenProfile = () => {
  const navigate = useNavigate()
    const { auth } = useContext(AuthContext);
    const [citizen, setCitizen] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [updatedData, setUpdatedData] = useState({
      Name: '',
      email: '',
      phoneNumber: '',
      address: '',
      dob: '',
      password: ''
    });
    const [file, setFile] = useState(null);  // State for file upload
  
    useEffect(() => {
      CitizenService.getCitizen(auth.id, auth.accessToken)
        .then(response => {
          console.log("response from getCitizen", response.data);
          setCitizen(response.data);
          setUpdatedData({
            Name: response.data.name,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            address: response.data.address,
            dob: response.data.dob,
            password: response.data.password
  
          });
  
          // Check if the profile image is returned as a byte array
          if (response.data.profileImage) {
            CitizenService.getProfileImage(auth.accessToken,auth.id).then(response=>{
              console.log("response from getprofile ",response.data);
              const blob = response.data;
              const url = URL.createObjectURL(blob); // Generate URL from Blob
              setImagePreview(url); // Set image preview
  
              
            })
  
            // setImagePreview(url);  // Set the image preview URL
            // console.log(url);  // Check the Blob URL
          }
        });
    }, [auth]);
  
    const handleImageChange = (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
        setFile(file);  // Store the selected file
      }
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUpdatedData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Prepare FormData for the API request
      const formData = new FormData();
      formData.append('id', auth.id);
      formData.append('Name', updatedData.Name);
      formData.append('email', updatedData.email);
      formData.append('phoneNumber', updatedData.phoneNumber);
      formData.append('address', updatedData.address);
      formData.append('password', updatedData.password);
      if (file) formData.append('profileImage', file); // Append the file if present
  
      CitizenService.updateCitizen(auth.accessToken, formData)
        .then(response => {
          window.alert("Your data has been updated")
          console.log('Profile updated successfully', response);
          navigate("/login")
        })
        .catch(error => {
          console.error('Error updating profile', error);
        });
    };
  
    useEffect(() => {
      // Clean up Blob URL when component is unmounted or imagePreview changes
      if (imagePreview) {
        return () => {
          URL.revokeObjectURL(imagePreview);
        };
      }
    }, [imagePreview]);
  
    if (!citizen) return <div>Loading...</div>;  // Display loading state until data is fetched
  return (
    <div className="CitizenProfile overflow-x-hidden">
        <Navbar/>
         <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full bg-gray-200 border border-gray-300 shadow-sm overflow-hidden"
              style={{ backgroundImage: `url(${imagePreview})`, backgroundSize: "cover" }}
            ></div>
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-500 cursor-pointer transition-all"
            >
              <PhotoIcon className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a profile picture</p>
        </div>

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly, so be careful what you share.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="id" className="block text-sm/6 font-medium text-gray-900">
                  User Id
                </label>
                <div className="mt-2">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    autoComplete=""
                    readOnly
                    value={auth.id}  // Populate with data
                    className="block w-full rounded-md bg-gray-200 text-gray-900 px-3 py-1.5 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* First Name Input */}
              <div className="sm:col-span-3">
                <label htmlFor="stationheadName" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="Name"
                    name="Name"
                    type="text"
                    autoComplete="given-name"
                    value={updatedData.Name}  // Populate with data
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Email Address Input */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={updatedData.email}  // Populate with data
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="id" className="block text-sm/6 font-medium text-gray-900">
                  DOB
                </label>
                <div className="mt-2">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    autoComplete=""
                    readOnly
                    value={updatedData.dob}  // Populate with data
                    className="block w-full rounded-md bg-gray-200 text-gray-900 px-3 py-1.5 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="id" className="block text-sm/6 font-medium text-gray-900">
                  Role
                </label>
                <div className="mt-2">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    autoComplete=""
                    readOnly
                    value={auth.role}  // Populate with data
                    className="block w-full rounded-md bg-gray-200 text-gray-900 px-3 py-1.5 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="sm:col-span-3">
                <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={updatedData.phoneNumber}  // Populate with data
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>



              <div className="sm:col-span-3">
                <label htmlFor="id" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    autoComplete=""
                    onChange={handleInputChange}
                    value={updatedData.password}  // Populate with data
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Address (Editable) */}
              <div className="col-span-full">
                <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={updatedData.address || ''}  // Populate with data
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex  justify-center">
            <button
              type="submit"
              className=" inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CitizenProfile