import { Text, type TextProps } from '../Text/Text';

export interface RecordDescriptionProps extends TextProps {}

export const RecordDescription = ({ children, ...rest }: RecordDescriptionProps) => {
    return <Text {...rest}>{children}</Text>;
};
