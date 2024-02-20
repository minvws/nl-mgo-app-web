import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config';

const queryClient = new QueryClient();

type Props = {
    router: ComponentProps<typeof RouterProvider>['router'];
};

export function App({ router }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...readConfig().oidc}>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    );
}
