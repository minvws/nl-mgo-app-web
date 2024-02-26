import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Stack } from '../Stack/Stack';

export interface ListProps extends HTMLAttributes<HTMLElement> {
    as?: 'ul' | 'ol';
}

export const List = ({ as = 'ul', className, ...rest }: ListProps) => {
    return (
        <Stack
            as={as}
            className={twMerge(
                'gap-6 font-sans text-lg leading-normal text-black dark:text-white',
                className
            )}
            {...rest}
        />
    );
};
