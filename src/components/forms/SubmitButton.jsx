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
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          İşleniyor...
        </>
      ) : (
        <>
          {isForgotPassword && <Mail className="w-4 h-4" />}
          {children}
        </>
      )}
    </button>
  );
}

export default SubmitButton; 