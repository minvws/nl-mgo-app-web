import { Route, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { Introduction } from './pages/Introduction/Introduction';
import { Terms } from './pages/Introduction/Terms';
import { Login } from './pages/Login/Login';
import { Overview } from './pages/Overview/Overview';
import { Playground } from './pages/Playground/Playground';
import { HealthcareProviders } from './pages/HealthcareProviders/HealthcareProviders';

export const routes = createRoutesFromElements(
    <Route>
        <Route path="/" element={<PublicRoute />}>
            <Route element={<PageLayout hideMenu />}>
                <Route path="/intro" element={<Introduction />} />
                <Route path="/voorwaarden" element={<Terms />} />
                <Route path="/inloggen" element={<Login />} />
            </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
            <Route element={<PageLayout />}>
                <Route path="/overzicht" element={<Overview />} />
                <Route path="/zorgverleners" element={<HealthcareProviders />} />
            </Route>
        </Route>

        <Route path="/playground" element={<Playground />} />
    </Route>
);

export const router = createBrowserRouter(routes);
