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
                `cursor-pointer text-blue-700 underline visited:text-blue-900 hover:no-underline`,
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
