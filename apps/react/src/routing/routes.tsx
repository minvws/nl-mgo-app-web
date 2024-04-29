import { type ExtractRouteParams, type ExtractRoutePaths } from '$/types/ExtractRoutePaths';
import { type LiteralToCollective } from '$/types/LiteralToCollective';
import { type Override } from '$/types/Override';
import { type Path as RouterPath } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';
import { HealthcareOrganization } from '../pages/HealthcareOrganization/HealthcareOrganization';
import { Login } from '../pages/Login/Login';
import { OnboardingIntro } from '../pages/OnboardingIntro/OnboardingIntro';
import { OnboardingProposition } from '../pages/OnboardingProposition/OnboardingProposition';
import { Overview } from '../pages/Overview/Overview';
import { Playground } from '../pages/Playground/Playground';
import { NotFound } from '$/pages/NotFound/NotFound';
import { AddHealthcareOrganization } from '$/pages/AddHealthcareOrganization/AddHealthcareOrganization';
import { AddHealthcareOrganizationList } from '$/pages/AddHealthcareOrganizationList/AddHealthcareOrganizationList';

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
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <PageLayout hideMenu />,
                children: [
                    {
                        path: '/zorgverlener-toevoegen',
                        element: <AddHealthcareOrganization />,
                    },
                    {
                        path: '/zorgverlener-toevoegen/zorgverleners',
                        element: <AddHealthcareOrganizationList />,
                    },
                ],
            },
            {
                element: <PageLayout />,
                children: [
                    {
                        path: '/overzicht',
                        element: <Overview />,
                    },
                    {
                        path: '/overzicht/:healthcareOrganizationSlug',
                        element: <HealthcareOrganization />,
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

export type RouteConfigPaths = ExtractRoutePaths<typeof routeConfig>;
export type RouteParams = ExtractRouteParams<typeof routeConfig>;

type RoutePath =
    | RouteConfigPaths
    | `${RouteConfigPaths}${'?' | '#'}${string}`
    | `${'?' | '#' | '..'}${string}`
    | '/niet-gevonden';

export type To = RoutePath | Partial<Override<RouterPath, { pathname: RoutePath }>>;

// Cast routeConfig from the literal type back to the collective type to make it compatible with react-router
export const routes = routeConfig as LiteralToCollective<typeof routeConfig>;
