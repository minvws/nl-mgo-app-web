import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ListItemProps extends HTMLAttributes<HTMLElement> {}
export const ListItem = ({ className, ...rest }: ListItemProps) => {
    return <li className={twMerge(className)} {...rest} />;
};
