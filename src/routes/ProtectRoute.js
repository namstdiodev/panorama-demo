import React, { FC, ReactNode } from 'react';
import Redirect from './Redirect';

const ProtectedRoutes = ({ condition, redirectTo, children }) => {
  return condition ? <>{children}</> : <Redirect to={redirectTo} />;
};

export default ProtectedRoutes;
