import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '$/lib/auth';
import { useIntroSeen } from '$/lib/introSeen';

export function ProtectedRoute() {
    const auth = useAuth();
    const { isIntroSeen } = useIntroSeen();

    if (!isIntroSeen) {
        return <Navigate to="/intro" />;
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/inloggen" />;
    }

    return <Outlet />;
}
