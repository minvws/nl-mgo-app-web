import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, type RouterProviderProps } from 'react-router';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config';
import { router as defaultRouter } from './routes';

const queryClient = new QueryClient();

interface AppProps {
    router?: RouterProviderProps['router'];
}

export function App({ router = defaultRouter }: AppProps = {}) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...readConfig().oidc}>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    );
}
