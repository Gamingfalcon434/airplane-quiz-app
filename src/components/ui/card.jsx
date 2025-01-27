import React from 'react';

function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className || ""}`}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return (
    <div className="card-content">
      {children}
    </div>
  );
}

export { Card, CardContent };
