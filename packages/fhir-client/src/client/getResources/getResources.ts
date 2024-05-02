import type { KyInstance, Options as KyOptions } from 'ky';
import type {
    Bundle,
    FhirClientOptions,
    FhirResource,
    ResourceType,
    TypedKyResponse,
} from '../../types';
import { defaultsSearchParams } from '../../utils/defaultsSearchParams/defaultsSearchParams';
import { type LosslessJson } from '../json/json';

export interface ResourcesRequest<T extends ResourceType = ResourceType> {
    resource: T;
    id?: never;
}

export type ResourcesResponse<
    T extends ResourceType,
    Resource = Extract<FhirResource, { resourceType: T }>,
    Response = LosslessJson<Bundle<Resource>>,
> = Response;

export function getResources<
    Request extends ResourcesRequest,
    Response = ResourcesResponse<Request['resource']>,
>(
    instance: KyInstance,
    { defaultQueryParams }: FhirClientOptions,
    { resource }: Request,
    options: KyOptions = {}
): TypedKyResponse<Response> {
    options.searchParams = defaultsSearchParams(defaultQueryParams, options.searchParams);
    return instance.get(resource, options);
}
