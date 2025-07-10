import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type CompositionsService<V extends FhirVersion> = {
    getCompositions: () => ResourcesResponsePromise<V, 'Composition'>;
};

export function setupCompositions<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): CompositionsService<V> {
    return {
        getCompositions: () =>
            getResources(
                {
                    resource: 'Composition',
                } as const,
                {
                    searchParams: {
                        type: 'http://loinc.org|67781-5', // NOSONAR,
                    },
                }
            ),
    };
}
