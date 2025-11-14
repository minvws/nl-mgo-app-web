import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';
import { Variant } from './variants';

export type DescriptionNoticeProps = HTMLAttributes<HTMLDivElement> & {
    readonly variant: Variant;
};

export const DescriptionNotice = ({
    className,
    children,
    variant,
    ...rest
}: DescriptionNoticeProps) => {
    return (
        <Card
            className={cn('rounded-none rounded-t-lg rounded-b-lg border-0 p-8', className)}
            {...rest}
        >
            <Stack className="items-center gap-3">
                <Icon
                    icon="info-fill"
                    className={cn('h-10 w-10', {
                        'fill-t-state-informative': variant === 'info',
                        'fill-t-state-critical': variant === 'error',
                    })}
                />
                {children}
            </Stack>
        </Card>
    );
};
