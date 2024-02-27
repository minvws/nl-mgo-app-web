import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '$/lib/auth';
import { useIntroSeen } from '$/lib/introSeen';

export function PublicRoute() {
    const auth = useAuth();
    const location = useLocation();
    const { isIntroSeen } = useIntroSeen();

    if (auth.isAuthenticated) {
        return <Navigate to="/overzicht" />;
    }

    if (!auth.isLoading) {
        if (!isIntroSeen && !['/intro', '/voorwaarden'].includes(location.pathname)) {
            return <Navigate to="/intro" />;
        }
        if (isIntroSeen && location.pathname !== '/inloggen') {
            return <Navigate to="/inloggen" />;
        }
    }

    return <Outlet />;
}
