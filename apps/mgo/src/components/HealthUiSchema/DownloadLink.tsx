import { FormattedMessage } from '$/intl';
import { type DownloadLink as DownloadLinkData } from '@minvws/mgo-hcim-ui';
import { DescriptionButton, Notice, Text } from '@minvws/mgo-ui';

export interface DownloadLinkProps {
    readonly value: DownloadLinkData;
}

export function DownloadLink({ value, ...rest }: DownloadLinkProps) {
    const { url, label } = value;

    if (url) {
        return (
            <DescriptionButton
                details={label}
                icon="attach_file"
                asChild
                variant="highlighted"
                {...rest}
            >
                <a href={url} target="_blank" rel="noreferrer" />
            </DescriptionButton>
        );
    }

    return (
        <Notice variant="info" {...rest}>
            <Text className="max-w-[300px]" as="p">
                <FormattedMessage id="hc_documents.no_document" description="Geen documenten" />
            </Text>
        </Notice>
    );
}
