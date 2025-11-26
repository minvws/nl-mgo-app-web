import { type ButtonHTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { HealthCategoryIcon, HealthCategoryIconName } from './HealthCategoryIcon';

export { type HealthCategoryIconName } from './HealthCategoryIcon';

export type HealthCategoryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    CompositionPropsWithoutChildren & {
        readonly icon: HealthCategoryIconName;
        readonly loading?: boolean;
        readonly statusLabel?: string;
        readonly title: string;
        readonly subtitle: string;
    };

export const HealthCategoryButton = ({
    icon,
    loading,
    statusLabel,
    title,
    subtitle,
    onClick,
    className,
    asChild,
    children,
    ...rest
}: HealthCategoryButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Text
            asChild
            className={cn(
                'flex w-full gap-4 p-4 text-left md:gap-2',
                'hover:bg-t-bg-tertiary',
                'cursor-pointer transition-colors duration-200',
                loading && 'cursor-progress',
                focusStyle,
                className
            )}
        >
            <Card asChild>
                <Comp onClick={onClick} {...rest}>
                    <Slottable>{children}</Slottable>

                    {icon && <HealthCategoryIcon icon={icon} />}

                    <div className="flex grow flex-col">
                        <Stack className="gap-1">
                            <Text className="font-bold" role="heading" aria-level={3}>
                                {title}
                                <span className="sr-only">
                                    .{/* creates a break for the voice-over */}
                                </span>
                            </Text>
                            {subtitle && <Text className="text-t-label-secondary">{subtitle}</Text>}
                        </Stack>
                    </div>

                    {loading ? (
                        <Spinner className="size-6" variant="gray" />
                    ) : statusLabel ? (
                        <Text className="text-t-label-secondary text-nowrap">{statusLabel}</Text>
                    ) : (
                        <Icon icon="chevron_right" className={cn('h-8 w-8 text-gray-400')} />
                    )}
                </Comp>
            </Card>
        </Text>
    );
};
