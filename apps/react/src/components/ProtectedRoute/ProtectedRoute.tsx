import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '$/lib/auth';
import { useOnboardingSeen } from '$/hooks';

export function ProtectedRoute() {
    const auth = useAuth();
    const { isOnboardingSeen } = useOnboardingSeen();

    if (!isOnboardingSeen) {
        return <Navigate to="/welkom" replace />;
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    return <Outlet />;
}
