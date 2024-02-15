import type { FhirResource } from '../types';
import type { KyInstance, Options as KyOptions } from 'ky';
import type { FhirClientOptions, ResourceType, TypedKyResponse } from '../types';
import type { ResourcesRequest } from './getResources';
import { defaultsSearchParams } from '../utils/defaultsSearchParams/defaultsSearchParams';

export interface ResourceRequest<T extends ResourceType = ResourceType>
    extends ResourcesRequest<T> {
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
