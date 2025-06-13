import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type EncountersService<V extends FhirVersion> = {
    getHospitalAdmissions: () => ResourcesResponsePromise<V, 'Encounter'>;
};

export function setupEncounters<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): EncountersService<V> {
    return {
        getHospitalAdmissions: () =>
            getResources(
                {
                    resource: 'Encounter',
                } as const,
                {
                    searchParams: {
                        class: [
                            'http://hl7.org/fhir/v3/ActCode|IMP', // NOSONAR
                            'http://hl7.org/fhir/v3/ActCode|ACUTE', // NOSONAR
                            'http://hl7.org/fhir/v3/ActCode|NONAC', // NOSONAR
                        ].join(','),
                    },
                }
            ),
    };
}
