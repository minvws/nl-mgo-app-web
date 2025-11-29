import { type DownloadBinary as DownloadBinaryData } from '@minvws/mgo-hcim-ui';
import { Button, DescriptionButton, Notice, Text } from '@minvws/mgo-ui';
import { FormattedMessage } from 'react-intl';
import { useBinaryReference } from './hooks/useBinaryReference';

export interface DownloadBinaryProps {
    readonly value: DownloadBinaryData;
}

export function DownloadBinary({ value, ...rest }: DownloadBinaryProps) {
    const { reference, label } = value;
    const { binaryBlobUrl, isLoading, isEmpty, isError, retryQuery } =
        useBinaryReference(reference);

    if (isEmpty) {
        return (
            <Notice variant="info" {...rest}>
                <Text className="max-w-[300px]" as="p">
                    <FormattedMessage id="hc_documents.no_document" description="Geen documenten" />
                </Text>
            </Notice>
        );
    }

    if (isError) {
        return (
            <Notice variant="error" {...rest}>
                <Text className="max-w-[300px]" as="p">
                    <FormattedMessage
                        id="hc_documents.error"
                        description="Er is een fout opgetreden"
                    />
                </Text>
                <Button variant="ghost" onClick={retryQuery}>
                    <FormattedMessage id="common.try_again" description="Probeer opnieuw" />
                </Button>
            </Notice>
        );
    }

    return (
        <DescriptionButton
            details={label}
            icon="attach_file"
            isLoading={isLoading}
            variant="highlighted"
            asChild
            {...rest}
        >
            <a href={binaryBlobUrl} target="_blank" rel="noreferrer" />
        </DescriptionButton>
    );
}
