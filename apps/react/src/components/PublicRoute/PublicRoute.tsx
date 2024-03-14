import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '$/lib/auth';
import { useOnboardingSeen } from '$/hooks';

export function PublicRoute() {
    const auth = useAuth();
    const location = useLocation();
    const { isOnboardingSeen } = useOnboardingSeen();

    if (isOnboardingSeen && auth.isAuthenticated) {
        return <Navigate to="/overzicht" replace />;
    }

    if (!auth.isLoading) {
        if (!isOnboardingSeen && !['/welkom', '/hoe-werkt-het'].includes(location.pathname)) {
            return <Navigate to="/welkom" replace />;
        }
        if (!['/welkom', '/hoe-werkt-het', '/inloggen'].includes(location.pathname)) {
            return <Navigate to="/inloggen" replace />;
        }
    }

    return <Outlet />;
}
