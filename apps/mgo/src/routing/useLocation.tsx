import { type Override } from '$/types/Override';
import {
    useLocation as routerUseLocation,
    type Location as RouterLocation,
} from 'react-router-dom';
import { type RouteConfigPaths } from './routes';
import { type AuthErrorState } from '$/hooks/useAuthError/useAuthError';

export type LocationState = {
    readonly authError?: AuthErrorState;
};

type Location = Override<RouterLocation<LocationState>, { pathname: RouteConfigPaths }>;

export const useLocation = routerUseLocation as () => Location;
