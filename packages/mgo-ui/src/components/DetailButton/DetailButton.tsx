import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useComposition, type CompositionProps } from '../../hooks';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';

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
            className={cn(
                'border-0 p-0 shadow-none hover:bg-gray-100 md:gap-2 dark:hover:bg-[#444444]'
            )}
            asChild
        >
            <Comp
                className={cn(
                    'flex w-full items-center gap-1 p-4 text-left',
                    focusStyle,
                    className
                )}
                {...rest}
            >
                <Slottable>{children}</Slottable>

                <div className="md:text-md flex-grow text-sm">
                    <div className="font-bold">{title}</div>
                    <div>{description}</div>
                </div>
                <div className="flex items-center text-right">
                    {date && (
                        <span className="text-xs text-gray-600 md:text-sm dark:text-gray-200">
                            {date}
                        </span>
                    )}
                    <Icon icon="chevron-right" className={cn('h-8 w-8 text-gray-400')} />
                </div>
            </Comp>
        </Card>
    );
};
