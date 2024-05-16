import { twMerge } from 'tailwind-merge';
import { Text, type TextProps } from '../Text/Text';

export interface RecordLabelProps extends TextProps {}

export const RecordLabel = ({ children, className, ...rest }: RecordLabelProps) => {
    return (
        <Text
            {...rest}
            className={twMerge('uppercase text-gray-700 dark:text-gray-300', className)}
        >
            {children}
        </Text>
    );
};
