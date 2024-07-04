import { useOnboardingSeen } from '$/hooks';
import { useAuthError } from '$/hooks/useAuthError/useAuthError';
import { useAuth } from '$/lib/auth';
import { Navigate, Outlet, useLocation } from '$/routing';

export function PublicRoute() {
    const auth = useAuth();
    const { pathname, search } = useLocation();
    const { isOnboardingSeen } = useOnboardingSeen();
    const authError = useAuthError();
    const waitForAuth = !!search && auth.isLoading;

    switch (pathname) {
        case '/':
            if (waitForAuth) {
                return <Outlet />;
            }
            if (authError) {
                return <Navigate to="/inloggen" replace state={{ authError }} />;
            }
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
