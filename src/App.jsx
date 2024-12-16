
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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


function App() {
  return (
<div className="App">
<Navbar/>
    <Router>
      <Routes>
        <Route path="/home" element={< Home/>}></Route>
        <Route path="/register" element={< Register/>}></Route>
        <Route path="/learn" element={< Learn/>}></Route>
        <Route path="/trackcomplaints" element={<TrackComplaints />}></Route>
        <Route path="/" element={< Login/>}></Route>
        <Route element={<RequireAuth/>}>
        <Route path="/complaints" element={<Complaints />}></Route>
        <Route path="/details/:id" element={< IncidentDetail/>}></Route>
        <Route path="/filecomplaint" element={< FileComplaint/>}></Route>
        </Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
</div>

  );
}

export default App;
