import type { KyInstance, Options as KyOptions } from 'ky';
import type { FhirClientOptions, FhirResource, ResourceType, TypedKyResponse } from '../../types';
import { defaultsSearchParams } from '../../utils/defaultsSearchParams/defaultsSearchParams';
import { type LosslessJson } from '../json/json';

export interface ResourceRequest<T extends ResourceType = ResourceType> {
    resource: T;
    id: string;
}

export type ResourceResponse<
    T extends ResourceType,
    Resource = Extract<FhirResource, { resourceType: T }>,
> = LosslessJson<Resource>;

export function getResource<
    Request extends ResourceRequest,
    Response = ResourceResponse<Request['resource']>,
>(
    instance: KyInstance,
    { searchParams }: FhirClientOptions,
    { resource, id }: Request,
    options: KyOptions = {}
): TypedKyResponse<Response> {
    options.searchParams = defaultsSearchParams(searchParams, options.searchParams);
    return instance.get(`${resource}/${id}`, options);
}
