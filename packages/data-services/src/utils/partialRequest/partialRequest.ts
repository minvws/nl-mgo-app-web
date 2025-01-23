import { type Options } from '@minvws/mgo-fhir-client';
import { defaultsSearchParams } from '../defaultsSearchParams/defaultsSearchParams';

export type RequestMethod<Request, Response> = (request: Request, options?: Options) => Response;

/**
 * This is a helper function to create a request method with a fixed request content and default ky options.
 */
export function partialRequest<Request, Response>(
    func: RequestMethod<Request, Response>,
    request: Request,
    defaultOptions?: Options
) {
    return (options?: Options) => {
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            searchParams: defaultsSearchParams(defaultOptions?.searchParams, options?.searchParams),
        };

        return func(request, mergedOptions);
    };
}
