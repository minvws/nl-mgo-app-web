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

export interface GenericResourcesRequest<T extends ResourceType = ResourceType> {
    resource: T;
    id?: never;
    $lastn?: never;
}

export interface ObservationResourcesRequest
    extends Omit<GenericResourcesRequest<'Observation'>, '$lastn'> {
    $lastn: boolean;
}

export type ResourcesRequest = GenericResourcesRequest | ObservationResourcesRequest;

function isObservationRequest(request: ResourcesRequest): request is ObservationResourcesRequest {
    return request.resource === 'Observation';
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
    { searchParams }: FhirClientOptions,
    request: Request,
    options: KyOptions = {}
): TypedKyResponse<Response> {
    options.searchParams = defaultsSearchParams(searchParams, options.searchParams);
    let path: string = request.resource;

    if (isObservationRequest(request) && request.$lastn) {
        path += '/$lastn';
    }

    return instance.get(path, options);
}
