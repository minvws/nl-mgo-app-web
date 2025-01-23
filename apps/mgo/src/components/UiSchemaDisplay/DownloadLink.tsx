import { getDataService } from '$/services';
import { useOrganizationsStore } from '$/store';
import { type DataService } from '@minvws/mgo-data-services';
import { type DownloadLink, type FhirVersion } from '@minvws/mgo-fhir-data';
import { DescriptionButton } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { UiSchemaContext } from './UiSchemaContext';

export interface DownloadLinkProps {
    readonly value: DownloadLink;
}

const binaryRegexp = /^Binary\/([^/]+)/;

export function DownloadLink({ value, ...rest }: DownloadLinkProps) {
    const intl = useIntl();
    const getOrganizationById = useOrganizationsStore((x) => x.getOrganizationById);
    const { organizationId, dataServiceId } = useContext(UiSchemaContext);

    const { url, label } = value;
    const binaryMatch = binaryRegexp.exec(url);
    const [_input, binaryId] = binaryMatch ?? [];

    const organization = getOrganizationById(organizationId);
    const dataService = getDataService(organization, dataServiceId);

    const { isLoading, data: binaryBlobUrl } = useQuery({
        queryKey: ['binary', binaryId, dataService],
        queryFn: async () => {
            const { content, contentType } = await (dataService as DataService<FhirVersion.R3>)
                .getResource({
                    resource: 'Binary',
                    id: binaryId,
                })
                .json();

            // Convert the binary content to a blob URL
            const response = await fetch(`data:${contentType};base64,${content}`);
            const fileBlob = await response.blob();
            return URL.createObjectURL(fileBlob);
        },
        enabled: !!dataService && !!binaryId,
        retry: 0,
    });

    return (
        <DescriptionButton
            details={label}
            icon="download"
            loadingText={intl.formatMessage({ id: 'common.loading' })}
            isLoading={isLoading}
            variant="highlighted"
            asChild
            {...rest}
        >
            <a href={binaryMatch ? binaryBlobUrl : url} target="_blank" rel="noreferrer" />
        </DescriptionButton>
    );
}
