import { twMerge } from 'tailwind-merge';
import { Text, type TextProps } from '../Text/Text';

export interface DescriptionListDetailsProps extends TextProps {}

export const DescriptionListDetails = ({
    className,
    children,
    ...rest
}: DescriptionListDetailsProps) => {
    return (
        <Text className={twMerge('mb-4 last-of-type:mb-0 md:mb-6', className)} {...rest} asChild>
            <dd>{children}</dd>
        </Text>
    );
};
