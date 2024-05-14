import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RecordDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

export const RecordDescription = ({ children, className, ...rest }: RecordDescriptionProps) => {
    return (
        <div
            {...rest}
            className={twMerge(
                'sm:text-md font-sans text-sm font-normal text-black dark:text-white',
                className
            )}
        >
            {children}
        </div>
    );
};
