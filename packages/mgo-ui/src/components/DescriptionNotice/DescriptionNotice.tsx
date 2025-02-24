import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon, type IconProps } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';

export type DescriptionNoticeProps = HTMLAttributes<HTMLDivElement> &
    IconProps & {
        readonly iconClassName?: string;
    };

export const DescriptionNotice = ({
    icon,
    iconClassName,
    className,
    children,
    ...rest
}: DescriptionNoticeProps) => {
    return (
        <Card
            className={cn(
                'rounded-none border-0 p-8 shadow-none first:rounded-t-lg last:rounded-b-lg',
                className
            )}
            {...rest}
        >
            <Stack className="items-center gap-2">
                <Icon icon={icon} className={cn('h-10 w-10', iconClassName)} />
                {children}
            </Stack>
        </Card>
    );
};
