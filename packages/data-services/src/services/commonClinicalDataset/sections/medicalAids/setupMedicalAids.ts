import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type MedicalAidsService<V extends FhirVersion> = {
    getMedicalAids: () => ResourcesResponsePromise<V, 'DeviceUseStatement'>;
};

export function setupMedicalAids<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): MedicalAidsService<V> {
    return {
        getMedicalAids: () =>
            getResources(
                {
                    resource: 'DeviceUseStatement',
                } as const,
                {
                    searchParams: {
                        _include: 'DeviceUseStatement:device',
                    },
                }
            ),
    };
}
