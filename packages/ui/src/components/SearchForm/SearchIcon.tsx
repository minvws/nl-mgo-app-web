import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn/cn';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';

export type SearchIconProps = HTMLAttributes<HTMLSpanElement> & {
    readonly loading?: boolean;
};

export const SearchIcon = ({ loading, ...rest }: SearchIconProps) => {
    return (
        <span {...rest}>
            {loading ? (
                <Spinner className="size-5" />
            ) : (
                <Icon icon="search" className={cn('size-6', 'text-t-symbol-secondary')} />
            )}
        </span>
    );
};
