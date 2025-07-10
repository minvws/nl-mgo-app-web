import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type VitalSignsService<V extends FhirVersion> = {
    getLastBloodPressure: () => ResourcesResponsePromise<V, 'Observation'>;
    getLastBodyWeight: () => ResourcesResponsePromise<V, 'Observation'>;
    getLastBodyHeight: () => ResourcesResponsePromise<V, 'Observation'>;
};

export function setupVitalSigns<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): VitalSignsService<V> {
    return {
        getLastBloodPressure: () =>
            getResources(
                {
                    resource: 'Observation',
                    $lastn: true,
                } as const,
                {
                    searchParams: {
                        code: 'http://loinc.org|85354-9', // NOSONAR
                    },
                }
            ),

        getLastBodyWeight: () =>
            getResources(
                {
                    resource: 'Observation',
                    $lastn: true,
                } as const,
                {
                    searchParams: {
                        code: 'http://loinc.org|29463-7', // NOSONAR
                    },
                }
            ),

        getLastBodyHeight: () =>
            getResources(
                {
                    resource: 'Observation',
                    $lastn: true,
                } as const,
                {
                    searchParams: {
                        code: [
                            'http://loinc.org|8302-2', // NOSONAR
                            'http://loinc.org|8306-3', // NOSONAR
                            'http://loinc.org|8308-9', // NOSONAR
                        ].join(','),
                    },
                }
            ),
    };
}
