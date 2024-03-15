import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export { Outlet, useLocation } from 'react-router-dom';

export const router = createBrowserRouter(routes);

/**
 * Export react-router-dom's components with literal typed paths
 */
export { useNavigate } from './useNavigate';
export { Link, type LinkProps } from './Link';
export { NavLink, type NavLinkProps } from './NavLink';
export { Navigate, type NavigateProps } from './Navigate';
