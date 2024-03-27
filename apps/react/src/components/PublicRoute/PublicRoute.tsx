import { Navigate, Outlet, useLocation } from '$/routing';
import { useAuth } from '$/lib/auth';
import { useOnboardingSeen } from '$/hooks';

export function PublicRoute() {
    const auth = useAuth();
    const { pathname } = useLocation();
    const { isOnboardingSeen } = useOnboardingSeen();

    switch (pathname) {
        case '/':
            if (isOnboardingSeen) {
                return <Navigate to="/overzicht" replace />;
            }
            return <Navigate to="/welkom" replace />;

        case '/inloggen':
            if (auth.isAuthenticated) {
                return <Navigate to="/overzicht" replace />;
            }
            break;
    }

    return <Outlet />;
}
