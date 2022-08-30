import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LaptopInfoPage from "./pages/LaptopInfoPage";
import RecordingDetailsPage from "./pages/RecordingDetailsPage";
import RecordingsList from "./pages/RecordingsList";
import StaffInfoPage from "./pages/StaffInfoPage";
import SuccessPage from "./pages/SuccessPage";
import SafeRoute from "./routes/SafeRoute";
import SuccessRoute from "./routes/SuccessRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} /> 
        <Route path="/staff-info" element={<StaffInfoPage/>} />
        <Route path="/laptop-info" element={<SafeRoute component={<LaptopInfoPage/>}/>} />
        <Route path="/success" element={<SuccessRoute component={<SuccessPage/>}/>} />
        <Route path="/recordings" element={<RecordingsList/>} />
        <Route path="/recording/:recordingID" element={<RecordingDetailsPage/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
