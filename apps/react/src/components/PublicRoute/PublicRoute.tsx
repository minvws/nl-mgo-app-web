import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '$/lib/auth';
import { useIntroSeen } from '$/lib/introSeen';

export function PublicRoute() {
    const auth = useAuth();
    const location = useLocation();
    const { isIntroSeen } = useIntroSeen();

    if (isIntroSeen && auth.isAuthenticated) {
        return <Navigate to="/overzicht" replace />;
    }

    if (!auth.isLoading) {
        if (!isIntroSeen && !['/intro', '/voorwaarden'].includes(location.pathname)) {
            return <Navigate to="/intro" replace />;
        }
        if (!['/intro', '/voorwaarden', '/inloggen'].includes(location.pathname)) {
            return <Navigate to="/inloggen" replace />;
        }
    }

    return <Outlet />;
}
