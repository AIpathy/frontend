import React from "react";
import heroImg from "../assets/hero.png";

function HeroInteractive() {
  const handleClick = () => {
    alert("Yapay zeka arayüzü burada açılacak!");
    // ileride: navigate("/chat") veya modal açılır
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-10">
      {/* Yönlendirici Metin + Ok */}
      <div className="text-center max-w-sm mb-6 flex flex-col items-center gap-4">
        <p className="text-[#265d5c] text-xl sm:text-2xl font-semibold">
          Günlük ruh halini analiz etmek için
        </p>
        <span className="text-6xl text-[#265d5c] animate-bounce shadow-[0_10px_10px_0_#30614F70] rounded-full px-3">
          ↓
        </span>
      </div>

      {/* Tıklanabilir Görsel */}
      <div
        onClick={handleClick}
        className="cursor-pointer transition-all duration-300 hover:shadow-[0_8px_40px_0_#30614F70] hover:scale-105 rounded-full"
      >
        <img
          src={heroImg}
          alt="AIpathy Hero"
          style={{ width: "300px", height: "320px" }}
          className="opacity-90 drop-shadow-2xl rounded-full"
        />
      </div>
    </section>
  );
}

export default HeroInteractive;
