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
    readonly subTitle?: ReactNode;
    readonly meta?: ReactNode;
    readonly infoMessage?: string;
    readonly checkMessage?: string;
} & (
        | {
              readonly icon: Extract<IconName, 'add' | 'chevron_right' | 'delete'>;
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

    return (
        <Card className={cn('bg-t-bg-secondary', focusStyle, className)} {...rest}>
            <div className="flex flex-row gap-4">
                <Stack className="grow items-start gap-0 text-left">
                    <Text as="h2" className="text-t-label-primary font-bold">
                        {title}
                    </Text>
                    {subTitle && (
                        <Text className="text-t-label-secondary break-all whitespace-pre-wrap">
                            {subTitle}
                        </Text>
                    )}
                    {meta && (
                        <Text className="text-t-label-secondary break-all whitespace-pre-wrap">
                            {meta}
                        </Text>
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
                                    ? 'text-t-cat-rijkslint'
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
                    <Text className="text-t-state-informative mt-2 flex flex-row items-start gap-2 font-bold">
                        <Icon icon="info-fill" className="text-xl" />
                        {infoMessage}
                    </Text>
                )}
                {checkMessage && (
                    <Text className="text-t-state-confirmation mt-2 flex flex-row items-center gap-2 font-bold">
                        <Icon icon="check-fill" className="text-xl" />
                        {checkMessage}
                    </Text>
                )}
            </div>
        </Card>
    );
};
