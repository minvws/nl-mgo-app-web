import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type AllergiesService<V extends FhirVersion> = {
    getAllergies: () => ResourcesResponsePromise<V, 'AllergyIntolerance'>;
};

export function setupAllergies<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): AllergiesService<V> {
    return {
        getAllergies: () =>
            getResources({
                resource: 'AllergyIntolerance',
            } as const),
    };
}
