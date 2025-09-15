import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { pxToPt } from './pxToPt';

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    heading: {
        fontSize: pxToPt(24),
        fontWeight: 'bold',
    },
    subHeading: {
        fontSize: pxToPt(11),
        color: '#6D6D6D',
    },
});

export interface PdfHeaderProps {
    readonly heading: string;
    readonly subHeading: string;
}

export const PdfHeader = ({ heading, subHeading }: PdfHeaderProps) => (
    <View style={styles.main}>
        <Text style={styles.heading} data-testid="pdf-heading">
            {heading}
        </Text>
        <Text style={styles.subHeading} data-testid="pdf-subheading">
            {subHeading}
        </Text>
    </View>
);
