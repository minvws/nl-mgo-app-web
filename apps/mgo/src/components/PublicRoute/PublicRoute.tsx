import { useAuth } from '$/auth';
import { useOnboardingSeen } from '$/hooks';
import { Navigate, Outlet, useLocation } from '$/routing';

export function PublicRoute() {
    const auth = useAuth();
    const { pathname } = useLocation();
    const { isOnboardingSeen } = useOnboardingSeen();

    switch (pathname) {
        case '/':
            if (!isOnboardingSeen) {
                return <Navigate to="/welkom" replace />;
            }
            return <Navigate to="/zorgaanbieder-toevoegen" replace />;

        case '/inloggen':
            if (auth.isAuthenticated) {
                return <Navigate to="/zorgaanbieder-toevoegen" replace />;
            }
            break;
        default:
        // do nothing
    }

    return <Outlet />;
}
