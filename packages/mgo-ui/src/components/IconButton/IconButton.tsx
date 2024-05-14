import { Icon, type IconProps } from '../Icon/Icon';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { type HTMLAttributes } from 'react';
import { Slottable } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

export type IconButtonProps = IconProps &
    CompositionPropsWithoutChildren &
    HTMLAttributes<HTMLElement> & {
        rounded?: boolean;
        'aria-label': string;
    };

export const IconButton = ({
    icon,
    ['aria-label']: ariaLabel,
    rounded = false,
    asChild,

    children,
    className,
    ...rest
}: IconButtonProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp className="group inline-block p-2 outline-none sm:p-0" {...rest}>
            <Slottable>{children}</Slottable>
            <span
                className={twMerge(
                    'flex h-8 w-8 items-center justify-center bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-700',
                    rounded && 'rounded-full',
                    className
                )}
            >
                <Icon icon={icon} aria-label={ariaLabel} />
            </span>
        </Comp>
    );
};
