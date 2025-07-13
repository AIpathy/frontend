import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  name,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  autoComplete,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={`px-4 py-2 pr-10 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${error ? 'border border-red-500' : ''} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <div className="text-xs text-red-400 mt-1 min-h-[18px]">{error}</div>
      )}
    </div>
  );
}

export default PasswordInput; 