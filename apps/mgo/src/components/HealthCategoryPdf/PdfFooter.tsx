import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { MultilineText } from './MultilineText';
import { pxToPt } from './pxToPt';

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        bottom: pxToPt(28),
        left: pxToPt(28),
        right: pxToPt(28),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    text: {
        fontSize: pxToPt(10),
        color: '#6D6D6D',
        textAlign: 'left',
        flex: 1,
    },

    pageNumbers: {
        width: 100,
        fontSize: pxToPt(10),
        color: '#6D6D6D',
        textAlign: 'right',
    },
});

export type PdfFooterProps = {
    readonly footerText: string;
};

export const PdfFooter = ({ footerText }: PdfFooterProps) => (
    <View style={styles.main} fixed>
        <MultilineText style={styles.text}>{footerText}</MultilineText>
        <Text
            style={styles.pageNumbers}
            render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} van ${totalPages}`}
        />
    </View>
);
