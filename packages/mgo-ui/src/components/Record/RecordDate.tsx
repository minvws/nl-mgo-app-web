import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RecordDateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    value: string;
}

export const RecordDate = ({ value, className, ...rest }: RecordDateProps) => {
    return (
        <div
            {...rest}
            className={twMerge(
                'sm:text-md font-sans text-sm font-normal italic text-gray-500 dark:text-gray-200',
                className
            )}
        >
            {value}
        </div>
    );
};
