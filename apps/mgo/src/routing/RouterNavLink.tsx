import { type FC } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { type OverrideProperties } from 'type-fest';
import { type To } from './routes';

export type RouterNavLinkProps = OverrideProperties<
    NavLinkProps,
    {
        to: To;
    }
>;

export const RouterNavLink = NavLink as FC<RouterNavLinkProps>;
