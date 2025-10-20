import { type HTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { tw } from '../../utils/tw/tw';
import { Icon } from '../Icon/Icon';
import { type MenuIcons } from './icons';

export interface NavButtonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    readonly icon: MenuIcons;
}

const defaultStyles = tw`text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`;
const activeStyles = tw`aria-[current=page]:text-sky-blue-700 aria-[current=page]:bg-sky-blue-700 dark:aria-[current=page]:text-sky-blue-300 dark:aria-[current=page]:bg-sky-blue-300 aria-[current=page]:bg-sky-blue-700/10 dark:aria-[current=page]:bg-sky-blue-300/10 aria-[current=page]:font-bold`;

export const NavButton = ({ asChild, icon, children, className, ...rest }: NavButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            className={cn(
                `text-md group flex max-w-full items-center gap-3 overflow-hidden rounded-md p-3 leading-[1.5rem] text-ellipsis whitespace-nowrap outline-hidden`,
                defaultStyles,
                activeStyles,
                focusStyle,
                className
            )}
            {...rest}
        >
            <span className="relative inline-block align-middle text-[1.5rem]">
                <Icon icon={icon} className="group-aria-[current=page]:hidden" />
                <Icon icon={`${icon}-fill`} className="hidden group-aria-[current=page]:block" />
            </span>
            <Slottable>{children}</Slottable>
        </Comp>
    );
};
