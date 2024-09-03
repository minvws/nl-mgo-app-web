import { type ButtonHTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { cn, focusStyle } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { Text } from '../Text/Text';

type CategoryIcon = Extract<IconName, 'pill' | 'diagnosis' | 'labs' | 'folder'>;

const iconColors: Record<CategoryIcon, string> = {
    pill: 'text-dark-blue-500',
    diagnosis: 'text-ruby-500',
    labs: 'text-pink-500',
    folder: 'text-brown-700',
};

export interface CategoryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        CompositionProps {
    readonly icon?: CategoryIcon;
    readonly iconAriaLabel?: string;
    readonly label?: string;
    readonly isLoading?: boolean;
    readonly loadingText?: string;
    readonly isDisabled?: boolean;
    readonly disabled?: never; // Please use `isDisabled` instead
    readonly 'aria-disabled'?: never; // Please use `isDisabled` instead
}

export const CategoryButton = ({
    icon,
    iconAriaLabel,
    label,
    loadingText,
    isLoading = false,
    isDisabled = false,
    onClick,
    className,
    asChild,
    children,
    ...rest
}: CategoryButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    isDisabled = isDisabled || isLoading;

    return (
        <Text asChild>
            <Card asChild>
                <Comp
                    className={cn(
                        'aria-disabled:cursor-default',
                        'border-0 p-0 shadow-none',
                        'flex w-full items-center gap-4 p-4 text-left',
                        !isDisabled && 'hover:bg-gray-100 dark:hover:bg-[#444444]',
                        isLoading && 'cursor-progress',
                        focusStyle,
                        className
                    )}
                    onClick={isDisabled ? undefined : onClick}
                    aria-disabled={isDisabled}
                    {...rest}
                >
                    {icon && (
                        <Icon
                            icon={icon}
                            aria-label={iconAriaLabel}
                            className={cn('h-8 w-8', iconColors[icon])}
                        />
                    )}

                    <Slottable>{children}</Slottable>

                    {isLoading ? (
                        <div className="ml-auto flex items-center gap-2">
                            <Text className="text-nowrap text-gray-600 dark:text-gray-200">
                                {loadingText}
                            </Text>
                            <Icon
                                icon="spinner"
                                className={cn('h-8 w-8 animate-spin fill-transparent')}
                            />
                        </div>
                    ) : (
                        <div className="ml-auto flex items-center gap-2">
                            {label && (
                                <Text className="self-end text-nowrap text-gray-600 dark:text-gray-200">
                                    {label}
                                </Text>
                            )}

                            {!isDisabled && (
                                <Icon
                                    icon="chevron-right"
                                    className={cn('h-8 w-8 text-gray-400')}
                                />
                            )}
                        </div>
                    )}
                </Comp>
            </Card>
        </Text>
    );
};
