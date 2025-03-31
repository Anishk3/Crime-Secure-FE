import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import { useContext } from "react";
import AuthContext from "./context/AuthProvider"
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Learn from "./components/Learn.jsx";
import Login from "./components/Login.jsx";
import RequireAuth from "./RequireAuth.jsx";
import OfficerList from "./components/STATIONHEAD/OfficerList.jsx";
import IncidentSummary from "./components/STATIONHEAD/IncidentSummary.jsx";
import AssignOfficerToIncident from "./components/STATIONHEAD/AssignOfficer.jsx";
import VerifyIncident from "./components/STATIONHEAD/VerifyIncident.jsx";
import AddOfficer from "./components/STATIONHEAD/AddOfficer.jsx";
import Complaints from "./components/CITIZEN/Complaints.jsx";
import IncidentDetail from "./components/CITIZEN/IncidentDetail.jsx";
import FileComplaint from "./components/CITIZEN/FileComplaint.jsx";
import OfficerIncidents from "./components/OFFICER/OfficerIncidents.jsx";
import ClosedIncident from "./components/OFFICER/ClosedIncident.jsx";
import Profile from "./components/STATIONHEAD/Profile.jsx";
import ServicePage from "./components/CITIZEN/servicespage.jsx";
import EmergencyContacts from "./components/CITIZEN/EmergencyContact.jsx";
import CrimeStatistics from "./components/CITIZEN/CrimeStatistics.jsx";
import CitizenProfile from "./components/CITIZEN/CitizenProfile.jsx";
import OfficerProfile from "./components/OFFICER/OfficerProfile.jsx";


function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
      {/* {auth?.accessToken &&<Navbar />} */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learn" element={<Learn />} />
          {/* Dynamic routing based on role */}
          <Route
            path="/login"
            element={
              auth?.userDto?.role === "STATION_HEAD" ? (
                <Navigate to="/officerlist" />
              ) : auth?.userDto?.role === "CITIZEN" ? (
                <Navigate to="/complaints" />
              ) : auth?.userDto?.role === "OFICER" ? (
                <Navigate to="/assignedincidents" />
              ) : (
                <Login />
              )
            }
          />


          {/* Protected routes */}
          <Route element={<RequireAuth />}>

            {/* STATIONHEAD */}
            <Route path="/officerlist" element={<OfficerList />} />
            <Route path="/incidentsummary" element={<IncidentSummary />} />
            <Route path="/assignofficer" element={<AssignOfficerToIncident />} />
            <Route path="/updatestatus" element={<VerifyIncident />} />
            <Route path="/addofficer" element={<AddOfficer />} />
            <Route path="/profile" element={<Profile />} />

            {/* CITIZEN */}
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/details/:id" element={<IncidentDetail />} />
            <Route path="/filecomplaint" element={<FileComplaint />} />
            <Route path="/servicespage" element={<ServicePage />} />
            <Route path="/emergency-contacts" element={<EmergencyContacts />} />
            <Route path="/crime-statistics" element={<CrimeStatistics />} />
            <Route path="/citizenprofile" element={<CitizenProfile />} />

            {/* OFFICER */}
            <Route path="/assignedincidents" element={<OfficerIncidents />} />
            <Route path="/updatestatustoclosed" element={<ClosedIncident />} />
            <Route path="/officerprofile" element={<OfficerProfile />} />
        

          </Route>

         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
