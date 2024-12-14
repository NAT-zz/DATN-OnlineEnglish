import { Navigate } from 'react-router-dom';
// routes
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import { PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();

  const PATH_REDIRECT = user?.role === 'TEACHER' ? PATH_DASHBOARD.root : PATH_STUDENT.root;
  if (isAuthenticated) {
    return <Navigate to={PATH_REDIRECT} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
