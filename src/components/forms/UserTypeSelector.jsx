import React from "react";

function UserTypeSelector({ isDoctor, setIsDoctor }) {
  return (
    <div className="flex gap-3 mb-8 relative z-20">
      <button
        type="button"
        onClick={() => setIsDoctor(false)}
        className={`user-type-btn group relative flex-1 py-4 px-6 rounded-2xl transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-3xl hover:scale-105 overflow-hidden ${
          isDoctor === false
            ? "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-2xl selected-btn"
            : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:bg-white/90 hover:text-gray-900"
        }`}
      >
        {/* Gradient overlay on hover for selected */}
        {isDoctor === false && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </>
        )}
        
        <div className="flex items-center justify-center gap-3 relative z-50 text-current">
          <div className="text-2xl">👤</div>
          <span className="font-semibold">Kullanıcı</span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => setIsDoctor(true)}
        className={`user-type-btn group relative flex-1 py-4 px-6 rounded-2xl transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-3xl hover:scale-105 overflow-hidden ${
          isDoctor === true
            ? "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-2xl selected-btn"
            : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:bg-white/90 hover:text-gray-900"
        }`}
      >
        {/* Gradient overlay on hover for selected */}
        {isDoctor === true && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </>
        )}
        
        <div className="flex items-center justify-center gap-3 relative z-50 text-current">
          <div className="text-2xl">👨‍⚕️</div>
          <span className="font-semibold">Doktor</span>
        </div>
      </button>

      <style jsx>{`
        .selected-btn {
          color: white !important;
        }
        
        .selected-btn .flex {
          color: white !important;
          z-index: 999 !important;
        }
        
        .selected-btn span {
          color: white !important;
        }
        
        .selected-btn:hover {
          color: white !important;
        }
        
        .selected-btn:hover .flex {
          color: white !important;
        }
        
        .selected-btn:hover span {
          color: white !important;
        }
        
        .user-type-btn {
          position: relative;
          z-index: 10;
        }
        
        .user-type-btn .flex {
          position: relative;
          z-index: 999 !important;
          pointer-events: none;
        }
        
        .user-type-btn:not([class*="bg-gradient"]) {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          color: rgb(55, 65, 81);
        }
      `}</style>
    </div>
  );
}

export default UserTypeSelector; 