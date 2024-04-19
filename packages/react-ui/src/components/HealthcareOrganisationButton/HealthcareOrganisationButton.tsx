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
    iconName: Extract<IconName, 'Add' | 'Delete'>;
    iconLabel: string;
}

export const HealthcareOrganisationButton = ({
    title,
    subTitle,
    meta,
    className,
    iconName,
    iconLabel,
    ...rest
}: HealthcareOrganisationButtonProps) => {
    return (
        <Card
            className={twMerge(
                'hover:bg-grey-50 dark:hover:bg-grey-700 flex cursor-pointer flex-row gap-4',
                className
            )}
            asChild
            {...rest}
        >
            <button>
                <Stack className="flex-grow items-start gap-0 text-left text-lg">
                    <span className="font-bold text-black dark:text-white">{title}</span>
                    {subTitle && (
                        <span className="text-grey-950 dark:text-grey-100 ">{subTitle}</span>
                    )}
                    {meta && (
                        <span className="text-grey-600 dark:text-grey-300  italic">{meta}</span>
                    )}
                </Stack>

                {iconName === 'Add' ? (
                    <div className="flex items-center self-stretch">
                        <Icon name={iconName} className="h-8 w-8 text-blue-600" label={iconLabel} />
                    </div>
                ) : (
                    <div className="flex items-start self-stretch">
                        <Icon name={iconName} className="text-grey-500 h-8 w-8" label={iconLabel} />
                    </div>
                )}
            </button>
        </Card>
    );
};
