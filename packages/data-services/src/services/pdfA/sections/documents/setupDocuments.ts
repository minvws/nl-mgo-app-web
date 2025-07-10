import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type DocumentsService<V extends FhirVersion> = {
    getDocumentReferences: () => ResourcesResponsePromise<V, 'DocumentReference'>;
};

export function setupDocuments<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): DocumentsService<V> {
    return {
        getDocumentReferences: () =>
            getResources({
                resource: 'DocumentReference',
            } as const),
    };
}
