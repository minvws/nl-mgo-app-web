import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type ObservationsService<V extends FhirVersion> = {
    getDiagnosticAndLabResults: () => ResourcesResponsePromise<V, 'Observation'>;
};

export function setupObservations<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): ObservationsService<V> {
    return {
        getDiagnosticAndLabResults: () =>
            getResources(
                {
                    resource: 'Observation',
                } as const,
                {
                    searchParams: [
                        [
                            'code',
                            'https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|',
                        ],
                        ['_include', 'Observation:related-target'],
                        ['_include', 'Observation:specimen'],
                    ],
                }
            ),
    };
}
