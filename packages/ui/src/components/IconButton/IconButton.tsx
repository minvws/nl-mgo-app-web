import { forwardRef, type HTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn, tw } from '../../utils';
import { Icon, type IconProps } from '../Icon/Icon';
import { type Size, type Variant } from './props';

export type IconButtonProps = IconProps &
    CompositionPropsWithoutChildren &
    HTMLAttributes<HTMLElement> & {
        readonly variant?: Variant;
        readonly size?: Size;
        readonly 'aria-label': string;
    };

const sizeMap: Record<Size, string> = {
    sm: tw`h-8 w-8`,
    md: tw`h-12 w-12`,
};

const iconSizeMap: Record<Size, string> = {
    sm: tw`h-5 w-5`,
    md: tw`h-8 w-8`,
};

const variantStyles: Record<Variant, string | string[]> = {
    solid: [
        'bg-t-seperator-secondary',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        'focus-visible:bg-gray-200 dark:focus-visible:bg-gray-700',
    ],
    ghost: [
        'hover:bg-dark-blue-100 dark:hover:bg-dark-blue-100/[0.15]',
        'focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700',
    ],
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    { icon, size = 'md', variant = 'solid', 'aria-label': ariaLabel, asChild, className, ...rest },
    ref
) {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            ref={ref}
            className={cn(
                'flex items-center justify-center rounded-full',
                'text-t-label-secondary',
                'shrink-0 grow-0',
                'cursor-pointer transition-colors duration-200',
                variantStyles[variant],
                sizeMap[size],
                focusStyle,
                className
            )}
            {...rest}
        >
            <Icon icon={icon} aria-label={ariaLabel} className={iconSizeMap[size]} />
        </Comp>
    );
});
