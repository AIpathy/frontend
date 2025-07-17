// components/Button.jsx
import React from "react";

function Button({ children, onClick }) {
  return (
    <button
      className="text-xl px-8 py-3 border-2 border-[#e0e7ef] text-gray-800 rounded-full bg-[#e0e7ef] hover:bg-[#d3dae6] hover:text-gray-800 transition font-semibold active:bg-[#c3c9d6] active:text-gray-800 active:scale-95"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
