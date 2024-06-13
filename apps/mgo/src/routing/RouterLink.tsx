import { type Override } from '$/types/Override';
import { type FC } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { type To } from './routes';

export type RouterLinkProps = Override<
    LinkProps,
    {
        to: To;
    }
>;

export const RouterLink = Link as FC<RouterLinkProps>;
