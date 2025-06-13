import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type TreatmentDirectivesService<V extends FhirVersion> = {
    getTreatmentDirectives: () => ResourcesResponsePromise<V, 'Consent'>;
    getAdvanceDirectives: () => ResourcesResponsePromise<V, 'Consent'>;
};

export function setupTreatmentDirectives<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): TreatmentDirectivesService<V> {
    return {
        getTreatmentDirectives: () =>
            getResources(
                {
                    resource: 'Consent',
                } as const,
                {
                    searchParams: {
                        category: 'http://snomed.info/sct|11291000146105', // NOSONAR
                    },
                }
            ),

        getAdvanceDirectives: () =>
            getResources(
                {
                    resource: 'Consent',
                } as const,
                {
                    searchParams: {
                        category: 'http://snomed.info/sct|11341000146107', // NOSONAR
                    },
                }
            ),
    };
}
