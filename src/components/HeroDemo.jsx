import React from "react";

function HeroDemo() {
  return (
    <div className="flex h-48 md:h-56 items-center justify-center bg-gradient-to-tr to-green-700 from-indigo-900 px-4 md:px-10 rounded-lg shadow-lg my-6">
      <div className="w-max">
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-3 text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-[#3CB97F] via-[#1c1c1e] to-[#3CB97F] bg-clip-text text-transparent tracking-wide drop-shadow-sm">
          AIpathy ile duygularını anla!
        </h1>
      </div>
    </div>
  );
}

export default HeroDemo; 