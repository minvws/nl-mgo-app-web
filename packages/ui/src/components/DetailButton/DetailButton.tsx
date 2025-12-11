import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useComposition, type CompositionProps } from '../../hooks';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type DetailButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    CompositionProps & {
        readonly title: ReactNode;
        readonly description: ReactNode;
        readonly date?: ReactNode;
    };

export const DetailButton = ({
    title,
    description,
    date,
    className,
    asChild,
    children,
    ...rest
}: DetailButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Card
            asChild
            className={cn(
                'hover:bg-t-bg-tertiary border-0 md:gap-2',
                'flex w-full items-center gap-1 p-4 text-left',
                'cursor-pointer transition-colors duration-200',
                focusStyle,
                className
            )}
        >
            <Comp {...rest}>
                <Slottable>{children}</Slottable>

                <div className="grow">
                    <Text as="div" className="font-bold">
                        {title}
                    </Text>
                    <Text as="div" className="text-t-label-secondary">
                        {description}
                    </Text>
                </div>
                <div className="flex items-center text-right">
                    {date && (
                        <Text size="sm" className="text-t-label-primary">
                            {date}
                        </Text>
                    )}
                    <Icon icon="chevron_right" className={cn('h-8 w-8 text-gray-400')} />
                </div>
            </Comp>
        </Card>
    );
};
