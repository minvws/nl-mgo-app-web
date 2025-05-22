import { type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';
import { useUniqueId } from '../../hooks';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { IconButton } from '../IconButton/IconButton';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

export type HealthcareOrganizationCardProps = Omit<ComponentProps<'div'>, 'children'> & {
    readonly title: ReactNode;
    readonly titleTag?: Extract<'h2' | 'h3' | 'h4', keyof HTMLElementTagNameMap>;
    readonly subTitle?: ReactNode;
    readonly meta?: ReactNode;
    readonly infoMessage?: string;
    readonly checkMessage?: string;
} & (
        | {
              readonly icon: Extract<IconName, 'add' | 'chevron-right' | 'delete'>;
              readonly iconAriaLabel: string;
              readonly onActionClick: MouseEventHandler;
          }
        | {
              readonly icon?: never;
              readonly iconAriaLabel?: never;
              readonly onActionClick?: never;
          }
    );

export const HealthcareOrganizationCard = ({
    title,
    titleTag = 'h2',
    subTitle,
    meta,
    className,
    icon,
    iconAriaLabel,
    infoMessage,
    checkMessage,
    onActionClick,
    ...rest
}: HealthcareOrganizationCardProps) => {
    const uniqueId = useUniqueId('healthcare_organization_card');
    const TitleComp = titleTag;

    return (
        <Card
            className={cn('border-gray-200 dark:border-gray-500', focusStyle, className)}
            {...rest}
        >
            <div className="flex flex-row gap-4">
                <Stack className="text-md flex-grow items-start gap-0 text-left">
                    <TitleComp id={uniqueId} className="font-bold text-black dark:text-white">
                        {title}
                    </TitleComp>
                    {subTitle && (
                        <span className="whitespace-pre-wrap break-all text-gray-950 dark:text-gray-100">
                            {subTitle}
                        </span>
                    )}
                    {meta && (
                        <span className="whitespace-pre-wrap break-all text-gray-600 dark:text-gray-300">
                            {meta}
                        </span>
                    )}
                </Stack>

                {icon && (
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
                            variant="ghost"
                            aria-label={iconAriaLabel}
                            aria-labelledby={uniqueId}
                        />
                    </div>
                )}
            </div>

            <div>
                {infoMessage && (
                    <Text
                        className="text-dark-blue-700 dark:text-dark-blue-300 mt-2 flex flex-row items-start gap-2 font-bold"
                        size="sm"
                    >
                        <Icon icon="info-fill" className="text-xl" />
                        {infoMessage}
                    </Text>
                )}
                {checkMessage && (
                    <Text
                        className="dark:text-dark-green-400 mt-2 flex flex-row items-center gap-2 font-bold text-green-700"
                        size="sm"
                    >
                        <Icon icon="check-fill" className="text-xl" />
                        {checkMessage}
                    </Text>
                )}
            </div>
        </Card>
    );
};
