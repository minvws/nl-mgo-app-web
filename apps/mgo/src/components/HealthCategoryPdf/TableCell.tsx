import { StyleSheet, Text, TextProps } from '@react-pdf/renderer';
import { pxToPt } from './pxToPt';
import { Style } from './types';

const styles = StyleSheet.create({
    main: {
        fontSize: pxToPt(10),
    },
});

export interface TableCellProps extends TextProps {
    readonly children?: string;
    readonly style?: Style;
}

export const TableCell = ({ children, style = {}, ...rest }: TableCellProps) => {
    return (
        <Text style={[styles.main, style]} {...rest}>
            {children}
        </Text>
    );
};
