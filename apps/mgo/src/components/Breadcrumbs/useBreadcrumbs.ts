import { matchRoutes, RouteObject, useLocation } from 'react-router-dom';
import { useTranslateBreadcrumb } from './useTranslateBreadcrumb';

export function useBreadcrumbs(routes: RouteObject[]) {
    const location = useLocation();
    const { translateBreadcrumb } = useTranslateBreadcrumb();

    return location.pathname
        .split('/')
        .map((_pathname, i, pathnames) => {
            return pathnames.slice(0, i + 1).join('/');
        })
        .map((route) => {
            const matches = matchRoutes(routes, route);
            const matchedRoute = matches?.pop()?.route;
            return {
                route,
                breadcrumb: matchedRoute?.handle?.breadcrumb,
            };
        })
        .filter((x) => !!x.breadcrumb)
        .map(({ route, breadcrumb }) => ({
            href: route,
            label: translateBreadcrumb(breadcrumb),
        }));
}
