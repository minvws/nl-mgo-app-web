import { Fragment } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/lib/auth';
import { useIntroSeen } from '@/lib/introSeen';

export function PublicRoot() {
    const auth = useAuth();
    const location = useLocation();
    const { isIntroSeen } = useIntroSeen();

    if (auth.isAuthenticated) {
        return <Navigate to="/overzicht" />;
    }

    if (!auth.isLoading) {
        if (!isIntroSeen && location.pathname !== '/intro') {
            return <Navigate to="/intro" />;
        }
        if (isIntroSeen && location.pathname !== '/inloggen') {
            return <Navigate to="/inloggen" />;
        }
    }

    return (
        <Fragment>
            <img
                src="/rijkshuisstijl/logo.svg"
                alt="Logo Rijksoverheid"
                className="mx-auto mb-16 block w-16"
            />
            <main className="mx-auto max-w-md">
                <Outlet />
            </main>
        </Fragment>
    );
}
