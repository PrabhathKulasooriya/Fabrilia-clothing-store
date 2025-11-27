import React from 'react'
import { Navigate } from 'react-router-dom'
import { getUserFromToken } from '../../Utilities/auth.js'

const ProtectedRoute = ({ children, role}) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === role) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute
