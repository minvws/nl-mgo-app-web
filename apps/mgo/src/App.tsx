import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, type RouterProviderProps } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config/config';
import { router as defaultRouter } from './routing';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useIntl } from 'react-intl';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

interface AppProps {
    readonly router?: RouterProviderProps['router'];
}

const DefaultHelmet = () => {
    const intl = useIntl();
    const appName = intl.formatMessage({ id: 'common.app_name' });
    return <Helmet titleTemplate={`%s | ${appName}`} defaultTitle={appName} />;
};

export const App = ({ router = defaultRouter }: AppProps = {}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <I18nProvider>
                <HelmetProvider>
                    <DefaultHelmet />
                    <AuthProvider {...readConfig().oidc}>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </HelmetProvider>
            </I18nProvider>
        </QueryClientProvider>
    );
};
