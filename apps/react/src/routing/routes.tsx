import { type ExtractRoutePaths } from '$/types/ExtractRoutePaths';
import { type LiteralToCollective } from '$/types/LiteralToCollective';
import { type Override } from '$/types/Override';
import { type Path as RouterPath } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';
import { HealthcareProviders } from '../pages/HealthcareProviders/HealthcareProviders';
import { Login } from '../pages/Login/Login';
import { OnboardingIntro } from '../pages/OnboardingIntro/OnboardingIntro';
import { OnboardingProposition } from '../pages/OnboardingProposition/OnboardingProposition';
import { Overview } from '../pages/Overview/Overview';
import { Playground } from '../pages/Playground/Playground';

const routeConfig = [
    {
        path: '/',
        element: <PublicRoute />,
        children: [
            {
                element: <PageLayout hideMenu />,
                children: [
                    {
                        path: '/welkom',
                        element: <OnboardingIntro />,
                    },
                    {
                        path: '/hoe-werkt-het',
                        element: <OnboardingProposition />,
                    },
                    {
                        path: '/inloggen',
                        element: <Login />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <PageLayout />,
                children: [
                    {
                        path: '/overzicht',
                        element: <Overview />,
                    },
                    {
                        path: '/zorgverleners',
                        element: <HealthcareProviders />,
                    },
                ],
            },
        ],
    },
    {
        path: '/playground',
        element: <Playground />,
    },
] as const;

type RouteConfigPaths = ExtractRoutePaths<typeof routeConfig>;

export type RoutePath =
    | RouteConfigPaths
    | `${RouteConfigPaths}${'?' | '#'}${string}`
    | `${'?' | '#' | '..'}${string}`;

export type To = RoutePath | Override<RouterPath, { pathname: RoutePath }>;

// Cast routeConfig from the literal type back to the collective type to make it compatible with react-router
export const routes = routeConfig as LiteralToCollective<typeof routeConfig>;
