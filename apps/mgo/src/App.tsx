import { IntlProvider, useIntl } from '$/intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider, type RouterProviderProps } from 'react-router-dom';
import { VadAuthProvider } from './auth';
import { router as defaultRouter } from './routing';

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
    const { formatMessage } = useIntl();
    const appName = formatMessage('common.app_name');
    return <Helmet titleTemplate={`%s | ${appName}`} defaultTitle={appName} />;
};

export const App = ({ router = defaultRouter }: AppProps = {}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <IntlProvider>
                <HelmetProvider>
                    <DefaultHelmet />
                    <VadAuthProvider navigate={router.navigate}>
                        <RouterProvider router={router} />
                    </VadAuthProvider>
                </HelmetProvider>
            </IntlProvider>
        </QueryClientProvider>
    );
};
