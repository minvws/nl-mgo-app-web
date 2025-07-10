import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type VaccinationsService<V extends FhirVersion> = {
    getVaccinations: () => ResourcesResponsePromise<V, 'Immunization'>;
};

export function setupVaccinations<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): VaccinationsService<V> {
    return {
        getVaccinations: () =>
            getResources({
                resource: 'Immunization',
            } as const),
    };
}
