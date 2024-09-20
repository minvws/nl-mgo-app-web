import { type DataServiceId } from '@minvws/mgo-fhir-client';

export interface ResourceQueryMeta {
    organizationId: string;
    method: string;
    dataServiceId: DataServiceId;
}

export function isResourceQueryMeta(value: unknown): value is ResourceQueryMeta {
    return (
        typeof value === 'object' &&
        value !== null &&
        'method' in value &&
        'organizationId' in value &&
        'dataServiceId' in value
    );
}
