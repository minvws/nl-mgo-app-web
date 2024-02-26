import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './lib/auth';
import { readConfig } from './lib/config';

import { Route, Routes } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { Login } from './pages/Login/Login';
import { Introduction } from './pages/Introduction/Introduction';
import { Overview } from './pages/Overview/Overview';
import { Playground } from './pages/Playground/Playground';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Terms } from './pages/Introduction/Terms';

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...readConfig().oidc}>
                <Routes>
                    <Route path="/" element={<PublicRoute />}>
                        <Route element={<PageLayout />}>
                            <Route path="/intro" element={<Introduction />} />
                            <Route path="/voorwaarden" element={<Terms />} />
                            <Route path="/inloggen" element={<Login />} />
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<PageLayout />}>
                            <Route path="/overzicht" element={<Overview />} />
                        </Route>
                    </Route>

                    <Route path="/playground" element={<Playground />} />
                </Routes>
            </AuthProvider>
        </QueryClientProvider>
    );
}
