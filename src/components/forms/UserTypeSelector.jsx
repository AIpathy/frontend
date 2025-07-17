import React from "react";

function UserTypeSelector({ isDoctor, setIsDoctor }) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        type="button"
        onClick={() => setIsDoctor(false)}
        className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
          !isDoctor
            ? "bg-[#3CB97F] text-white"
            : "bg-[#4e4e4e] text-gray-300 hover:bg-[#5e5e5e]"
        }`}
      >
        Kullanıcı
      </button>
      <button
        type="button"
        onClick={() => setIsDoctor(true)}
        className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
          isDoctor
            ? "bg-[#3CB97F] text-white"
            : "bg-[#4e4e4e] text-gray-300 hover:bg-[#18181b]/80"
        }`}
      >
        Doktor
      </button>
    </div>
  );
}

export default UserTypeSelector; 