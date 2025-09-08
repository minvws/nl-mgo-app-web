import { StyleSheet, View, ViewProps } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { pxToPt } from './pxToPt';

const styles = StyleSheet.create({
    main: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: pxToPt(1),
        borderColor: '#E1E1E1',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: pxToPt(6),
    },
    dark: {
        backgroundColor: '#F4F4F4',
    },
});

export interface TableColProps extends ViewProps {
    readonly children: ReactNode;
    readonly variant?: 'default' | 'dark';
}

export const TableCol = ({ children, variant = 'default', ...rest }: TableColProps) => {
    return (
        <View style={{ ...styles.main, ...(variant === 'dark' ? styles.dark : {}) }} {...rest}>
            {children}
        </View>
    );
};
