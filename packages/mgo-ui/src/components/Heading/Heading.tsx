import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { type Size } from './sizes';

export interface HeadingProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    size?: Size;
}

const HeadingSizes: Record<Size, string> = {
    md: tw`text-md md:text-xl lg:text-2xl`,
    lg: tw`text-xl  md:text-3xl lg:text-4xl `,
};

export const Heading = ({ asChild, size = 'md', className, ...rest }: HeadingProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Comp
            className={twMerge(
                'font-sans font-bold leading-tight text-black dark:text-white',
                HeadingSizes[size],
                className
            )}
            {...rest}
        />
    );
};
