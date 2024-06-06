import { type AnchorHTMLAttributes } from 'react';
import { type CompositionProps, useComposition } from '../../hooks/useComposition/useComposition';
import { cn, focusStyle } from '../../utils';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CompositionProps {
    onClick?: never; // Please use `asChild` instead
}

export const Link = ({ asChild, children, className, ...rest }: LinkProps) => {
    const { Comp } = useComposition({ asChild, tag: 'a' });

    return (
        <Comp
            className={cn(
                `text-dark-blue-700 visited:text-dark-blue-900 cursor-pointer underline hover:no-underline`,
                focusStyle,
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
