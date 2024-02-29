import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { type Size } from './sizes';

export interface HeadingProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    size?: Size;
}

const TextSizes: Record<Size, string> = {
    sm: tw`text-lg md:text-xl lg:text-2xl`,
    md: tw`text-xl md:text-2xl lg:text-3xl`,
    lg: tw`text-2xl md:text-3xl lg:text-4xl`,
    xl: tw`text-3xl md:text-4xl lg:text-5xl`,
};

export const Heading = ({ asChild, size = 'md', className, ...rest }: HeadingProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Comp
            className={twMerge(
                TextSizes[size],
                'font-sans font-bold leading-tight text-black dark:text-white',
                className
            )}
            {...rest}
        />
    );
};
