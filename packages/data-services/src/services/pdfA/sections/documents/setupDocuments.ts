import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupDocuments<V extends FhirVersion>({
    getResources,
    getResource,
}: FhirClient<V>) {
    return {
        getDocumentReferences: partialRequest(getResources, {
            resource: 'DocumentReference',
        } as const),
        getDocumentReference: (id: string) =>
            partialRequest(getResource, {
                resource: 'DocumentReference',
                id,
            } as const)(),
    };
}
