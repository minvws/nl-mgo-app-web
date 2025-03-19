import { type Override } from '$/types/Override';
import {
    useLocation as routerUseLocation,
    type Location as RouterLocation,
} from 'react-router-dom';
import { type RouteConfigPaths } from './routes';

export type LocationState = {
    // add location states here
};

type Location = Override<RouterLocation<LocationState>, { pathname: RouteConfigPaths }>;

export const useLocation = routerUseLocation as () => Location;
