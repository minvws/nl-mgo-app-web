import {
    useLocation as routerUseLocation,
    type Location as RouterLocation,
} from 'react-router-dom';
import { type OverrideProperties } from 'type-fest';
import { type RouteConfigPaths } from './routes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type LocationState = {
    // add location states here
};

type Location = OverrideProperties<RouterLocation<LocationState>, { pathname: RouteConfigPaths }>;

export const useLocation = routerUseLocation as () => Location;
