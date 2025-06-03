import { forwardRef, type HTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { groupFocusStyle } from '../../styles';
import { cn } from '../../utils';
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
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
};

const iconSizeMap: Record<Size, string> = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
};

const variantStyles: Record<Variant, string> = {
    solid: 'bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700',
    ghost: 'group-hover:bg-gray-50 dark:group-hover:bg-gray-700',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    {
        icon,
        size = 'md',
        variant = 'solid',
        ['aria-label']: ariaLabel,
        asChild,
        className,
        ...rest
    },
    ref
) {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp ref={ref} className="group flex outline-none" {...rest}>
            <span
                className={cn(
                    'flex items-center justify-center self-center rounded-full',
                    'text-gray-500 dark:text-gray-300',
                    variantStyles[variant],
                    sizeMap[size],
                    groupFocusStyle,
                    className
                )}
            >
                <Icon icon={icon} aria-label={ariaLabel} className={iconSizeMap[size]} />
            </span>
        </Comp>
    );
});
