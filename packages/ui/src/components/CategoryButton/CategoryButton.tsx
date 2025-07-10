import { type ButtonHTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { Spinner } from '../Spinner/Spinner';
import { Text } from '../Text/Text';

type CategoryIcon = Extract<
    IconName,
    | 'person'
    | 'stethoscope'
    | 'event-note'
    | 'diagnosis'
    | 'nutrition'
    | 'emergency-home'
    | 'allergy'
    | 'pill'
    | 'folder'
    | 'syringe'
    | 'labs'
    | 'date-range'
    | 'vital-signs'
    | 'medical-services'
    | 'health-and-safety'
    | 'sentiment-satisfied'
>;

const iconColors: Record<CategoryIcon, string> = {
    person: 'text-gray-400',
    stethoscope: 'text-violet-800',
    'event-note': 'text-mint-500',
    diagnosis: 'text-pink-500',
    folder: 'text-[#94710A]',
    nutrition: 'text-[#34C759]',
    'emergency-home': 'text-yellow-500',
    allergy: 'text-orange-600',
    pill: 'text-dark-blue-700',
    syringe: 'text-light-blue-500',
    labs: 'text-ruby-700',
    'date-range': 'text-dark-brown-800',
    'vital-signs': 'text-dark-green-700',
    'medical-services': 'text-purple-800',
    'health-and-safety': 'text-lint-blue-700',
    'sentiment-satisfied': 'text-sky-blue-600',
};

export interface CategoryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        CompositionProps {
    readonly icon?: CategoryIcon;
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

                            <Icon icon="chevron-right" className={cn('h-8 w-8 text-gray-400')} />
                        </div>
                    )}
                </Comp>
            </Card>
        </Text>
    );
};
