import { type HTMLAttributes, type ReactNode } from 'react';
import { type Variant } from './variants';
import { isIconName, type IconName } from '../Icon/icons';
import { Icon } from '../Icon/Icon';
import { twMerge } from 'tailwind-merge';
import { tw } from '../../utils/tw/tw';
import { type CompositionProps, useComposition } from '../../hooks/useComposition/useComposition';
export interface NavButtonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    variant?: Variant;
    icon: ReactNode | IconName;
}

const typeColors: Record<Variant, string> = {
    solid: tw`border-grey-100 text-grey-700 border-2 bg-white hover:border-blue-700 hover:bg-blue-700 hover:text-white focus:border-blue-50`,
    link: tw`aria-disabled:text-grey-500 aria-disabled:focus:border-grey-300 text-grey-700 border-2 border-transparent focus:border-blue-100  aria-disabled:cursor-default dark:text-white [&:not([aria-disabled])]:hover:underline`,
};

const activeStyles = tw`aria-[current=page]:border-2 aria-[current=page]:border-blue-700 aria-[current=page]:bg-blue-700 aria-[current=page]:text-white`;

export const NavButton = ({
    asChild,
    variant = 'solid',
    icon,
    children,
    className,
    ...rest
}: NavButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });
    return (
        <Comp
            className={twMerge(
                `text-md inline-flex items-center justify-start rounded-md px-4 py-2 font-bold outline-none`,
                typeColors[variant],
                activeStyles,
                className
            )}
            {...rest}
        >
            <span className="me-2 inline-flex shrink-0 self-center text-[1.5em]">
                {isIconName(icon) ? <Icon name={icon} /> : icon}
            </span>
            <Slottable>{children}</Slottable>
        </Comp>
    );
};
