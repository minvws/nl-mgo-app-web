import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type MobileMenuButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    readonly isOpen: boolean;
    readonly openLabel: string;
    readonly closeLabel: string;
};

export const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(
    function MobileMenuButton({ isOpen, openLabel, closeLabel, ...rest }, ref) {
        return (
            <Text
                size="md"
                asChild
                className={cn(
                    'cursor-pointer',
                    `relative inline-flex items-center justify-center`,
                    'rounded-sm p-2 font-bold',
                    'transition-colors duration-200',
                    'text-t-action-ghost-default-text hover:text-t-action-ghost-hover-text active:text-t-action-ghost-active-text',
                    'border-t-action-ghost-default-text hover:border-t-action-ghost-hover-text active:border-t-action-ghost-active-text border',
                    'hover:bg-t-action-ghost-hover-bg',
                    focusStyle
                )}
            >
                <button ref={ref} {...rest}>
                    <Icon icon={isOpen ? 'close' : 'menu'} className="me-2" />
                    {isOpen ? closeLabel : openLabel}
                </button>
            </Text>
        );
    }
);
