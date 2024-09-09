import React, { ReactElement } from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export function ProtectedRoute({
  children
}: ProtectedRouteProps): ReactElement {
  return children;
}
