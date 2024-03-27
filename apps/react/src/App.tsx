import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { RouterProvider, type RouterProviderProps } from 'react-router';
import { I18nProvider } from './i18n';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config/config';
import { router as defaultRouter } from './routing';
import { useHealthcareProvidersStore } from './store';
import { useOnMount } from './hooks';

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

export const App = ({ router = defaultRouter }: AppProps = {}) => {
    const { addHealthcareProvider } = useHealthcareProvidersStore();

    useOnMount(() => {
        addHealthcareProvider({
            organisation: {
                display_name: 'Huisartspraktijk Dierdonk',
                id_type: 'abg-z',
                id_value: '01008656',
                addresses: [
                    {
                        address: 'Herculesstraat 100',
                        postal_code: '1812PG',
                        city: 'Alkmaar',
                    },
                ],
            },
            service: {
                medmij_id: 'huisartsenpuntdierdonk.huisartspraktijk.dierdonk@medmij',
                organisation_type: 'ZA',
                id_type: 'abg-z',
                id_value: '01008656',
                dataservices: [
                    {
                        id: 48,
                        name: 'Basisgegevens zorg',
                        interface_version: '1.2.0',
                        auth_endpoint: 'https://auth.example.com',
                        token_endpoint: 'https://token.example.com',
                        roles: [
                            {
                                code: 'MM-3.0-BZR-FHIR',
                                resource_endpoint: 'https://ggz.example.com',
                            },
                        ],
                    },
                ],
            },
        });
    });

    return (
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    );
};
