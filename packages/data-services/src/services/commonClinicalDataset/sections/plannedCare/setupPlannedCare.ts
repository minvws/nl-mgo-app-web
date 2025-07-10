import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type PlannedCareService<V extends FhirVersion> = {
    getPlannedProcedures: () => ResourcesResponsePromise<V, 'ProcedureRequest'>;
    getPlannedImmunizations: () => ResourcesResponsePromise<V, 'ImmunizationRecommendation'>;
    getPlannedMedicalDevices: () => ResourcesResponsePromise<V, 'DeviceRequest'>;
    getPlannedEncounters: () => ResourcesResponsePromise<V, 'Appointment'>;
};

export function setupPlannedCare<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): PlannedCareService<V> {
    return {
        getPlannedProcedures: () =>
            getResources(
                {
                    resource: 'ProcedureRequest',
                } as const,
                {
                    searchParams: { status: 'active' },
                }
            ),

        getPlannedImmunizations: () =>
            getResources({
                resource: 'ImmunizationRecommendation',
            } as const),

        getPlannedMedicalDevices: () =>
            getResources(
                {
                    resource: 'DeviceRequest',
                } as const,
                {
                    searchParams: { status: 'active', _include: 'DeviceRequest:device' },
                }
            ),

        getPlannedEncounters: () =>
            getResources(
                {
                    resource: 'Appointment',
                } as const,
                {
                    searchParams: { status: ['booked', 'pending', 'proposed'].join(',') },
                }
            ),
    };
}
