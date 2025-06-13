import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type EncountersService<V extends FhirVersion> = {
    getEncounters: () => ResourcesResponsePromise<V, 'Encounter'>;
};

export function setupEncounters<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): EncountersService<V> {
    return {
        getEncounters: () =>
            getResources({
                resource: 'Encounter',
            } as const),
    };
}
