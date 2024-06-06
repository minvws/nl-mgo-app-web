import { type ReactElement, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Card, type CardProps } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { Stack } from '../Stack/Stack';
import { cn, focusStyle } from '../../utils';

export interface HealthcareOrganizationButtonProps extends Omit<CardProps, 'title' | 'asChild'> {
    title: ReactNode;
    subTitle?: ReactNode;
    meta?: ReactNode;
    icon: Extract<IconName, 'add' | 'chevron-right' | 'delete'>;
    iconAriaLabel: string;
    isAdded?: boolean;
}

export const HealthcareOrganizationButton = ({
    title,
    subTitle,
    meta,
    className,
    icon,
    iconAriaLabel,
    children,
    ...rest
}: HealthcareOrganizationButtonProps) => {
    const iconMap: Record<HealthcareOrganizationButtonProps['icon'], ReactElement> = {
        add: <Icon icon={icon} className="text-sky-blue-600 h-8 w-8" aria-label={iconAriaLabel} />,
        'chevron-right': (
            <Icon icon={icon} className="h-8 w-8 text-gray-500" aria-label={iconAriaLabel} />
        ),
        delete: <Icon icon={icon} className="h-6 w-6 text-gray-500" aria-label={iconAriaLabel} />,
    };

    return (
        <Card
            className={cn(
                'flex cursor-pointer flex-row gap-4 border-gray-200 hover:bg-gray-50 dark:border-gray-500 dark:hover:bg-gray-700',
                focusStyle,
                className
            )}
            asChild
            {...rest}
        >
            <button>
                <Stack className="text-md flex-grow items-start gap-0 text-left">
                    <span className="mb-1 font-bold text-black dark:text-white">{title}</span>
                    {subTitle && (
                        <span className="text-gray-950 dark:text-gray-100 ">{subTitle}</span>
                    )}
                    {meta && (
                        <span className="italic text-gray-600  dark:text-gray-300">{meta}</span>
                    )}
                    {children}
                </Stack>
                <div
                    className={twMerge(
                        'flex self-stretch',
                        icon === 'delete' ? 'items-start' : 'items-center'
                    )}
                >
                    {iconMap[icon]}
                </div>
            </button>
        </Card>
    );
};
