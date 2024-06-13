import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export { Outlet } from 'react-router-dom';

export const router = createBrowserRouter(routes);

/**
 * Export react-router-dom's components with literal typed paths
 */
export { useNavigate } from './useNavigate';
export { useParams } from './useParams';
export { useLocation } from './useLocation';
export { RouterLink, type RouterLinkProps } from './RouterLink';
export { RouterNavLink, type RouterNavLinkProps } from './RouterNavLink';
export { Navigate, type NavigateProps } from './Navigate';

export { Link, type LinkProps } from './Link';
