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
            </Route>
        </Route>

        <Route path="/playground" element={<Playground />} />
    </Route>
);

export const router = createBrowserRouter(routes);
