import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
