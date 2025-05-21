import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';

export type CardProps = HTMLAttributes<HTMLElement> & CompositionProps;

export const Card = ({ className, asChild, children, ...rest }: CardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Comp
            className={twMerge(
                'w-full rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white',
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
