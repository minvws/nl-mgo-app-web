import { type ReactNode, type ButtonHTMLAttributes, useContext } from 'react';
import { type CompositionProps, useComposition } from '../../hooks';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';
import { Card } from '../Card/Card';
import { type Gap } from './gap';
import { DetailListContext } from './DetailListContext';

export type DetailListButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    CompositionProps & {
        readonly title: ReactNode;
        readonly description: ReactNode;
        readonly date?: ReactNode;
        readonly icon: IconName;
    };

export const DetailListButton = ({
    title,
    description,
    date,
    icon,
    className,
    asChild,
    children,
    ...rest
}: DetailListButtonProps) => {
    const { gap } = useContext(DetailListContext);
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    const cardGapMap: Record<Gap, string> = {
        normal: '',
        line: 'rounded-none first:rounded-t-lg last:rounded-b-lg',
    };

    return (
        <Card
            className={cn(
                'overflow-hidden border-none p-0 shadow-none hover:bg-gray-100 md:gap-2 dark:hover:bg-[#444444]',
                cardGapMap[gap]
            )}
        >
            <Comp
                className={cn('flex w-full items-center gap-1 p-4 text-left', className)}
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
                    <Icon icon={icon} className={cn('h-8 w-8 text-gray-400')} />
                </div>
            </Comp>
        </Card>
    );
};
