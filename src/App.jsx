import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import HeroInteractive from "./components/HeroInteractive"; // 👈 yeni bileşeni dahil ettik
import HeroDemo from "./components/HeroDemo";


function App() {
  return (
    <div className="min-h-screen bg-[#1c1c1e] text-[#f5f5f5] font-sans flex flex-col">
      <Header />
      <HeroInteractive />
      <Hero />
      <HeroDemo />
      <Footer />
    </div>
  );
}

export default App;
