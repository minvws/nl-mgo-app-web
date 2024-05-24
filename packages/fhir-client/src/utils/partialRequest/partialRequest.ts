import { type Options as KyOptions } from 'ky';
import { defaultsSearchParams } from '../defaultsSearchParams/defaultsSearchParams';
import { type FhirRequestMethod } from '../setupRequestHandler/setupRequestHandler';

/**
 * This is a helper function to create a request method with a fixed request content and default ky options.
 */
export function partialRequest<Request, Response>(
    func: FhirRequestMethod<Request, Response>,
    request: Request,
    defaultOptions?: KyOptions
) {
    return (options?: KyOptions) => {
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            searchParams: defaultsSearchParams(defaultOptions?.searchParams, options?.searchParams),
        };

        return func(request, mergedOptions);
    };
}
