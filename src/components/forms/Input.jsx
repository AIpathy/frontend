import React from "react";

function Input({
  type = "text",
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
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={`px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 placeholder-gray-400 border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#3CB97F] w-full transition-colors ${error ? 'border border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <div className="text-xs text-red-400 mt-1 min-h-[18px]">{error}</div>
      )}
    </div>
  );
}

export default Input; 