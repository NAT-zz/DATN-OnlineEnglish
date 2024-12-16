import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import localStorageAvailable from 'src/utils/localStorageAvailable';
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

function dispatch() {
  const isDoing = localStorage.getItem('isDoing') || '';
  if (isDoing) {
    const userResponse = window.confirm('Are you sure you want to leave ?');

    if (userResponse) {
      localStorage.removeItem('isDoing');
      return '1';
    }
    return '3';
  }
  return '0';
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  // if (dispatch() === '3') {
  //   return <Navigate to={pathname} />;
  // }

  return <> {children} </>;
}
