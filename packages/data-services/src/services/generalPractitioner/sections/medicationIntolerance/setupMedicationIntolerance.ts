import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type MedicationIntoleranceService<V extends FhirVersion> = {
    getMedicationIntolerance: () => ResourcesResponsePromise<V, 'AllergyIntolerance'>;
};

export function setupMedicationIntolerance<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): MedicationIntoleranceService<V> {
    return {
        getMedicationIntolerance: () =>
            getResources(
                {
                    resource: 'AllergyIntolerance',
                } as const,
                {
                    searchParams: {
                        category: 'medication',
                    },
                }
            ),
    };
}
