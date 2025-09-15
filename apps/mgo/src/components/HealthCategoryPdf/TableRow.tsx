import { StyleSheet, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
    },
});

export interface TableRowProps {
    readonly children: ReactNode;
}

export const TableRow = ({ children }: TableRowProps) => (
    <View style={styles.main}>{children}</View>
);
