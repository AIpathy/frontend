import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import HeroInteractive from "./components/HeroInteractive";
import HeroDemo from "./components/HeroDemo";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import Settings from "./components/Settings";
import AlertDetail from "./components/AlertDetail";
import BeckAnksiyeteOlcegi from "./components/BeckAnksiyeteOlcegi";
import PHQ9Test from "./components/PHQ9Test";
import NarsisizmTesti from "./components/NarsisizmTesti";
import BorderlineKisilikTesti from "./components/BorderlineKisilikTesti";
import SIAS20Test from "./components/SIAS20Test";
import PCL5Test from "./components/PCL5Test";
import ICG5Test from "./components/ICG5Test";


function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HeroInteractive />
            <Hero />
            <HeroDemo />
            <Footer />
          </>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/alert/:id" element={<AlertDetail />} />
        <Route path="/gad7-test" element={<BeckAnksiyeteOlcegi />} />
        <Route path="/phq9-test" element={<PHQ9Test />} />
        <Route path="/npi16-test" element={<NarsisizmTesti />} />
        <Route path="/msibpd-test" element={<BorderlineKisilikTesti />} />
        <Route path="/sias20-test" element={<SIAS20Test />} />
        <Route path="/pcl5-test" element={<PCL5Test />} />
        <Route path="/icg5-test" element={<ICG5Test />} />
      </Routes>
    </Router>
  );
}

export default App;
