import { type Override } from '$/types/Override';
import {
    useLocation as routerUseLocation,
    type Location as RouterLocation,
} from 'react-router-dom';
import { type RouteConfigPaths } from './routes';

type Location = Override<RouterLocation, { pathname: RouteConfigPaths }>;

export const useLocation = routerUseLocation as () => Location;
