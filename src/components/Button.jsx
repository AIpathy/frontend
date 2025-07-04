// components/Button.jsx
import React from "react";

function Button({ children, onClick }) {
  return (
    <button
      className="text-xl px-8 py-3 border-2 border-white text-white rounded-full bg-[#2a2a2c] hover:bg-[#3CB97F] hover:text-white transition font-semibold active:bg-[#3CB97F] active:text-white active:scale-95"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
