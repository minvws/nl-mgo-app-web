import { type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { type Variant } from './variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CompositionProps {
    isDisabled?: boolean;
    variant?: Variant;
    leftIcon?: IconName;
    rightIcon?: IconName;
    'aria-disabled'?: never; // Please use `isDisabled` instead
}

const disabledStyles = tw`aria-disabled:cursor-default aria-disabled:border-gray-300 aria-disabled:bg-gray-300 aria-disabled:focus:border-gray-100`;

const typeColors: Record<Variant, string> = {
    solid: tw`${disabledStyles} border-sky-blue-600 bg-sky-blue-600 hover:border-sky-blue-800 hover:bg-sky-blue-800 focus:border-sky-blue-500 border-2 text-white`,
    light: tw`${disabledStyles} border-sky-blue-200 bg-sky-blue-200 text-sky-blue-800 hover:border-sky-blue-300 hover:bg-sky-blue-300 focus:border-sky-blue-50 border-2`,
    outline: tw`${disabledStyles} text-sky-blue-800 hover:border-sky-blue-600 hover:bg-sky-blue-600 focus:border-sky-blue-500 border-2 border-gray-300 bg-white [&:not([aria-disabled])]:hover:text-white`,
    link: tw`text-dark-blue-700 focus:border-sky-blue-100 [&:not([aria-disabled])]:hover:text-sky-blue-300 border-2 border-transparent aria-disabled:cursor-default  aria-disabled:text-gray-500 aria-disabled:focus:border-gray-300 dark:text-white`,
};

export const Button = ({
    asChild,
    isDisabled,
    onClick,
    variant = 'solid',
    children,
    className,
    leftIcon,
    rightIcon,
    ...rest
}: ButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            aria-disabled={isDisabled}
            onClick={isDisabled ? undefined : onClick}
            className={twMerge(
                `inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold outline-none`,
                typeColors[variant],
                !!leftIcon && 'pl-4',
                !!rightIcon && 'pr-4',
                className
            )}
            {...rest}
        >
            {!!leftIcon && (
                <span className="me-2 inline-flex shrink-0 self-center text-[1.5em]">
                    <Icon icon={leftIcon} />
                </span>
            )}
            <Slottable>{children}</Slottable>
            {!!rightIcon && (
                <span className="ms-2 inline-flex shrink-0 self-center text-[1.5em]">
                    <Icon icon={rightIcon} />
                </span>
            )}
        </Comp>
    );
};
