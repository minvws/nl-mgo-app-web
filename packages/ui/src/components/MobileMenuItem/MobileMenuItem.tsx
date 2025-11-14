import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon, type IconProps } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type MobileMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> &
    IconProps &
    CompositionProps;

export const MobileMenuItem = forwardRef<HTMLButtonElement, MobileMenuItemProps>(
    function MobileMenuItem({ icon, asChild, children, ...rest }, ref) {
        const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

        return (
            <Text
                size="md"
                asChild
                className={cn(
                    'flex cursor-pointer items-center gap-4 p-4',
                    'text-t-label-secondary bg-t-bg-secondary hover:bg-gray-100',
                    'border-t-seperator-secondary border-b',
                    'dark:text-gray-200 dark:hover:bg-[#444444]',
                    [
                        'aria-[current=page]:font-bold',
                        'aria-[current=page]:text-logo-blue-500',
                        'dark:aria-[current=page]:text-logo-blue-300',
                    ],
                    'transition-colors duration-200',
                    [focusStyle, '-outline-offset-[2px]']
                )}
            >
                <Comp ref={ref} {...rest}>
                    <Icon icon={icon} className="h-8 w-8" />
                    <Slottable>{children}</Slottable>
                </Comp>
            </Text>
        );
    }
);
