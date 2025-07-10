import { Slottable } from '@radix-ui/react-slot';
import { type HTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { SkeletonText } from '../Skeleton';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

type Details = {
    readonly title: string;
    readonly description?: string;
};

export type ButtonCardProps = HTMLAttributes<HTMLElement> &
    CompositionPropsWithoutChildren &
    (
        | (Details & { readonly isLoading?: false })
        | (Partial<Details> & { readonly isLoading: true })
    );

export const ButtonCard = ({
    isLoading = false,
    title,
    description,
    className,
    asChild,
    children,
    ...rest
}: ButtonCardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp
            className={cn(
                'flex w-full break-all border-b border-gray-100 bg-white p-4 text-left hover:bg-gray-50 aria-[current=page]:bg-gray-50 md:p-6 dark:border-gray-500 dark:bg-gray-900 hover:dark:bg-gray-700 aria-[current=page]:dark:bg-gray-700',
                isLoading && 'cursor-progress',
                focusStyle,
                className
            )}
            {...rest}
        >
            <Slottable>{children}</Slottable>

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
