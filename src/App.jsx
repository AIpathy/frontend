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
import SosyalFobiTesti from "./components/SosyalFobiTesti";
import AlkolTesti from "./components/AlkolTesti";
import DikkatTesti from "./components/DikkatTesti";
import SchutteTesti from "./components/SchutteTesti";
import OKBTesti from "./components/OKBTesti";
import ToksikIliskiTesti from "./components/ToksikIliskiTesti";
import TerkEdilmeTesti from "./components/TerkEdilmeTesti";
import KumarTesti from "./components/KumarTesti";
import ZekaGelisimTesti from "./components/ZekaGelisimTesti";


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
        <Route path="/beck-anksiyete-olcegi" element={<BeckAnksiyeteOlcegi />} />
        <Route path="/phq9-test" element={<PHQ9Test />} />
        <Route path="/narsisizm-testi" element={<NarsisizmTesti />} />
        <Route path="/borderline-kisilik-testi" element={<BorderlineKisilikTesti />} />
        <Route path="/sias20-test" element={<SIAS20Test />} />
        <Route path="/pcl5-test" element={<PCL5Test />} />
        <Route path="/icg5-test" element={<ICG5Test />} />
        <Route path="/sosyal-fobi-testi" element={<SosyalFobiTesti />} />
        <Route path="/alkol-testi" element={<AlkolTesti />} />
        <Route path="/dikkat-testi" element={<DikkatTesti />} />
        <Route path="/schutte-testi" element={<SchutteTesti />} />
        <Route path="/okb-testi" element={<OKBTesti />} />
        <Route path="/toksik-iliski-testi" element={<ToksikIliskiTesti />} />
        <Route path="/terk-edilme-testi" element={<TerkEdilmeTesti />} />
        <Route path="/kumar-testi" element={<KumarTesti />} />
        <Route path="/zeka-gelisim-testi" element={<ZekaGelisimTesti />} />
      </Routes>
    </Router>
  );
}

export default App;
