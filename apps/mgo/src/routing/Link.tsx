import { type Override } from '$/types/Override';
import { type FC } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { type To } from './routes';

export type LinkProps = Override<
    RouterLinkProps,
    {
        to: To;
    }
>;

export const Link = RouterLink as FC<LinkProps>;
