export const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className || ""}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
