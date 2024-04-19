import { type HTMLAttributes } from 'react';
import { type CompositionProps, useComposition } from '../../hooks/useComposition/useComposition';
import { twMerge } from 'tailwind-merge';

export type CardProps = HTMLAttributes<HTMLElement> & CompositionProps;

export const Card = ({ className, asChild, children, ...rest }: CardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Comp
            className={twMerge(
                ' border-grey-200 dark:bg-grey-900 dark:border-grey-500  rounded-lg border bg-white p-4 shadow-sm dark:text-white',
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
