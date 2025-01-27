import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors ${className || ""}`}
    {...props}
  >
    {children}
  </button>
);
