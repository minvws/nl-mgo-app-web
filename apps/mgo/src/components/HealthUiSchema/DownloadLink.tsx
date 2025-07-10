import { FormattedMessage } from '$/intl';
import { type DownloadLink as DownloadLinkData } from '@minvws/mgo-fhir-data';
import { DescriptionButton, DescriptionNotice, Text } from '@minvws/mgo-ui';

export interface DownloadLinkProps {
    readonly value: DownloadLinkData;
}

export function DownloadLink({ value, ...rest }: DownloadLinkProps) {
    const { url, label } = value;

    if (url) {
        return (
            <DescriptionButton
                details={label}
                icon="attach-file"
                asChild
                variant="highlighted"
                {...rest}
            >
                <a href={url} target="_blank" rel="noreferrer" />
            </DescriptionButton>
        );
    }

    return (
        <DescriptionNotice icon="info-fill" iconClassName="fill-dark-blue-700" {...rest}>
            <Text className="max-w-[300px] text-center">
                <FormattedMessage id="hc_documents.no_document" description="Geen documenten" />
            </Text>
        </DescriptionNotice>
    );
}
