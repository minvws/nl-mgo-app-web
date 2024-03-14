import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, type RouterProviderProps } from 'react-router';
import { I18nProvider } from './i18n';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config/config';
import { router as defaultRouter } from './routes';
import { type ReactNode } from 'react';

const queryClient = new QueryClient();

interface AppProps {
    router?: RouterProviderProps['router'];
}

export const AppProviders = ({ children }: { children: ReactNode }) => (
    <I18nProvider>
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...readConfig().oidc}>{children}</AuthProvider>
        </QueryClientProvider>
    </I18nProvider>
);

export const App = ({ router = defaultRouter }: AppProps = {}) => (
    <AppProviders>
        <RouterProvider router={router} />
    </AppProviders>
);
