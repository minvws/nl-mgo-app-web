import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';
import { Variant } from './variants';

export type NoticeProps = HTMLAttributes<HTMLDivElement> & {
    readonly variant: Variant;
};

export const Notice = ({ className, children, variant, ...rest }: NoticeProps) => {
    return (
        <Card
            className={cn(
                'rounded-none rounded-t-lg rounded-b-lg border-0 p-8 text-center',
                className
            )}
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
