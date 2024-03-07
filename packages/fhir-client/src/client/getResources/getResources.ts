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

export function getResources<
    Request extends ResourcesRequest,
    Resource = Extract<FhirResource, { resourceType: Request['resource'] }>,
    Response = LosslessJson<Bundle<Resource>>,
>(
    instance: KyInstance,
    { defaultQueryParams }: FhirClientOptions,
    { resource }: Request,
    options: KyOptions = {}
): TypedKyResponse<Response> {
    options.searchParams = defaultsSearchParams(defaultQueryParams, options.searchParams);
    return instance.get(resource, options);
}
