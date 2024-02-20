import type { Bundle, FhirResource } from '../../types';
import type { KyInstance, Options as KyOptions } from 'ky';
import type { FhirClientOptions, ResourceType, TypedKyResponse } from '../../types';
import { defaultsSearchParams } from '../../utils/defaultsSearchParams/defaultsSearchParams';

export interface ResourcesRequest<T extends ResourceType = ResourceType> {
    resource: T;
    id?: never;
}

export function getResources<
    Request extends ResourcesRequest,
    Resource = Extract<FhirResource, { resourceType: Request['resource'] }>,
>(
    instance: KyInstance,
    { defaultQueryParams }: FhirClientOptions,
    { resource }: Request,
    options: KyOptions = {}
): TypedKyResponse<Bundle<Resource>> {
    options.searchParams = defaultsSearchParams(defaultQueryParams, options.searchParams);
    return instance.get(resource, options);
}
