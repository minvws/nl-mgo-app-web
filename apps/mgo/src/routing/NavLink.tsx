import { type Override } from '$/types/Override';
import { type FC } from 'react';
import {
    NavLink as RouterNavLink,
    type NavLinkProps as RouterNavLinkProps,
} from 'react-router-dom';
import { type To } from './routes';

export type NavLinkProps = Override<
    RouterNavLinkProps,
    {
        to: To;
    }
>;

export const NavLink = RouterNavLink as FC<NavLinkProps>;
