import { Fragment } from 'react';
import { Outlet } from 'react-router';

export interface LayoutProps {
    showMenu?: boolean;
}

export function PageLayout() {
    return (
        <Fragment>
            <img
                src="/rijkshuisstijl/logo.svg"
                alt="Logo Rijksoverheid"
                className="mx-auto mb-16 block w-16"
            />
            <main className="container mx-auto">
                <Outlet />
            </main>
        </Fragment>
    );
}
