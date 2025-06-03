import { forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { type Variant } from './variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CompositionProps {
    readonly variant?: Variant;
    readonly leftIcon?: IconName | ReactElement;
    readonly rightIcon?: IconName | ReactElement;
}

const typeColors: Record<Variant, string> = {
    solid: cn('bg-sky-blue-600 hover:bg-dark-blue-700 text-white'),
    light: cn(
        'text-sky-blue-700 bg-sky-blue-700/10  hover:bg-sky-blue-700/5',
        'dark:text-sky-blue-300 dark:bg-sky-blue-300/10  dark:hover:bg-sky-blue-300/5'
    ),
    outline: cn(
        'border border-gray-200 bg-white text-black hover:bg-gray-50',
        'dark:border-gray-500 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700'
    ),
    destructive: cn('bg-red-600 text-white hover:bg-red-500'),
    ghost: cn(
        'text-dark-blue-700 hover:text-dark-blue-400',
        'dark:text-light-blue-300 hover:dark:text-light-blue-200'
    ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { asChild, onClick, variant = 'solid', children, className, leftIcon, rightIcon, ...rest },
    ref
) {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            ref={ref}
            onClick={onClick}
            className={twMerge(
                `relative inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold leading-normal outline-none md:py-4`,
                focusStyle,
                typeColors[variant],
                !!leftIcon && 'pl-4',
                !!rightIcon && 'pr-4',
                className
            )}
            {...rest}
        >
            {!!leftIcon && (
                <span className="me-2 inline-flex shrink-0 self-center text-[1.5em]">
                    {isValidElement(leftIcon) ? leftIcon : <Icon icon={leftIcon as IconName} />}
                </span>
            )}
            <Slottable>{children}</Slottable>
            {!!rightIcon && (
                <span className="ms-2 inline-flex shrink-0 self-center text-[1.5em]">
                    {isValidElement(rightIcon) ? rightIcon : <Icon icon={rightIcon as IconName} />}
                </span>
            )}
        </Comp>
    );
});
