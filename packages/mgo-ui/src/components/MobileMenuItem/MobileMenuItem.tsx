import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon, type IconProps } from '../Icon/Icon';

export type MobileMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> &
    IconProps &
    CompositionProps;

export const MobileMenuItem = forwardRef<HTMLButtonElement, MobileMenuItemProps>(
    function MobileMenuItem({ icon, asChild, children, ...rest }, ref) {
        const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

        return (
            <Comp
                ref={ref}
                className={cn(
                    [focusStyle, '-outline-offset-[2px]'],
                    'text-md flex items-center gap-4 border-b p-4',
                    'border-[#F7F7F7] bg-white text-gray-600 hover:bg-gray-100',
                    'dark:border-[#2C2C2C] dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-[#444444]',
                    'aria-[current=page]:text-dark-blue-700 aria-[current=page]:bg-[#007BC71F] aria-[current=page]:font-bold',
                    'dark:aria-[current=page]:text-light-blue-500 dark:aria-[current=page]:bg-[#007BC73D]'
                )}
                {...rest}
            >
                <Icon icon={icon} className="h-8 w-8" />
                <Slottable>{children}</Slottable>
            </Comp>
        );
    }
);
