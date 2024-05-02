import { type HTMLAttributes } from 'react';
import { RecordLabel } from './RecordLabel';
import { RecordDescription } from './RecordDescription';
import { RecordDate } from './RecordDate';
import { Stack } from '../Stack/Stack';
import { twMerge } from 'tailwind-merge';

export interface RecordProps extends HTMLAttributes<HTMLDivElement> {}

export const Record = ({ children, className, ...rest }: RecordProps) => {
    return (
        <Stack className={twMerge('gap-1', className)} {...rest}>
            {children}
        </Stack>
    );
};

Record.Label = RecordLabel;
Record.Description = RecordDescription;
Record.Date = RecordDate;
