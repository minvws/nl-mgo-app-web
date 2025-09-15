import { type Bundle, type FhirVersion, type ResourceType } from '@minvws/mgo-fhir';
import type { KyInstance, Options as KyOptions, ResponsePromise } from 'ky';
import type { FhirClientOptions } from '..';

export interface BaseResourcesRequest<
    V extends FhirVersion,
    T extends ResourceType<V> = ResourceType<V>,
> {
    resource: T;
    id?: never;
}

export interface ResourcesRequest<
    V extends FhirVersion,
    T extends ResourceType<V> = ResourceType<V>,
> extends BaseResourcesRequest<V, T> {
    $lastn?: never;
}

export interface ObservationResourcesRequest<
    V extends FhirVersion,
    T extends ResourceType<V> = 'Observation',
> extends BaseResourcesRequest<V, T> {
    $lastn?: boolean;
}

export type ResourcesResponse<
    V extends FhirVersion,
    T extends ResourceType<V>,
    Response = Bundle<V, T>,
> = Response;

export type ResourcesResponsePromise<
    V extends FhirVersion,
    T extends ResourceType<V>,
> = ResponsePromise<ResourcesResponse<V, T>>;

export type GetResourcesFunction<V extends FhirVersion> = <
    Request extends ResourcesRequest<V> | ObservationResourcesRequest<V>,
    Response = ResourcesResponse<V, Request['resource']>,
>(
    request: Request,
    options?: KyOptions
) => ResponsePromise<Response>;

export function setupResources<V extends FhirVersion>(
    instance: KyInstance,
    _options: FhirClientOptions<V>
): {
    getResources: GetResourcesFunction<V>;
} {
    return {
        getResources: (request, options = {}) => {
            const { resource, $lastn } = request as ObservationResourcesRequest<V>;
            return instance.get(`${resource}${$lastn ? '/$lastn' : ''}`, options);
        },
    };
}
