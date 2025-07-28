// components/Button.jsx
import React from "react";

function Button({ children, onClick, className = "", ...props }) {
  // danger class'ı içeriyorsa kırmızı hover uygula
  const isDanger = className.includes("danger");
  const baseClasses =
    "flex justify-center items-center text-base px-4 py-2 border border-[#5e5e5e] text-white rounded-lg bg-[#5e5e5e] transition font-medium active:bg-[#c3c9d6] active:text-gray-800 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265d5c]";
  const hoverClasses = isDanger
    ? "hover:bg-red-600 hover:text-white"
    : "hover:bg-[#265d5c] hover:text-white";

  return (
    <button
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
