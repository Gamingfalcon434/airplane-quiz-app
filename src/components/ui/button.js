import React from 'react';

/**
 * Button Component
 * @param {object} props
 * @param {React.ReactNode} props.children - The content inside the button
 * @param {string} [props.className] - Additional CSS classes
 * @param {object} [props.rest] - Other button props
 * @returns JSX.Element
 */
export const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors ${className || ""}`}
    {...props}
  >
    {children}
  </button>
);
