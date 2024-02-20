import type { KyInstance, Options as KyOptions } from 'ky';
import type { FhirClientOptions, FhirResource, ResourceType, TypedKyResponse } from '../../types';
import { defaultsSearchParams } from '../../utils/defaultsSearchParams/defaultsSearchParams';

export interface ResourceRequest<T extends ResourceType = ResourceType> {
    resource: T;
    id: string;
}

export function getResource<
    Request extends ResourceRequest,
    Resource = Extract<FhirResource, { resourceType: Request['resource'] }>,
>(
    instance: KyInstance,
    { defaultQueryParams }: FhirClientOptions,
    { resource, id }: Request,
    options: KyOptions = {}
): TypedKyResponse<Resource> {
    options.searchParams = defaultsSearchParams(defaultQueryParams, options.searchParams);
    return instance.get(`${resource}/${id}`, options);
}
