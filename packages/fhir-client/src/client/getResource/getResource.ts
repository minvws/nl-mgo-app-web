import type { KyInstance, Options as KyOptions } from 'ky';
import type { FhirClientOptions, FhirResource, ResourceType, TypedKyResponse } from '../../types';
import { defaultsSearchParams } from '../../utils/defaultsSearchParams/defaultsSearchParams';
import { type LosslessJson } from '../json/json';

export interface ResourceRequest<T extends ResourceType = ResourceType> {
    resource: T;
    id: string;
}

export function getResource<
    Request extends ResourceRequest,
    Resource = Extract<FhirResource, { resourceType: Request['resource'] }>,
    Response = LosslessJson<Resource>,
>(
    instance: KyInstance,
    { defaultQueryParams }: FhirClientOptions,
    { resource, id }: Request,
    options: KyOptions = {}
): TypedKyResponse<Response> {
    options.searchParams = defaultsSearchParams(defaultQueryParams, options.searchParams);
    return instance.get(`${resource}/${id}`, options);
}
