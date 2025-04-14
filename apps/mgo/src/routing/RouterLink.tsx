import { Link, type LinkProps } from 'react-router-dom';
import { type OverrideProperties } from 'type-fest';
import { type To } from './routes';

export type RouterLinkProps = OverrideProperties<
    LinkProps,
    {
        to: To;
    }
> & {
    readonly ['aria-disabled']?: boolean;
};

export const RouterLink = ({
    ['aria-disabled']: ariaDisabled = false,
    ...rest
}: RouterLinkProps) => {
    return ariaDisabled ? <span tabIndex={0} {...rest} /> : <Link {...rest} />;
};
