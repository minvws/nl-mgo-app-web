import { twMerge } from 'tailwind-merge';
import { Text, type TextProps } from '../Text/Text';

export interface DescriptionListTermProps extends TextProps {}

export const DescriptionListTerm = ({ children, className, ...rest }: DescriptionListTermProps) => {
    return (
        <Text
            {...rest}
            className={twMerge('mb-1 uppercase text-gray-700 dark:text-gray-300', className)}
            asChild
        >
            <dt>{children}</dt>
        </Text>
    );
};
