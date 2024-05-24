import { type KyInstance, type Options as KyOptions } from 'ky';
import type { FhirClientOptions } from '../../types';

export type FhirRequestHandler<Request, Response> = (
    instance: KyInstance,
    fhirOptions: FhirClientOptions,
    request: Request,
    options?: KyOptions
) => Response;

export type FhirRequestMethod<Request, Response> = (
    request: Request,
    options?: KyOptions
) => Response;

/**
 * This is a helper function to create a request handler with the ky instance and fhir options.
 * It returns a new function that only requires the request and optionally, extra ky options.
 */
export function setupRequestHandler<Request, Response>(
    handler: FhirRequestHandler<Request, Response>,
    instance: KyInstance,
    fhirOptions: FhirClientOptions
): FhirRequestMethod<Request, Response> {
    return (request: Request, options?: KyOptions) =>
        handler(instance, fhirOptions, request, options);
}
