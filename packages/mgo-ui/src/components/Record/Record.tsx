import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Stack } from '../Stack/Stack';
import { RecordDescription } from './RecordDescription';
import { RecordLabel } from './RecordLabel';

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
