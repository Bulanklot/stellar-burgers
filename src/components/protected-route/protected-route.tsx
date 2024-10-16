import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsAuthChecked, getUser } from '../../slices/user';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export function ProtectedRoute({ onlyUnAuth, children }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
}
