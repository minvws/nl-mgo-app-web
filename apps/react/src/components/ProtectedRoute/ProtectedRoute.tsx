import { useAuth } from '$/lib/auth';
import { Navigate, Outlet } from '$/routing';

export function ProtectedRoute() {
    const auth = useAuth();

    if (!auth.isLoading && !auth.isAuthenticated) {
        return <Navigate to="/inloggen" replace />;
    }

    return <Outlet />;
}
