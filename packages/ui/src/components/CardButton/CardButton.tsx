import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useComposition, type CompositionProps } from '../../hooks';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { IconName } from '../Icon/icons';

export type CardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    CompositionProps & {
        readonly title: ReactNode;
        readonly description: ReactNode;
        readonly descriptionIcon?: IconName;
        readonly detail?: ReactNode;
    };

export const CardButton = ({
    title,
    description,
    descriptionIcon,
    detail,
    className,
    asChild,
    children,
    ...rest
}: CardButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Card
            asChild
            className={cn(
                'hover:bg-t-bg-tertiary border-0 md:gap-2',
                'flex w-full items-start gap-1 p-4 text-left',
                'cursor-pointer transition-colors duration-200',
                focusStyle,
                className
            )}
        >
            <Comp {...rest}>
                <Slottable>{children}</Slottable>

                <div className="grow">
                    <Text as="div" className="line-clamp-2 font-bold">
                        {title}
                    </Text>
                    <div className="flex items-center gap-1">
                        {descriptionIcon && (
                            <Icon icon={descriptionIcon} className={cn('h-6 w-6 text-gray-400')} />
                        )}
                        <Text as="div" className="text-t-label-secondary">
                            {description}
                        </Text>
                    </div>
                </div>
                <div className="flex items-center text-right">
                    {detail && (
                        <Text size="sm" className="text-t-label-secondary">
                            {detail}
                        </Text>
                    )}

                    <Icon icon="chevron_right" className={cn('h-8 w-8 text-gray-400')} />
                </div>
            </Comp>
        </Card>
    );
};
