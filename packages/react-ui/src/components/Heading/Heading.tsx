import { twMerge } from 'tailwind-merge';
import { type Size } from './sizes';
import { DynamicElement, type DynamicElementProps } from '../DynamicElement/DynamicElement';
import { tw } from '../../utils/tw/tw';

export interface HeadingProps extends DynamicElementProps {
    size?: Size;
}

const TextSizes: Record<Size, string> = {
    sm: tw`text-lg md:text-xl lg:text-2xl`,
    md: tw`text-xl md:text-2xl lg:text-3xl`,
    lg: tw`text-2xl md:text-3xl lg:text-4xl`,
    xl: tw`text-3xl md:text-4xl lg:text-5xl`,
};

export const Heading = ({ size = 'md', className, ...rest }: HeadingProps) => {
    return (
        <DynamicElement
            className={twMerge(
                TextSizes[size],
                'font-sans font-bold leading-tight text-black dark:text-white',
                className
            )}
            {...rest}
        />
    );
};
