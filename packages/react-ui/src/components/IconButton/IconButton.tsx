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
                    'group-hover:bg-grey-100 flex h-8 w-8 items-center justify-center bg-inherit',
                    rounded && 'rounded-full',
                    className
                )}
            >
                <Icon
                    icon={icon}
                    aria-label={ariaLabel}
                    className="h-[1.25em] w-[1.25em] sm:h-[1.75em] sm:w-[1.75em]"
                />
            </span>
        </Comp>
    );
};
