import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './types';
import { useAuth } from '../context'

export const PublicRoute = () => {
  const authContext = useAuth();
  const location = useLocation();

  return !authContext?.isAuthorized
          ? <Outlet />
          : <Navigate to={ROUTES.MAIN} state={{ from: location }} replace />
}