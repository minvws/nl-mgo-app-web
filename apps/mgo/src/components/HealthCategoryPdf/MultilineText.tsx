import { Text, View, ViewProps } from '@react-pdf/renderer';

export interface MultilineTextProps extends ViewProps {
    readonly children: string;
}

export const MultilineText = ({ children, ...rest }: MultilineTextProps) => {
    if (!children) return null;

    const lines = children.toString().split(/\\n/g);

    return (
        <View {...rest}>
            {lines.map((line, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text key={index}>{line}</Text>
            ))}
        </View>
    );
};
