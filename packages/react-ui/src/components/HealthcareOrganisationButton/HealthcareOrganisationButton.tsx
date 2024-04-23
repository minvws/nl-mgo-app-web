import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Card, type CardProps } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { Stack } from '../Stack/Stack';

export interface HealthcareOrganisationButtonProps
    extends Omit<CardProps, 'title' | 'asChild' | 'children'> {
    title: ReactNode;
    subTitle?: ReactNode;
    meta?: ReactNode;
    icon: Extract<IconName, 'add' | 'delete'>;
    iconAriaLabel: string;
}

export const HealthcareOrganisationButton = ({
    title,
    subTitle,
    meta,
    className,
    icon,
    iconAriaLabel,
    ...rest
}: HealthcareOrganisationButtonProps) => {
    return (
        <Card
            className={twMerge(
                'flex cursor-pointer flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-700',
                className
            )}
            asChild
            {...rest}
        >
            <button>
                <Stack className="text-md flex-grow items-start gap-0 text-left">
                    <span className="font-bold text-black dark:text-white">{title}</span>
                    {subTitle && (
                        <span className="text-gray-950 dark:text-gray-100 ">{subTitle}</span>
                    )}
                    {meta && (
                        <span className="italic text-gray-600  dark:text-gray-300">{meta}</span>
                    )}
                </Stack>

                {icon === 'add' ? (
                    <div className="flex items-center self-stretch">
                        <Icon
                            icon={icon}
                            className="text-sky-blue-600 h-8 w-8"
                            aria-label={iconAriaLabel}
                        />
                    </div>
                ) : (
                    <div className="flex items-start self-stretch">
                        <Icon
                            icon={icon}
                            className="h-8 w-8 text-gray-500"
                            aria-label={iconAriaLabel}
                        />
                    </div>
                )}
            </button>
        </Card>
    );
};
