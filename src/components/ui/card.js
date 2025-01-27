export const Card = ({ children, className }) => (
  <div className={`border rounded-lg p-4 mb-4 ${className || ""}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);
