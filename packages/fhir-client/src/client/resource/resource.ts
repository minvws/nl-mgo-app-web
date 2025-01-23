import { type FhirVersion, type ResourceByType, type ResourceType } from '@minvws/mgo-fhir-types';
import type { KyInstance, Options as KyOptions } from 'ky';
import type { FhirClientOptions } from '..';
import { type LosslessJson } from '../../utils/losslessJson/losslessJson';

export interface ResourceRequest<
    V extends FhirVersion,
    T extends ResourceType<V> = ResourceType<V>,
> {
    resource: T;
    id: string;
}

export type ResourceResponse<
    V extends FhirVersion,
    T extends ResourceType<V>,
    Resource = ResourceByType<T, V>,
> = LosslessJson<Resource>;

export function setupResource<V extends FhirVersion>(
    instance: KyInstance,
    _options: FhirClientOptions<V>
) {
    return {
        getResource: <
            Request extends ResourceRequest<V>,
            Response = ResourceResponse<V, Request['resource']>,
        >(
            request: Request,
            options: KyOptions = {}
        ) => {
            const { resource, id } = request;
            return instance.get<Response>(`${resource}/${id}`, options);
        },
    };
}
