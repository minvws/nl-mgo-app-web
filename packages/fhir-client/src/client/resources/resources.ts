import { type Bundle, type FhirVersion, type ResourceType } from '@minvws/mgo-fhir-types';
import { type Lossless } from '@minvws/mgo-mgo-utils';
import type { KyInstance, Options as KyOptions } from 'ky';
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
    Response = Lossless<Bundle<V, T>>,
> = Response;

export function setupResources<V extends FhirVersion>(
    instance: KyInstance,
    _options: FhirClientOptions<V>
) {
    return {
        getResources: <
            Request extends ResourcesRequest<V> | ObservationResourcesRequest<V>,
            Response = ResourcesResponse<V, Request['resource']>,
        >(
            request: Request,
            options: KyOptions = {}
        ) => {
            const { resource, $lastn } = request as ObservationResourcesRequest<V>;
            return instance.get<Response>(`${resource}${$lastn ? '/$lastn' : ''}`, options);
        },
    };
}
