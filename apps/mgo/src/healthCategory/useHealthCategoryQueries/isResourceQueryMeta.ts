import { type DataServiceId } from '@minvws/mgo-data-services';
import { type FhirVersion } from '@minvws/mgo-fhir-data';

export interface ResourceQueryMeta {
    organizationId: string;
    method: string;
    dataServiceId: DataServiceId;
    fhirVersion: FhirVersion;
}

declare module '@tanstack/react-query' {
    interface QueryMeta extends ResourceQueryMeta {}
}

export function isResourceQueryMeta(value: unknown): value is ResourceQueryMeta {
    return (
        typeof value === 'object' &&
        value !== null &&
        'method' in value &&
        'organizationId' in value &&
        'dataServiceId' in value &&
        'fhirVersion' in value
    );
}
