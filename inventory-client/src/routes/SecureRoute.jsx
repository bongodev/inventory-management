import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthServices } from '../services';

const SecureRoute = ({ children }) => {
  const isAuthenticated = AuthServices.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SecureRoute;
