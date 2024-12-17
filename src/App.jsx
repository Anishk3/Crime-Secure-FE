import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import TrackComplaints from "./components/TrackComplaints";
import Register from "./components/Register";
import Complaints from "./components/Complaints";
import Login from "./components/Login";
import Profile from "./components/Profile";
import IncidentDetail from "./components/IncidentDetail";
import Navbar from "./components/Navbar";
import RequireAuth from "./RequireAuth";
import Learn from "./components/Learn";
import Home from "./components/Home";
import FileComplaint from "./components/FileComplaint";
import OfficerList from "./components/OfficerList";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";
import AddOfficer from "./components/AddOfficer";
import IncidentSummary from "./components/IncidentSummary";
import AssignOfficerToIncident from "./components/AssignOfficer";
import VerifyIncident from "./components/VerifyIncident";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/trackcomplaints" element={<TrackComplaints />} />
          {/* Dynamic routing based on role */}
          <Route
            path="/"
            element={
              auth?.userDto?.role === "STATION_HEAD" ? (
                <Navigate to="/officerlist" />
              ) : auth?.userDto?.role === "CITIZEN" ? (
                <Navigate to="/complaints" />
              ) : (
                <Login />
              )
            }
          />
          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/officerlist" element={<OfficerList />} />
            <Route path="/incidentsummary" element={<IncidentSummary />} />
            <Route path="/assignofficer" element={<AssignOfficerToIncident />} />
            <Route path="/updatestatus" element={<VerifyIncident />} />
            <Route path="/addofficer" element={<AddOfficer />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/details/:id" element={<IncidentDetail />} />
            <Route path="/filecomplaint" element={<FileComplaint />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
