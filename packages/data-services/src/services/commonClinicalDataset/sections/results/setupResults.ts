import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type ResultsService<V extends FhirVersion> = {
    getLastLaboratoryResultsPerType: () => ResourcesResponsePromise<V, 'Observation'>;
};

export function setupResults<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): ResultsService<V> {
    return {
        getLastLaboratoryResultsPerType: () =>
            getResources(
                {
                    resource: 'Observation',
                    $lastn: true,
                } as const,
                {
                    searchParams: [
                        ['category', 'http://snomed.info/sct|275711006'], // NOSONAR
                        ['_include', 'Observation:related-target'],
                        ['_include', 'Observation:specimen'],
                    ],
                }
            ),
    };
}
