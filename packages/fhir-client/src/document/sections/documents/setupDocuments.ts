import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupDocuments({ getResources, getResource }: FhirClient) {
    return {
        getDocumentReferences: partialRequest(
            getResources,
            {
                resource: 'DocumentReference',
            } as const,
            {
                searchParams: {
                    status: 'current',
                },
            }
        ),
        getDocumentReference: (id: string) =>
            partialRequest(getResource, {
                resource: 'DocumentReference',
                id,
            } as const)(),
    };
}
