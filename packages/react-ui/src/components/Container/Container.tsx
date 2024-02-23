import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
    as?: keyof HTMLElementTagNameMap;
    centeredContent?: boolean;
}
/**
 * Containers are used to constrain a content's width to a set maximum, while keeping it fluid.
 * It also provides padding and automatic margin.
 */
export const Container = ({
    as: Component = 'div',
    className,
    centeredContent,
    children,
    ...rest
}: ContainerProps) => (
    <Component
        className={twMerge(
            `mx-auto box-content w-[calc(100%-2rem)] max-w-xl px-[1rem] md:w-[calc(100%-3rem)] md:px-[1.5rem]`,
            centeredContent && 'flex flex-col items-center',
            className
        )}
        {...rest}
    >
        {children}
    </Component>
);
