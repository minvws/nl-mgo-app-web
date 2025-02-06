import { Slottable } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useComposition } from '../../hooks';
import { type CompositionPropsWithoutChildren } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';

export type MobileMenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    CompositionPropsWithoutChildren & {
        readonly isOpen: boolean;
        readonly openLabel: string;
        readonly closeLabel: string;
    };

export const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(
    function MobileMenuButton({ asChild, isOpen, openLabel, closeLabel, children, ...rest }, ref) {
        const { Comp } = useComposition({ asChild, tag: 'button' });

        return (
            <Comp
                ref={ref}
                className={cn(
                    'flex border p-2 text-sm font-bold leading-none',
                    'border-sky-blue-600 dark:border-light-blue-500 text-sky-blue-600 dark:text-light-blue-500',
                    'hover:bg-sky-blue-600 dark:hover:bg-light-blue-500 hover:text-white dark:hover:text-[#252525]',
                    focusStyle
                )}
                {...rest}
            >
                <Slottable>{children}</Slottable>
                <Icon icon={isOpen ? 'close' : 'menu'} className="mr-2" />
                {isOpen ? closeLabel : openLabel}
            </Comp>
        );
    }
);
