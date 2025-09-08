import { useIntl } from '$/intl';
import { useCallback } from 'react';
import { HealthSubCategory } from './SubCategoryData';

export type CreatePdfBlobArgs = {
    readonly categoryHeading: string;
    readonly subCategories?: HealthSubCategory[];
};

export function usePdfBlob() {
    const { formatMessage, intl } = useIntl();

    const createPdfBlob = useCallback(
        async ({ categoryHeading, subCategories }: CreatePdfBlobArgs) => {
            // load assets dynamically to avoid bundling them into the main bundle
            const { pdf } = await import('@react-pdf/renderer');
            const { HealthCategoryPdf } = await import(
                '$/components/HealthCategoryPdf/HealthCategoryPdf'
            );

            const today = Date.now();
            const date = intl.formatDate(today, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
            const time = intl.formatDate(today, {
                hour: 'numeric',
                minute: 'numeric',
            });
            const subHeading = formatMessage('export_pdf.subheading', {
                date,
                time,
            });
            const noDataMessage = formatMessage('export_pdf.no_data');

            const categoryData = subCategories?.map(({ id, heading, resources }) => ({
                id,
                heading,
                schemas: resources
                    .map(({ summary }) => summary)
                    .map(({ children, ...rest }) => ({
                        ...rest,
                        // drop the last uiGroup as it should only contain summary options, such as the link to the detail page.
                        children: children.slice(0, -1),
                    }))
                    .filter((schema) => schema.children.length > 0),
            }));

            if (!categoryData) {
                throw new Error('No category data');
            }

            return await pdf(
                <HealthCategoryPdf
                    heading={categoryHeading}
                    subHeading={subHeading}
                    subCategories={categoryData}
                    noDataMessage={noDataMessage}
                    footerText={formatMessage('export_pdf.footer')}
                />
            ).toBlob();
        },
        [formatMessage, intl]
    );

    return { createPdfBlob };
}
