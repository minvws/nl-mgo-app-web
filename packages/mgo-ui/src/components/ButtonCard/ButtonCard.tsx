import { type HTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { IconAvatar } from '../IconAvatar/IconAvatar';
import { Icon } from '../Icon/Icon';
import { SkeletonCircle, SkeletonText } from '../Skeleton';
import { type OptionalPropsWhenFlagIsTrue } from '../../types/OptionalPropsWhenFlagIsTrue';
import { type IconName } from '../Icon/icons';
import { Stack } from '../Stack/Stack';
import { Slottable } from '@radix-ui/react-slot';
import { Text } from '../Text/Text';
import { cn, focusStyle } from '../../utils';

export type ButtonCardProps = HTMLAttributes<HTMLElement> &
    CompositionPropsWithoutChildren &
    OptionalPropsWhenFlagIsTrue<
        {
            isLoading?: boolean;
            title: string;
            description?: string;
            icon?: IconName;
            iconAriaLabel?: string;
        },
        'isLoading'
    >;

export const ButtonCard = ({
    isLoading = false,
    title,
    description,
    icon,
    iconAriaLabel,
    className,
    asChild,
    children,
    ...rest
}: ButtonCardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            className={cn(
                'flex w-full border-b border-gray-100 bg-white p-4 text-left hover:bg-gray-50 aria-[current=page]:bg-gray-50 md:p-6 dark:border-gray-500 dark:bg-gray-900 hover:dark:bg-gray-700 aria-[current=page]:dark:bg-gray-700',
                isLoading && 'cursor-progress',
                focusStyle,
                className
            )}
            {...rest}
        >
            <Slottable>{children}</Slottable>
            {icon && (
                <SkeletonCircle isLoading={isLoading} className="mr-4">
                    <IconAvatar icon={icon} aria-label={iconAriaLabel} />
                </SkeletonCircle>
            )}
            <SkeletonText
                className="flex flex-grow flex-col justify-center gap-1 sm:gap-2"
                height="h-6 sm:h-8"
                numberOfLines={2}
                isLoading={isLoading}
            >
                <Stack className="flex flex-col gap-1">
                    <span className="text-md font-bold text-black sm:text-lg md:text-xl dark:text-white">
                        {title}
                    </span>
                    {description && (
                        <Text className="text-gray-600 dark:text-gray-400">{description}</Text>
                    )}
                </Stack>
            </SkeletonText>
            {!isLoading && (
                <Icon icon="chevron-right" className="h-8 w-8 flex-shrink-0 fill-gray-500" />
            )}
        </Comp>
    );
};
