import { type HTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { type MenuIcons } from './icons';

export interface NavButtonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    readonly icon: MenuIcons;
}

export const NavButton = ({ asChild, icon, children, className, ...rest }: NavButtonProps) => {
    const { Comp, composeWrappedSlottable } = useComposition({ asChild, tag: 'button' });

    const Label = composeWrappedSlottable({
        asChild,
        children,
        wrapperProps: {
            className: 'min-w-0 truncate',
        },
    });

    return (
        <Text
            asChild
            size="md"
            className={cn(
                `group flex max-w-full items-center`,
                'gap-3 p-3',
                'cursor-pointer rounded-lg outline-hidden',
                'text-t-label-secondary',
                'hover:bg-t-bg-tertiary',
                [
                    'aria-[current=page]:text-t-action-solid-default-bg',
                    'aria-[current=page]:bg-logo-blue-500',
                    'aria-[current=page]:bg-logo-blue-500/15',
                    'aria-[current=page]:font-bold',
                    'dark:aria-[current=page]:bg-logo-blue-300',
                    'dark:aria-[current=page]:bg-logo-blue-300/15',
                ],
                focusStyle,
                className
            )}
        >
            <Comp {...rest}>
                <span className="relative inline-block align-middle text-[1.5rem]">
                    <Icon icon={icon} className="group-aria-[current=page]:hidden" />
                    <Icon
                        icon={`${icon}-fill`}
                        className="hidden group-aria-[current=page]:block"
                    />
                </span>

                {Label}
            </Comp>
        </Text>
    );
};
