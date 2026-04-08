import { useAuth } from '$/auth';
import { useRootRedirect } from '$/hooks';
import { Navigate, Outlet, useLocation } from '$/routing';

export function PublicRoute() {
    const auth = useAuth();
    const { pathname } = useLocation();
    const rootRedirect = useRootRedirect();

    switch (pathname) {
        case '/':
            return <Navigate to={rootRedirect.to} replace />;

        case '/inloggen':
            if (auth.isAuthenticated) {
                return <Navigate to="/zorgaanbieders/toevoegen" replace />;
            }
            break;
        default:
        // do nothing
    }

    return <Outlet />;
}
