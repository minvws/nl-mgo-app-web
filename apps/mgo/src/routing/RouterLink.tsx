import { type Override } from '$/types/Override';
import { Link, type LinkProps } from 'react-router-dom';
import { type To } from './routes';

export type RouterLinkProps = Override<
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
