import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LaptopInfoPage from "./pages/LaptopInfoPage";
import RecordingDetailsPage from "./pages/RecordingDetailsPage";
import RecordingsList from "./pages/RecordingsList";
import StaffInfoPage from "./pages/StaffInfoPage";
import SuccessPage from "./pages/SuccessPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} /> 
        <Route path="/staff-info" element={<StaffInfoPage/>} />
        <Route path="/laptop-info" element={<LaptopInfoPage/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/recordings" element={<RecordingsList/>} />
        <Route path="/recording/:recordingID" element={<RecordingDetailsPage/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
