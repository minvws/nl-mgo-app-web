import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { type Size } from './sizes';

export interface HeadingProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    size?: Size;
}

const TextSizes: Record<Size, string> = {
    md: tw`text-grey-700 dark:text-grey-200 text-lg font-normal md:text-2xl lg:text-3xl`,
    lg: tw`text-2xl font-bold text-black md:text-3xl lg:text-4xl dark:text-white`,
};

export const Heading = ({ asChild, size = 'md', className, ...rest }: HeadingProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Comp
            className={twMerge(TextSizes[size], 'font-sans leading-tight', className)}
            {...rest}
        />
    );
};
