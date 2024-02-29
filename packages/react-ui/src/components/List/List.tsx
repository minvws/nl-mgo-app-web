import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition } from '../../hooks/useComposition/useComposition';

export interface ListProps extends HTMLAttributes<HTMLElement> {
    asChild?: boolean;
}

export const List = ({ className, asChild, children, ...rest }: ListProps) => {
    const { Comp } = useComposition({ asChild, tag: 'ul' });

    return (
        <Comp
            className={twMerge(
                'flex flex-col gap-6 font-sans text-lg leading-normal text-black dark:text-white',
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
