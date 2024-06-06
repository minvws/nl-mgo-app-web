import { Icon, type IconProps } from '../Icon/Icon';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { forwardRef, type HTMLAttributes } from 'react';
import { Slottable } from '@radix-ui/react-slot';
import { cn, groupFocusStyle } from '../../utils';

export type IconButtonProps = IconProps &
    CompositionPropsWithoutChildren &
    HTMLAttributes<HTMLElement> & {
        'aria-label': string;
    };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    {
        icon,
        ['aria-label']: ariaLabel,
        asChild,

        children,
        className,
        ...rest
    },
    ref
) {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp ref={ref} className="group inline-block p-2 outline-none sm:p-0" {...rest}>
            <Slottable>{children}</Slottable>
            <span
                className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-gray-900',
                    groupFocusStyle,
                    className
                )}
            >
                <Icon icon={icon} aria-label={ariaLabel} />
            </span>
        </Comp>
    );
});
