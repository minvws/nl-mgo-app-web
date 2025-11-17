import { Slottable } from '@radix-ui/react-slot';
import { type HTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Card } from '../Card/Card';

type Details = {
    readonly title: string;
    readonly description?: string;
};

export type ButtonCardProps = HTMLAttributes<HTMLElement> &
    CompositionPropsWithoutChildren &
    Details;

export const ButtonCard = ({
    title,
    description,
    className,
    asChild,
    children,
    ...rest
}: ButtonCardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Card
            asChild
            className={cn(
                'cursor-pointer transition-colors duration-200',
                'flex items-center p-4 text-left break-all md:p-6',
                'hover:bg-gray-50',
                'dark:bg-gray-900 hover:dark:bg-gray-700',
                focusStyle,
                className
            )}
            {...rest}
        >
            <Comp>
                <Slottable>{children}</Slottable>

                <div className="flex grow flex-col">
                    <Stack className="flex flex-col gap-1">
                        <Text size="lg" className="font-bold">
                            {title}
                        </Text>
                        {description && (
                            <Text className="text-t-label-secondary">{description}</Text>
                        )}
                    </Stack>
                </div>
                <Icon icon="chevron_right" className="h-8 w-8 shrink-0 fill-gray-500" />
            </Comp>
        </Card>
    );
};
