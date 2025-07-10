import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type AlertsService<V extends FhirVersion> = {
    getAlerts: () => ResourcesResponsePromise<V, 'Flag'>;
};

export function setupAlerts<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): AlertsService<V> {
    return {
        getAlerts: () =>
            getResources({
                resource: 'Flag',
            } as const),
    };
}
