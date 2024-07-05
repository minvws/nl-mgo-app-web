import { Icon, type IconProps } from '../Icon/Icon';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn, groupFocusStyle } from '../../utils';
import { type Size } from './sizes';

export type IconButtonProps = IconProps &
    CompositionPropsWithoutChildren &
    HTMLAttributes<HTMLElement> & {
        readonly size?: Size;
        readonly 'aria-label': string;
    };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    { icon, size = 'md', ['aria-label']: ariaLabel, asChild, className, ...rest },
    ref
) {
    const sizeMap: Record<Size, string> = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
    };

    const iconSizeMap: Record<Size, string> = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
    };
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp ref={ref} className="group flex outline-none" {...rest}>
            <span
                className={cn(
                    'flex items-center justify-center self-center rounded-full text-gray-500 group-hover:bg-gray-50 dark:text-gray-300 dark:group-hover:bg-gray-700',
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
