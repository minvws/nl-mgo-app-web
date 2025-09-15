import { HealthUiSchema } from '@minvws/mgo-hcim';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { PdfFooter } from './PdfFooter';
import { PdfHeader } from './PdfHeader';
import { SubCategory } from './SubCategory';
import { pxToPt } from './pxToPt';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        padding: pxToPt(28),
        paddingBottom: pxToPt(80), // create space for the fixed footer
    },
    content: {
        paddingVertical: pxToPt(16),
    },
});

export interface HealthCategoryPdfProps {
    readonly heading: string;
    readonly subHeading: string;
    readonly footerText: string;
    readonly noDataMessage: string;
    readonly subCategories: {
        readonly heading: string;
        readonly schemas: HealthUiSchema[];
    }[];
}

export const HealthCategoryPdf = ({
    heading: mainHeading,
    subHeading,
    subCategories,
    footerText,
    noDataMessage,
}: HealthCategoryPdfProps) => {
    return (
        <Document>
            {subCategories.map(({ heading, schemas }, index) => (
                <Page size="A4" style={styles.page} key={heading}>
                    {index === 0 && <PdfHeader heading={mainHeading} subHeading={subHeading} />}

                    <View style={styles.content}>
                        <SubCategory
                            heading={heading}
                            schemas={schemas}
                            noDataMessage={noDataMessage}
                        />
                    </View>

                    <PdfFooter footerText={footerText} />
                </Page>
            ))}
        </Document>
    );
};
