import { type MouseEventHandler, type ReactNode } from 'react';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card, type CardProps } from '../Card/Card';
import { type IconName } from '../Icon/icons';
import { IconButton } from '../IconButton/IconButton';
import { Stack } from '../Stack/Stack';

export type HealthcareOrganizationCardProps = Omit<CardProps, 'title' | 'asChild'> & {
    readonly title: ReactNode;
    readonly subTitle?: ReactNode;
    readonly meta?: ReactNode;
    readonly icon: Extract<IconName, 'add' | 'chevron-right' | 'delete'>;
    readonly iconAriaLabel: string;
    readonly onActionClick: MouseEventHandler;
};

export const HealthcareOrganizationCard = ({
    title,
    subTitle,
    meta,
    className,
    icon,
    iconAriaLabel,
    children,
    onActionClick,
    ...rest
}: HealthcareOrganizationCardProps) => {
    return (
        <Card
            className={cn(
                'flex flex-row gap-4 border-gray-200 dark:border-gray-500',
                focusStyle,
                className
            )}
            {...rest}
        >
            <Stack className="text-md flex-grow items-start gap-0 text-left">
                <span className="mb-1 font-bold text-black dark:text-white">{title}</span>
                {subTitle && <span className="text-gray-950 dark:text-gray-100">{subTitle}</span>}
                {meta && <span className="italic text-gray-600 dark:text-gray-300">{meta}</span>}
                {children}
            </Stack>
            <div
                className={cn(
                    'flex self-stretch',
                    icon === 'delete' ? 'items-start' : 'items-center'
                )}
            >
                <IconButton
                    onClick={onActionClick}
                    className={
                        icon === 'add'
                            ? 'text-sky-blue-600 dark:text-sky-blue-600'
                            : 'text-gray-500 dark:text-gray-300'
                    }
                    icon={icon}
                    aria-label={iconAriaLabel}
                />
            </div>
        </Card>
    );
};
