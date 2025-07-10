import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type FunctionalStatusService<V extends FhirVersion> = {
    getLastFunctionalOrMentalStatus: () => ResourcesResponsePromise<V, 'Observation'>;
};

export function setupFunctionalStatus<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): FunctionalStatusService<V> {
    return {
        getLastFunctionalOrMentalStatus: () =>
            getResources(
                {
                    resource: 'Observation',
                    $lastn: true,
                } as const,
                {
                    searchParams: {
                        category: [
                            'http://snomed.info/sct|118228005', // NOSONAR
                            'http://snomed.info/sct|384821006', // NOSONAR
                        ].join(','),
                    },
                }
            ),
    };
}
