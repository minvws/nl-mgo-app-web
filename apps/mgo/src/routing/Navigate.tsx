import { type Override } from '$/types/Override';
import { type FC } from 'react';
import {
    Navigate as RouterNavigate,
    type NavigateProps as RouterNavigateProps,
} from 'react-router-dom';
import { type To } from './routes';
import { type LocationState } from './useLocation';

export type NavigateProps = Override<
    RouterNavigateProps,
    {
        to: To;
        state?: LocationState;
    }
>;

export const Navigate = RouterNavigate as FC<NavigateProps>;
