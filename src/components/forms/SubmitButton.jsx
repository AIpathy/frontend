import React from "react";
import { Mail } from "lucide-react";

function SubmitButton({ 
  loading, 
  isForgotPassword, 
  isLogin, 
  children 
}) {
  return (
    <button
      type="submit"
      className="group relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>İşleniyor...</span>
          </>
        ) : (
          <>
            {isForgotPassword && <Mail className="w-5 h-5" />}
            {children}
          </>
        )}
      </div>
    </button>
  );
}

export default SubmitButton; 