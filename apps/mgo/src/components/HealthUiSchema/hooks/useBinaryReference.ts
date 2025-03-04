import { HealthUiSchemaContext } from '$/components/HealthUiSchema/HealthUiSchemaContext';
import { getDataService } from '$/services';
import { useOrganizationsStore } from '$/store';
import { type DataService } from '@minvws/mgo-data-services';
import { type FhirVersion } from '@minvws/mgo-fhir-data';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';

export function useBinaryReference(reference: string | undefined) {
    const getOrganizationById = useOrganizationsStore((x) => x.getOrganizationById);
    const { resource } = useContext(HealthUiSchemaContext);
    const queryClient = useQueryClient();
    const binaryRegexp = /^Binary\/([^/]+)/;

    const binaryMatch = reference ? binaryRegexp.exec(reference) : null;
    const [_input, binaryId] = binaryMatch ?? [];

    const organization = resource && getOrganizationById(resource.organizationId);
    const dataService = resource && getDataService(organization, resource.dataServiceId);

    const retryQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['binary', binaryId, dataService] });
    }, [queryClient, binaryId, dataService]);

    const {
        isLoading,
        data: binaryBlobUrl,
        isError,
    } = useQuery({
        queryKey: ['binary', binaryId, dataService],
        queryFn: async () => {
            const { content, contentType } = await (dataService as DataService<FhirVersion.R3>)
                .getResource({
                    resource: 'Binary',
                    id: binaryId,
                })
                .json();

            return makeBlobUrlFromBase64(content, contentType);
        },
        enabled: !!dataService && !!binaryId,
        retry: 0,
    });

    const isEmpty = (!binaryMatch || !binaryBlobUrl) && !isError && !isLoading;

    return {
        binaryBlobUrl,
        isLoading,
        isError,
        isEmpty,
        retryQuery,
    };
}

function makeBlobUrlFromBase64(content: string, contentType: string) {
    const byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    return URL.createObjectURL(blob);
}
