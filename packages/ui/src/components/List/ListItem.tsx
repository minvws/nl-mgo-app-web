import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';

export type ListItemProps = HTMLAttributes<HTMLElement>;
export const ListItem = ({ className, ...rest }: ListItemProps) => {
    return <li className={cn('flex', className)} {...rest} />;
};
