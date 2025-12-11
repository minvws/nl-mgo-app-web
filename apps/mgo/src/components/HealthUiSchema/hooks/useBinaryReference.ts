import { createDataService } from '$/services';
import { useStore } from '$/store';
import { Binary } from '@minvws/mgo-fhir';
import { Binary as BinaryR4 } from '@minvws/mgo-fhir/r4';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';
import { HealthUiSchemaContext } from '../HealthUiSchemaContext';

function isBinaryR4(binary: Binary): binary is BinaryR4 {
    return (binary as BinaryR4).data !== undefined;
}

const binaryRegexp = /^Binary\/([^/]+)/;

export function useBinaryReference(reference: string | undefined) {
    const getOrganizationResourceEndpoint = useStore.use.getOrganizationResourceEndpoint();
    const { resource } = useContext(HealthUiSchemaContext);
    const queryClient = useQueryClient();
    const isBinaryReference = binaryRegexp.test(reference ?? '');

    const resourceEndpoint = getOrganizationResourceEndpoint(
        resource?.source.organizationId,
        resource?.source.dataServiceId
    );

    const dataService = createDataService({
        dataServiceId: resource?.source.dataServiceId,
        resourceEndpoint,
    });

    const retryQuery = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: [resourceEndpoint, 'binary', reference],
        });
    }, [queryClient, resourceEndpoint, reference]);

    const {
        isLoading,
        data: binaryBlobUrl,
        isError,
    } = useQuery({
        // We use the data service id instead of the data service 'get' function reference as this is stable
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: [dataService?.meta.dataServiceId, resourceEndpoint, 'binary', reference],
        queryFn: async () => {
            const binary = (await dataService!.get(reference!).json()) as Binary;
            if (isBinaryR4(binary)) {
                return makeBlobUrlFromBase64(binary.data!, binary.contentType);
            }
            return makeBlobUrlFromBase64(binary.content, binary.contentType);
        },
        enabled: isBinaryReference && !!dataService,
        retry: 0,
    });

    const isEmpty = (!isBinaryReference || !binaryBlobUrl) && !isError && !isLoading;

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
