import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import HeroInteractive from "./components/HeroInteractive"; // 👈 yeni bileşeni dahil ettik
import HeroDemo from "./components/HeroDemo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";


function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
