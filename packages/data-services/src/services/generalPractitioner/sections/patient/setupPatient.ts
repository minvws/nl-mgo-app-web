import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type PatientService<V extends FhirVersion> = {
    getPatient: () => ResourcesResponsePromise<V, 'Patient'>;
};

export function setupPatient<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): PatientService<V> {
    return {
        getPatient: () =>
            getResources(
                {
                    resource: 'Patient',
                } as const,
                {
                    searchParams: {
                        _include: 'Patient:general-practitioner',
                    },
                }
            ),
    };
}
