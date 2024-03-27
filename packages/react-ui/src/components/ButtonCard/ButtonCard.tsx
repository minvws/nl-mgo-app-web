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
import { twMerge } from 'tailwind-merge';
import { Stack } from '../Stack/Stack';
import { Slottable } from '@radix-ui/react-slot';

export type ButtonCardProps = HTMLAttributes<HTMLElement> &
    CompositionPropsWithoutChildren &
    OptionalPropsWhenFlagIsTrue<
        {
            isLoading?: boolean;
            title: string;
            description: string;
            icon: IconName;
            iconLabel?: string;
        },
        'isLoading'
    >;

export const ButtonCard = ({
    isLoading = false,
    title,
    description,
    icon,
    iconLabel,
    className,
    asChild,
    children,
    ...rest
}: ButtonCardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            className={twMerge(
                'border-grey-100 dark:bg-grey-900 dark:border-grey-500 flex w-full gap-4 border-b bg-white py-4 pl-4 pr-2 text-left',
                isLoading && 'cursor-progress',
                className
            )}
            {...rest}
        >
            <Slottable>{children}</Slottable>
            <SkeletonCircle isLoading={isLoading}>
                <IconAvatar name={icon} label={iconLabel} />
            </SkeletonCircle>
            <SkeletonText
                className="flex flex-grow flex-col gap-2"
                height="h-8"
                numberOfLines={2}
                isLoading={isLoading}
            >
                <Stack className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-black sm:text-xl md:text-2xl">{title}</h3>
                    <p className="text-grey-500 text-xl font-normal">{description}</p>
                </Stack>
            </SkeletonText>
            {!isLoading && (
                <Icon name="ChevronRight" className="fill-grey-500 h-8 w-8 flex-shrink-0" />
            )}
        </Comp>
    );
};
