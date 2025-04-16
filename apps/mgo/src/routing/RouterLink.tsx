import { type FC } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { type OverrideProperties } from 'type-fest';
import { type To } from './routes';

export type RouterLinkProps = OverrideProperties<
    LinkProps,
    {
        to: To;
    }
>;

export const RouterLink = Link as FC<RouterLinkProps>;
