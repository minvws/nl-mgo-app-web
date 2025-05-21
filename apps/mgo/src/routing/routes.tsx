import { AddOrganization } from '$/pages/AddOrganization/AddOrganization';
import { AddOrganizationList } from '$/pages/AddOrganizationList/AddOrganizationList';
import { HealthCategory } from '$/pages/HealthCategory/HealthCategory';
import { HealthData } from '$/pages/HealthData/HealthData';
import { NotFound } from '$/pages/NotFound/NotFound';
import { Overview } from '$/pages/Overview/Overview';
import { PrivacyStatement } from '$/pages/PrivacyStatement/PrivacyStatement';
import { type ExtractRouteParams, type ExtractRoutePaths } from '$/routing/ExtractRoutePaths';
import { type RouteObject, type Path as RouterPath } from 'react-router-dom';
import { type OverrideProperties } from 'type-fest';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';
import { Introduction } from '../pages/Introduction/Introduction';
import { Login } from '../pages/Login/Login';
import { Logout } from '../pages/Logout/Logout';
import { Organization } from '../pages/Organization/Organization';
import { Organizations } from '../pages/Organizations/Organizations';
import { Proposition } from '../pages/Proposition/Proposition';

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
                        element: <Introduction />,
                    },
                    {
                        path: '/hoe-werkt-het',
                        element: <Proposition />,
                    },
                    {
                        path: '/inloggen',
                        element: <Login />,
                    },
                    {
                        path: '/uitgelogd',
                        element: <Logout />,
                    },
                    {
                        path: '/privacy',
                        element: <PrivacyStatement />,
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
                        path: '/zorgaanbieder-toevoegen',
                        element: <AddOrganization />,
                    },
                    {
                        path: '/zorgaanbieder-toevoegen/zorgaanbieders',
                        element: <AddOrganizationList />,
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
                        path: `/overzicht/:healthCategorySlug`,
                        element: <HealthCategory />,
                    },
                    {
                        path: '/overzicht/:healthCategorySlug/:resourceSlug',
                        element: <HealthData summary />,
                    },
                    {
                        path: '/overzicht/:healthCategorySlug/:resourceSlug/detail',
                        element: <HealthData />,
                    },
                    {
                        path: '/organisaties',
                        element: <Organizations />,
                    },
                    {
                        path: '/organisaties/:organizationSlug',
                        element: <Organization />,
                    },
                    {
                        path: `/organisaties/:organizationSlug/:healthCategorySlug`,
                        element: <HealthCategory />,
                    },
                    {
                        path: '/organisaties/:organizationSlug/:healthCategorySlug/:resourceSlug',
                        element: <HealthData summary />,
                    },
                    {
                        path: '/organisaties/:organizationSlug/:healthCategorySlug/:resourceSlug/detail',
                        element: <HealthData />,
                    },
                ],
            },
        ],
    },
] as const satisfies RouteObject[];

export type RouteConfigPaths = ExtractRoutePaths<typeof routeConfig>;
export type RouteParams = ExtractRouteParams<typeof routeConfig>;

export type RoutePath =
    | RouteConfigPaths
    | `${RouteConfigPaths}${'?' | '#'}${string}`
    | `${'?' | '#' | '..'}${string}`
    | '/niet-gevonden'
    | `./${string}`;

export type To = RoutePath | Partial<OverrideProperties<RouterPath, { pathname: RoutePath }>>;

// Cast routeConfig from the literal type back to the collective type to make it compatible with react-router
export const routes = routeConfig as RouteObject[];
