import { type FhirVersion, type ResourceByType, type ResourceType } from '@minvws/mgo-fhir';
import type { KyInstance, Options as KyOptions, ResponsePromise } from 'ky';
import type { FhirClientOptions } from '..';

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
> = Resource;

export type GetResourceFunction<V extends FhirVersion> = <
    Request extends ResourceRequest<V>,
    Response = ResourceResponse<V, Request['resource']>,
>(
    request: Request,
    options?: KyOptions
) => ResponsePromise<Response>;

export function setupResource<V extends FhirVersion>(
    instance: KyInstance,
    _options: FhirClientOptions<V>
): {
    getResource: GetResourceFunction<V>;
} {
    return {
        getResource: (request, options = {}) => {
            const { resource, id } = request;
            return instance.get<Response>(`${resource}/${id}`, options);
        },
    };
}
