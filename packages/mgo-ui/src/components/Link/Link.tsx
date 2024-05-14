import { type AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { type CompositionProps, useComposition } from '../../hooks/useComposition/useComposition';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CompositionProps {
    onClick?: never; // Please use `asChild` instead
}

export const Link = ({ asChild, children, className, ...rest }: LinkProps) => {
    const { Comp } = useComposition({ asChild, tag: 'a' });

    return (
        <Comp
            className={twMerge(
                `text-dark-blue-700 visited:text-dark-blue-900 cursor-pointer underline hover:no-underline`,
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
