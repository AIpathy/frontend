import React from "react";

function UserTypeSelector({ isDoctor, setIsDoctor }) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        type="button"
        onClick={() => setIsDoctor(false)}
        className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
          !isDoctor
            ? "bg-[#265d5c] text-white"
            : "bg-[#d4d4d4] text-zinc-700 hover:bg-[#cfcfcf]"
        }`}
      >
        Kullanıcı
      </button>
      <button
        type="button"
        onClick={() => setIsDoctor(true)}
        className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
          isDoctor
            ? "bg-[#265d5c] text-white"
            : "bg-[#d4d4d4]  text-zinc-700 hover:bg-[#cfcfcf]"
        }`}
      >
        Doktor
      </button>
    </div>
  );
}

export default UserTypeSelector; 