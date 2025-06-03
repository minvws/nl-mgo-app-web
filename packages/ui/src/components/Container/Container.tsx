import { forwardRef, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, CompositionProps {
    readonly centeredContent?: boolean;
}
/**
 * Containers are used to constrain a content's width to a set maximum, while keeping it fluid.
 * It also provides padding and automatic margin.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
    { asChild, className, centeredContent, children, ...rest },
    ref
) {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Comp
            ref={ref}
            className={twMerge(
                `mx-auto box-content w-[calc(100%-2rem)] max-w-xl px-[1rem] md:w-[calc(100%-3rem)] md:px-[1.5rem]`,
                centeredContent && 'flex flex-col items-center',
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
});
