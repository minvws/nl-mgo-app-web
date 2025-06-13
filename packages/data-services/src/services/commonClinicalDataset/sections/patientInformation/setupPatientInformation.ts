import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type PatientInformationService<V extends FhirVersion> = {
    getPatientInformation: () => ResourcesResponsePromise<V, 'Patient'>;
};

export function setupPatientInformation<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): PatientInformationService<V> {
    return {
        getPatientInformation: () =>
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
