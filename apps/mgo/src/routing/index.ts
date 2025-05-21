import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export { Outlet } from 'react-router-dom';

export const router = createBrowserRouter(routes);

/**
 * Export react-router-dom's components with literal typed paths
 */
export { Navigate, type NavigateProps } from './Navigate';
export { RouterLink, type RouterLinkProps } from './RouterLink';
export { RouterNavLink, type RouterNavLinkProps } from './RouterNavLink';
export { useLocation } from './useLocation';
export { useNavigate } from './useNavigate';
export { useParams } from './useParams';

export { Link, type LinkProps } from './Link';

export { type RoutePath } from './routes';
