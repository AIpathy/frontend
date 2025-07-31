import React from "react";

function Select({
  name,
  value,
  onChange,
  error,
  className = "",
  children,
  ...props
}) {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#265d5c] w-full transition-colors ${error ? 'border border-red-500' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <div className="text-xs text-red-400 mt-1 min-h-[18px]">{error}</div>
      )}
    </div>
  );
}

export default Select; 