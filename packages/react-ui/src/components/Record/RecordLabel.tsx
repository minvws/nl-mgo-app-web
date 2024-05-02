import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RecordLabelProps extends HTMLAttributes<HTMLDivElement> {}

export const RecordLabel = ({ children, className, ...rest }: RecordLabelProps) => {
    return (
        <div
            {...rest}
            className={twMerge(
                'font-sans text-xs font-normal uppercase text-gray-700 dark:text-gray-300',
                className
            )}
        >
            {children}
        </div>
    );
};
