import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
export interface NavButtonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    icon: IconName;
}

const defaultStyles = tw`text-grey-700 hover:border-grey-100 hover:text-grey-700 border-2  border-transparent hover:border-2 hover:bg-white focus:border-blue-100 dark:text-white`;
const activeStyles = tw`aria-[current=page]:border-2 aria-[current=page]:border-blue-700 aria-[current=page]:bg-blue-700 aria-[current=page]:text-white`;
const disabledStyles = tw`aria-disabled:text-grey-500 aria-disabled:focus:border-grey-300 aria-disabled:cursor-default`;

export const NavButton = ({ asChild, icon, children, className, ...rest }: NavButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });
    return (
        <Comp
            className={twMerge(
                `text-md inline-flex items-center justify-start rounded-md px-4 py-2 font-bold outline-none`,
                defaultStyles,
                activeStyles,
                disabledStyles,
                className
            )}
            {...rest}
        >
            <span className="me-2 inline-flex shrink-0 self-center text-[1.5em]">
                <Icon icon={icon} />
            </span>
            <Slottable>{children}</Slottable>
        </Comp>
    );
};
