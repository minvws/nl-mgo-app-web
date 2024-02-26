import { twMerge } from 'tailwind-merge';
import { tw } from '../../utils/tw/tw';
import { type Variant } from './variants';
import { ButtonOrLink, type ButtonOrLinkProps } from '../ButtonOrLink/ButtonOrLink';
import { type ReactNode } from 'react';
import { type IconName, isIconName } from '../Icon/icons';
import { Icon } from '../Icon/Icon';

export type ButtonProps = {
    variant?: Variant;
    leftIcon?: ReactNode | IconName;
    rightIcon?: ReactNode | IconName;
} & ButtonOrLinkProps;

const disabledStyles = tw`aria-disabled:bg-grey-300 aria-disabled:border-grey-300 aria-disabled:focus:border-grey-100 aria-disabled:cursor-default`;

const typeColors: Record<Variant, string> = {
    solid: tw`${disabledStyles} border-2 border-blue-600 bg-blue-600 text-white hover:border-blue-800 hover:bg-blue-800 focus:border-blue-400`,
    light: tw`${disabledStyles} border-2 border-blue-200 bg-blue-200 text-blue-800 hover:border-blue-300 hover:bg-blue-300 focus:border-blue-50`,
    outline: tw`${disabledStyles} border-grey-300 border-2 bg-white text-blue-800 hover:border-blue-600 hover:bg-blue-600 focus:border-blue-500 [&:not([aria-disabled])]:hover:text-white`,
    link: tw`aria-disabled:text-grey-500 aria-disabled:focus:border-grey-300 border-2 border-transparent text-blue-700 focus:border-blue-100  aria-disabled:cursor-default dark:text-white [&:not([aria-disabled])]:hover:underline`,
};

export const Button = ({
    variant = 'solid',
    children,
    className,
    leftIcon,
    rightIcon,
    ...rest
}: ButtonProps) => {
    return (
        <ButtonOrLink
            className={twMerge(
                `text-md inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold outline-none`,
                typeColors[variant],
                !!leftIcon && 'pl-4',
                !!rightIcon && 'pr-4',
                className
            )}
            {...rest}
        >
            {!!leftIcon && (
                <span className="me-2 inline-flex shrink-0 self-center text-[1.5em]">
                    {isIconName(leftIcon) ? <Icon name={leftIcon} /> : leftIcon}
                </span>
            )}
            {children}
            {!!rightIcon && (
                <span className="ms-2 inline-flex shrink-0 self-center text-[1.5em]">
                    {isIconName(rightIcon) ? <Icon name={rightIcon} /> : rightIcon}
                </span>
            )}
        </ButtonOrLink>
    );
};
