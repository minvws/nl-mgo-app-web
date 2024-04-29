import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
export interface NavButtonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    icon: IconName;
}

const defaultStyles = tw`focus:border-sky-blue-100 border-2 border-transparent text-gray-700 hover:border-gray-50 hover:bg-gray-50 hover:text-gray-700 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`;
const activeStyles = tw`aria-[current=page]:border-2 aria-[current=page]:border-gray-700 aria-[current=page]:bg-gray-700 aria-[current=page]:font-bold aria-[current=page]:text-white aria-[current=page]:dark:border-gray-200 aria-[current=page]:dark:bg-gray-200 aria-[current=page]:dark:text-black`;
const disabledStyles = tw`aria-disabled:cursor-default aria-disabled:text-gray-500 aria-disabled:focus:border-gray-300`;

export const NavButton = ({ asChild, icon, children, className, ...rest }: NavButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });
    return (
        <Comp
            className={twMerge(
                `text-md inline-flex items-center justify-start rounded px-4 py-2 outline-none`,
                defaultStyles,
                activeStyles,
                disabledStyles,
                className
            )}
            {...rest}
        >
            <span className="me-2 inline-flex shrink-0 self-center text-[1.2em]">
                <Icon icon={icon} />
            </span>
            <Slottable>{children}</Slottable>
        </Comp>
    );
};
