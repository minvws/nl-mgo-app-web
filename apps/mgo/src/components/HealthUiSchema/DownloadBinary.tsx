import { type DownloadBinary as DownloadBinaryData } from '@minvws/mgo-fhir-data';
import { Button, DescriptionButton, DescriptionNotice, Text } from '@minvws/mgo-ui';
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
            <DescriptionNotice
                icon="info-fill"
                iconClassName="fill-dark-blue-700 dark:fill-dark-blue-300"
                {...rest}
            >
                <Text className="max-w-[300px] text-center">
                    <FormattedMessage id="hc_documents.no_document" description="Geen documenten" />
                </Text>
            </DescriptionNotice>
        );
    }

    if (isError) {
        return (
            <DescriptionNotice icon="cancel" iconClassName="fill-red-600" {...rest}>
                <>
                    <Text className="text-center">
                        <FormattedMessage
                            id="hc_documents.error"
                            description="Er is een fout opgetreden"
                        />
                    </Text>
                    <Button
                        variant="ghost"
                        onClick={retryQuery}
                        className="text-sky-blue-700 dark:text-sky-blue-300 hover:text-sky-blue-700 dark:hover:text-sky-blue-300 !p-0 hover:!text-opacity-50"
                    >
                        <FormattedMessage id="common.try_again" description="Probeer opnieuw" />
                    </Button>
                </>
            </DescriptionNotice>
        );
    }

    return (
        <DescriptionButton
            details={label}
            icon="attach-file"
            isLoading={isLoading}
            variant="highlighted"
            asChild
            {...rest}
        >
            <a href={binaryBlobUrl} target="_blank" rel="noreferrer" />
        </DescriptionButton>
    );
}
