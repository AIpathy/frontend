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
        className={`px-4 py-2 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${error ? 'border border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <div className="text-xs text-red-400 mt-1 min-h-[18px]">{error}</div>
      )}
    </div>
  );
}

export default Input; 