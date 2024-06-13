import { type Override } from '$/types/Override';
import { type FC } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { type To } from './routes';

export type RouterNavLinkProps = Override<
    NavLinkProps,
    {
        to: To;
    }
>;

export const RouterNavLink = NavLink as FC<RouterNavLinkProps>;
