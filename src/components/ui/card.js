import React from 'react';

/**
 * Card Component
 * @param {object} props
 * @param {React.ReactNode} props.children - The content inside the card
 * @param {string} [props.className] - Additional CSS classes
 * @returns JSX.Element
 */
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className || ""}`}>
      {children}
    </div>
  );
}

/**
 * CardContent Component
 * @param {object} props
 * @param {React.ReactNode} props.children - The content inside the card content
 * @returns JSX.Element
 */
function CardContent({ children }) {
  return (
    <div className="card-content">
      {children}
    </div>
  );
}

export { Card, CardContent };
