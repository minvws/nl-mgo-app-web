import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Text } from '../Text/Text';
import { ListIcon } from './ListIcon';
import { ListItem } from './ListItem';

export interface ListProps extends HTMLAttributes<HTMLElement> {
    readonly as?: 'ul' | 'ol';
}

export const List = ({ className, as = 'ul', children, ...rest }: ListProps) => {
    const Comp = as;

    return (
        <Text asChild className={cn('flex flex-col gap-6', className)}>
            <Comp {...rest}>{children}</Comp>
        </Text>
    );
};

List.Item = ListItem;
List.Icon = ListIcon;
