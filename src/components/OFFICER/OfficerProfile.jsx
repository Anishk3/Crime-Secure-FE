import React, { useContext, useEffect, useState } from 'react';
import "../../styles/OfficerProfile.css";
import { PhotoIcon } from '@heroicons/react/24/solid';
import AuthContext from '../../context/AuthProvider';
import StationHeadService from '../../Services/StationHeadService';
import OfficerService from '../../Services/OfficerService';
import Navbar from './OfficerNavbar';
import { useNavigate } from 'react-router-dom';

export default function OfficerProfile() {
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext);
  const [officer, setOfficer] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [updatedData, setUpdatedData] = useState({
    officerName: '',
    officerEmail: '',
    officerPhoneNumber: '',
    officerAddress: '',
    officerDob: '',
    officerPassword: ''
  });
  const [file, setFile] = useState(null);  // State for file upload

  useEffect(() => {
    OfficerService.getOfficer(auth.id, auth.accessToken)
      .then(response => {
        console.log("response from getOfficer", response.data);
        setOfficer(response.data);
        setUpdatedData({
            officerName: response.data.officerName,
            officerEmail: response.data.officerEmail,
            officerPhoneNumber: response.data.officerPhoneNumber,
            officerAddress: response.data.officerAddress,
            officerDob: response.data.officerDob,
            officerPassword: response.data.officerPassword

        });

        // Check if the profile image is returned as a byte array
        if (response.data.profileImage) {
          OfficerService.getProfileImage(auth.accessToken,auth.id).then(response=>{
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
    formData.append('officerName', updatedData.officerName);
    formData.append('officerEmail', updatedData.officerEmail);
    formData.append('officerPhoneNumber', updatedData.officerPhoneNumber);
    formData.append('officerAddress', updatedData.officerAddress);
    formData.append('officerPassword', updatedData.officerPassword);
    if (file) formData.append('profileImage', file); // Append the file if present

    OfficerService.updateOfficer(auth.accessToken, formData)
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

  if (!officer) return <div>Loading...</div>;  // Display loading state until data is fetched

  return (
    <div className="OfficerProfile overflow-x-hidden">
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
                  Officer Id
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
                    id="officerName"
                    name="officerName"
                    type="text"
                    autoComplete="given-name"
                    value={updatedData.officerName}  // Populate with data
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
                    id="officerEmail"
                    name="officerEmail"
                    type="email"
                    autoComplete="email"
                    value={updatedData.officerEmail}  // Populate with data
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
                    id="officerDob"
                    name="officerDob"
                    type="text"
                    autoComplete=""
                    readOnly
                    value={updatedData.officerDob}  // Populate with data
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
                    id="officerPhoneNumber"
                    name="officerPhoneNumber"
                    type="tel"
                    value={updatedData.officerPhoneNumber}  // Populate with data
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
                    id="officerPassword"
                    name="officerPassword"
                    type="text"
                    autoComplete=""
                    onChange={handleInputChange}
                    value={updatedData.officerPassword}  // Populate with data
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
                    id="officerAddress"
                    name="officerAddress"
                    rows={3}
                    value={updatedData.officerAddress || ''}  // Populate with data
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
  );
}