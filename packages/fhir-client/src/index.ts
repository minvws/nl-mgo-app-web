import ky, { KyInstance, KyResponse, Options as KyOptions, ResponsePromise } from 'ky';
import { ResourceType } from './types/resource';
import { Bundle, FhirResource } from 'fhir/r3';

function partial<T, X>(
    func: (instance: KyInstance, request: T, options?: KyOptions) => X,
    instance: KyInstance
) {
    return (request: T, options?: KyOptions) => func(instance, request, options);
}

const defaultQueryParams = {
    _format: 'json',
};

export function createClient(options: KyOptions) {
    const instance = ky.create(options);

    return {
        instance,
        getResource: partial(getResource, instance),
    };
}

type TypedJsonFunc<T> = {
    json: () => Promise<T>;
};

type TypedKyResponse<T = unknown> = Omit<ResponsePromise, 'json' | keyof Promise<unknown>> &
    TypedJsonFunc<T> &
    Promise<Omit<KyResponse, 'json'> & TypedJsonFunc<T>>;

type QueryParamType = string | number | boolean | null | undefined;
type ResourceRequest<T extends ResourceType = ResourceType> = {
    resource: T;
    id?: string;
    query?: {
        [key: string]: QueryParamType | Array<QueryParamType>;
    };
};

function getResource<
    Request extends ResourceRequest,
    Resource = Extract<FhirResource, { resourceType: Request['resource'] }>,
    ReturnType = Request['id'] extends string ? Resource : Bundle<Resource>,
>(
    instance: KyInstance,
    { resource, id, query = {} }: Request,
    options?: KyOptions
): TypedKyResponse<ReturnType> {
    const queryParams = new URLSearchParams({
        ...defaultQueryParams,
        ...query,
    });
    return instance.get(resource + (id ? `/${id}` : '') + `?${queryParams}`, options);
}
