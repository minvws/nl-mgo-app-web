import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { type Size } from './sizes';

export interface TextProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    size?: Size;
}

const TextSizes: Record<Size, string> = {
    md: tw`md:text-md text-sm`,
    lg: tw`text-lg text-gray-600 md:text-xl dark:text-gray-200`,
};

export const Text = ({ asChild, size = 'md', className, ...rest }: TextProps) => {
    const { Comp } = useComposition({ asChild, tag: 'p' });

    return (
        <Comp
            className={twMerge(
                'font-sans font-normal leading-normal text-black dark:text-white',
                TextSizes[size],
                className
            )}
            {...rest}
        />
    );
};
