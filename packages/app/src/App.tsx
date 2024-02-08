import type { ComponentProps } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config';

type Props = {
    router: ComponentProps<typeof RouterProvider>['router'];
};

export function App({ router }: Props) {
    return (
        <AuthProvider {...readConfig().oidc}>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
