import { type FC } from 'react';
import {
    Navigate as RouterNavigate,
    type NavigateProps as RouterNavigateProps,
} from 'react-router-dom';
import { type OverrideProperties } from 'type-fest';
import { type To } from './routes';
import { type LocationState } from './useLocation';

export type NavigateProps = OverrideProperties<
    RouterNavigateProps,
    {
        to: To;
        state?: LocationState;
    }
>;

export const Navigate = RouterNavigate as FC<NavigateProps>;
