import { type ButtonHTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { Spinner } from '../Spinner/Spinner';
import { Text } from '../Text/Text';

export type CategoryButtonIcon = Extract<
    IconName,
    | 'health_cross'
    | 'allergy'
    | 'emergency_home'
    | 'syringe'
    | 'nutrition'
    | 'psychology'
    | 'vital_signs'
    | 'labs'
    | 'medical_services'
    | 'pill'
    | 'calendar_today'
    | 'folder'
    | 'patient_list'
    | 'health_and_safety'
    | 'person'
    | 'account_balance'
>;

const iconColors: Record<CategoryButtonIcon, string> = {
    health_cross: 'text-gray-400',
    allergy: 'text-violet-800',
    emergency_home: 'text-mint-500',
    syringe: 'text-pink-500',
    nutrition: 'text-[#94710A]',
    psychology: 'text-[#34C759]',
    vital_signs: 'text-yellow-500',
    labs: 'text-orange-600',
    medical_services: 'text-dark-blue-700',
    pill: 'text-light-blue-500',
    calendar_today: 'text-ruby-700',
    folder: 'text-dark-brown-800',
    patient_list: 'text-dark-green-700',
    health_and_safety: 'text-purple-800',
    person: 'text-lint-blue-700',
    account_balance: 'text-sky-blue-600',
};

export interface CategoryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        CompositionProps {
    readonly icon?: CategoryButtonIcon;
    readonly iconAriaLabel?: string;
    readonly label?: string;
    readonly isLoading?: boolean;
    readonly loadingText?: string;
}

export const CategoryButton = ({
    icon,
    iconAriaLabel,
    label,
    loadingText,
    isLoading = false,
    onClick,
    className,
    asChild,
    children,
    ...rest
}: CategoryButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Text asChild>
            <Card asChild>
                <Comp
                    className={cn(
                        'border-0 p-0 shadow-none',
                        'flex w-full items-center gap-4 p-4 text-left',
                        isLoading && 'cursor-progress',
                        focusStyle,
                        className
                    )}
                    onClick={isLoading ? undefined : onClick}
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
                            <Spinner className="size-6" variant="gray" />
                        </div>
                    ) : (
                        <div className="ml-auto flex items-center gap-2">
                            {label && (
                                <Text className="self-end text-nowrap text-gray-600 dark:text-gray-200">
                                    {label}
                                </Text>
                            )}

                            <Icon icon="chevron_right" className={cn('h-8 w-8 text-gray-400')} />
                        </div>
                    )}
                </Comp>
            </Card>
        </Text>
    );
};
