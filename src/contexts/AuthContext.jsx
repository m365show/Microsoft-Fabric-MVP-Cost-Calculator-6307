import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (userId && token) {
        setIsAuthenticated(true);
        setUser({ userId, token });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    const { userId, token, newUser } = userData;
    
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('isNewUser', newUser ? 'true' : 'false');
    
    setIsAuthenticated(true);
    setUser({ userId, token, newUser });
    
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('isNewUser');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};