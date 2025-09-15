import { FormattedMessage, useIntl } from '$/intl';
import { Button, ConfirmDialog } from '@minvws/mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { type UIEvent, useState } from 'react';
import { HealthSubCategory } from './SubCategoryData';
import { usePdfBlob } from './usePdfBlob';

export type PdfDownloadLinkProps = {
    readonly categoryHeading: string;
    readonly subCategories?: HealthSubCategory[];
};

export function PdfDownloadLink({ categoryHeading, subCategories }: PdfDownloadLinkProps) {
    const [open, setOpen] = useState(false);
    const { formatMessage } = useIntl();
    const { createPdfBlob } = usePdfBlob();

    const { refetch: refetchPdf, isLoading } = useQuery({
        queryKey: ['pdf', subCategories, categoryHeading],
        queryFn: () => createPdfBlob({ subCategories, categoryHeading }),
        enabled: false,
    });

    const handlePdfDownloadClick = () => {
        if (subCategories) {
            setOpen(true);
        }
    };

    const handlePdfDownloadConfirmClick = async (event: UIEvent) => {
        event.preventDefault(); // prevent dialog from being closed
        if (subCategories) {
            const { data: pdfBlob } = await refetchPdf();
            if (pdfBlob) {
                const url = URL.createObjectURL(pdfBlob);
                window.open(url, '_blank');
            }
        }
        setOpen(false);
    };

    return (
        <>
            <Button variant="ghost" leftIcon="picture-as-pdf" onClick={handlePdfDownloadClick}>
                <FormattedMessage id="export_pdf.menu.save_pdf" />
            </Button>

            <ConfirmDialog
                closeButtonAriaLabel={formatMessage('common.voice_over_close')}
                title={formatMessage('export_pdf.dialog.heading')}
                description={formatMessage('export_pdf.dialog.subheading_web')}
                confirmButtonText={formatMessage('export_pdf.dialog.create_document')}
                cancelButtonText={formatMessage('common.cancel')}
                onConfirm={handlePdfDownloadConfirmClick}
                open={open}
                onOpenChange={setOpen}
                loadingSpinnerOnly
                loading={isLoading}
                loadingTextScreenReader={formatMessage('pdf_viewer.loading')}
            />
        </>
    );
}
