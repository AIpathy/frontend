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
      </Routes>
    </Router>
  );
}

export default App;
