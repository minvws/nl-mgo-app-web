import { type ReactElement, type ButtonHTMLAttributes, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { type Variant } from './variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CompositionProps {
    isDisabled?: boolean;
    variant?: Variant;
    leftIcon?: IconName | ReactElement;
    rightIcon?: IconName | ReactElement;
    'aria-disabled'?: never; // Please use `isDisabled` instead
}

const focusStyle = tw`before:absolute before:-bottom-[4px] before:-left-[4px] before:-right-[4px] before:-top-[4px] before:rounded-xl before:border-4 before:border-transparent before:focus:border-black before:dark:focus:border-white`;
const disabledStyles = tw`aria-disabled:cursor-default aria-disabled:border-gray-300 aria-disabled:bg-gray-300 aria-disabled:focus:border-gray-100`;

const typeColors: Record<Variant, string> = {
    solid: tw`${disabledStyles} bg-sky-blue-600 hover:bg-dark-blue-700 text-white`,
    light: tw`${disabledStyles} text-dark-blue-700 bg-sky-blue-100 hover:bg-light-blue-500`,
    outline: tw`${disabledStyles} border border-gray-200 bg-white text-black hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 `,
    ghost: tw`text-dark-blue-700 hover:text-dark-blue-400 dark:text-light-blue-500 hover:dark:text-light-blue-200`,
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
            disabled={isDisabled}
            onClick={isDisabled ? undefined : onClick}
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
};
