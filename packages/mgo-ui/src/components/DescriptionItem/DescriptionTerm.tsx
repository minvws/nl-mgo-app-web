import { twMerge } from 'tailwind-merge';
import { Text, type TextProps } from '../Text/Text';

export interface DescriptionTermProps extends TextProps {}

export const DescriptionTerm = ({ children, className, ...rest }: DescriptionTermProps) => {
    return (
        <Text
            {...rest}
            className={twMerge(
                'mb-1 text-xs text-gray-600 md:text-sm dark:text-gray-200',
                className
            )}
            asChild
        >
            <dt>{children}</dt>
        </Text>
    );
};
