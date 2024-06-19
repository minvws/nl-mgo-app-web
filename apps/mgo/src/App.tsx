import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, type RouterProviderProps } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config/config';
import { router as defaultRouter } from './routing';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

interface AppProps {
    router?: RouterProviderProps['router'];
}

export const App = ({ router = defaultRouter }: AppProps = {}) => {
    return (
        <HelmetProvider>
            <Helmet
                titleTemplate="%s | Mijn Gezondheidsoverzicht"
                defaultTitle="Mijn Gezondheidsoverzicht"
            />
            <I18nProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider {...readConfig().oidc}>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </QueryClientProvider>
            </I18nProvider>
        </HelmetProvider>
    );
};
