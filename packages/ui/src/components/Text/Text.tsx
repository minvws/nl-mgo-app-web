import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { type Size } from './sizes';
import { type Variant } from './variants';

export interface TextProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    readonly size?: Size;
    readonly variant?: Variant;
}

const TextSizes: Record<Size, string> = {
    sm: tw`text-xs md:text-sm`,
    md: tw`md:text-md text-sm`,
    lg: tw`text-lg md:text-xl`,
};

const VariantStyles: Record<Variant | 'default', string> = {
    default: tw`text-black dark:text-white`,
    light: tw`text-gray-600 dark:text-gray-200`,
};

export const Text = ({
    asChild,
    size = 'md',
    variant = 'default',
    className,
    ...rest
}: TextProps) => {
    const { Comp } = useComposition({ asChild, tag: 'p' });

    return (
        <Comp
            className={twMerge(
                'font-sans font-normal leading-normal',
                TextSizes[size],
                VariantStyles[variant],
                className
            )}
            {...rest}
        />
    );
};
