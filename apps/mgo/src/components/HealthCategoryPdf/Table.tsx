import { StyleSheet, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { TableCell } from './TableCell';
import { TableCol } from './TableCol';
import { TableRow } from './TableRow';
import { Style } from './types';

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
});

export interface TableCellProps {
    readonly children: ReactNode;
    readonly style?: Style;
}

export const Table = ({ children, style }: TableCellProps) => {
    return <View style={{ ...styles.main, ...style }}>{children}</View>;
};

Table.Row = TableRow;
Table.Col = TableCol;
Table.Cell = TableCell;
